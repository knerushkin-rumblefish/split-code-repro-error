// SPDX-License-Identifier: GPL-3.0-or-later
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import "../FixedPoint.sol";
import "../InputHelpers.sol";
import "./WordCodec.sol";

import "./IRateProvider.sol";

import "../BasePool/BasePool.sol";

import "./StableMath.sol";
import "./StablePoolUserDataHelpers.sol";

contract StablePool is BasePool, IRateProvider {
    using WordCodec for bytes32;
    using FixedPoint for uint256;
    using StablePoolUserDataHelpers for bytes;

    // This contract uses timestamps to slowly update its Amplification parameter over time. These changes must occur
    // over a minimum time period much larger than the blocktime, making timestamp manipulation a non-issue.
    // solhint-disable not-rely-on-time

    // Amplification factor changes must happen over a minimum period of one day, and can at most divide or multiply the
    // current value by 2 every day.
    // WARNING: this only limits *a single* amplification change to have a maximum rate of change of twice the original
    // value daily. It is possible to perform multiple amplification changes in sequence to increase this value more
    // rapidly: for example, by doubling the value every day it can increase by a factor of 8 over three days (2^3).
    uint256 private constant _MIN_UPDATE_TIME = 1 days;
    uint256 private constant _MAX_AMP_UPDATE_DAILY_RATE = 2;

    bytes32 private _packedAmplificationData;

    event AmpUpdateStarted(uint256 startValue, uint256 endValue, uint256 startTime, uint256 endTime);
    event AmpUpdateStopped(uint256 currentValue);

    enum JoinKind { INIT, EXACT_TOKENS_IN_FOR_BPT_OUT, TOKEN_IN_FOR_EXACT_BPT_OUT }
    enum ExitKind { EXACT_BPT_IN_FOR_ONE_TOKEN_OUT, EXACT_BPT_IN_FOR_TOKENS_OUT, BPT_IN_FOR_EXACT_TOKENS_OUT }

    constructor(
        IVault vault,
        string memory name,
        string memory symbol,
        IERC20[] memory tokens,
        uint256 amplificationParameter,
        uint256 swapFeePercentage,
        uint256 pauseWindowDuration,
        uint256 bufferPeriodDuration,
        address owner
    )
    BasePool(
        vault,
        IVault.PoolSpecialization.GENERAL,
        name,
        symbol,
        tokens,
        new address[](tokens.length),
        swapFeePercentage,
        pauseWindowDuration,
        bufferPeriodDuration,
        owner
    )
    {
        _require(amplificationParameter >= StableMath._MIN_AMP, Errors.MIN_AMP);
        _require(amplificationParameter <= StableMath._MAX_AMP, Errors.MAX_AMP);


        uint256 initialAmp = Math.mul(amplificationParameter, StableMath._AMP_PRECISION);
        _setAmplificationData(initialAmp);
    }

    /**
     * @dev This function returns the appreciation of one BPT relative to the
     * underlying tokens. This starts at 1 when the pool is created and grows over time
     */
    function getRate() public view override returns (uint256) {
        (, uint256[] memory balances, ) = getVault().getPoolTokens(getPoolId());

        (uint256 currentAmp, ) = _getAmplificationParameter();

        return 0;
    }

//    function _scalingFactor(IERC20 token) internal view virtual override returns (uint256) {
//        // prettier-ignore
//        if (_isToken0(token)) { return _getScalingFactor0(); }
//        else if (_isToken1(token)) { return _getScalingFactor1(); }
//        else if (token == _token2) { return _getScalingFactor2(); }
//        else if (token == _token3) { return _getScalingFactor3(); }
//        else if (token == _token4) { return _getScalingFactor4(); }
//        else {
//            _revert(Errors.INVALID_TOKEN);
//        }
//    }
//
//    function _scalingFactors() internal view virtual override returns (uint256[] memory) {
//        uint256 totalTokens = _getTotalTokens();
//        uint256[] memory scalingFactors = new uint256[](totalTokens);
//
//        // prettier-ignore
//        {
//            scalingFactors[0] = _getScalingFactor0();
//            scalingFactors[1] = _getScalingFactor1();
//            if (totalTokens > 2) { scalingFactors[2] = _getScalingFactor2(); } else { return scalingFactors; }
//            if (totalTokens > 3) { scalingFactors[3] = _getScalingFactor3(); } else { return scalingFactors; }
//            if (totalTokens > 4) { scalingFactors[4] = _getScalingFactor4(); } else { return scalingFactors; }
//        }
//
//        return scalingFactors;
//    }

    // Amplification

    /**
     * @dev Begins changing the amplification parameter to `rawEndValue` over time. The value will change linearly until
     * `endTime` is reached, when it will be `rawEndValue`.
     *
     * NOTE: Internally, the amplification parameter is represented using higher precision. The values returned by
     * `getAmplificationParameter` have to be corrected to account for this when comparing to `rawEndValue`.
     */
    function startAmplificationParameterUpdate(uint256 rawEndValue, uint256 endTime) external authenticate {
        _require(rawEndValue >= StableMath._MIN_AMP, Errors.MIN_AMP);
        _require(rawEndValue <= StableMath._MAX_AMP, Errors.MAX_AMP);

        uint256 duration = Math.sub(endTime, block.timestamp);
        _require(duration >= _MIN_UPDATE_TIME, Errors.AMP_END_TIME_TOO_CLOSE);

        (uint256 currentValue, bool isUpdating) = _getAmplificationParameter();
        _require(!isUpdating, Errors.AMP_ONGOING_UPDATE);

        uint256 endValue = Math.mul(rawEndValue, StableMath._AMP_PRECISION);

        // daily rate = (endValue / currentValue) / duration * 1 day
        // We perform all multiplications first to not reduce precision, and round the division up as we want to avoid
        // large rates. Note that these are regular integer multiplications and divisions, not fixed point.
        uint256 dailyRate = endValue > currentValue
        ? Math.divUp(Math.mul(1 days, endValue), Math.mul(currentValue, duration))
        : Math.divUp(Math.mul(1 days, currentValue), Math.mul(endValue, duration));
        _require(dailyRate <= _MAX_AMP_UPDATE_DAILY_RATE, Errors.AMP_RATE_TOO_HIGH);

        _setAmplificationData(currentValue, endValue, block.timestamp, endTime);
    }

    /**
     * @dev Stops the amplification parameter change process, keeping the current value.
     */
    function stopAmplificationParameterUpdate() external authenticate {
        (uint256 currentValue, bool isUpdating) = _getAmplificationParameter();
        _require(isUpdating, Errors.AMP_NO_ONGOING_UPDATE);

        _setAmplificationData(currentValue);
    }

    function _getAmplificationParameter() internal view returns (uint256 value, bool isUpdating) {
        (uint256 startValue, uint256 endValue, uint256 startTime, uint256 endTime) = _getAmplificationData();

        // Note that block.timestamp >= startTime, since startTime is set to the current time when an update starts

        if (block.timestamp < endTime) {
            isUpdating = true;

            // We can skip checked arithmetic as:
            //  - block.timestamp is always larger or equal to startTime
            //  - endTime is always larger than startTime
            //  - the value delta is bounded by the largest amplification parameter, which never causes the
            //    multiplication to overflow.
            // This also means that the following computation will never revert nor yield invalid results.
            if (endValue > startValue) {
                value = startValue + ((endValue - startValue) * (block.timestamp - startTime)) / (endTime - startTime);
            } else {
                value = startValue - ((startValue - endValue) * (block.timestamp - startTime)) / (endTime - startTime);
            }
        } else {
            isUpdating = false;
            value = endValue;
        }
    }

    function _setAmplificationData(uint256 value) private {
        _storeAmplificationData(value, value, block.timestamp, block.timestamp);
        emit AmpUpdateStopped(value);
    }

    function _setAmplificationData(
        uint256 startValue,
        uint256 endValue,
        uint256 startTime,
        uint256 endTime
    ) private {
        _storeAmplificationData(startValue, endValue, startTime, endTime);
        emit AmpUpdateStarted(startValue, endValue, startTime, endTime);
    }

    function _storeAmplificationData(
        uint256 startValue,
        uint256 endValue,
        uint256 startTime,
        uint256 endTime
    ) private {
        _packedAmplificationData =
        WordCodec.encodeUint(uint64(startValue), 0) |
        WordCodec.encodeUint(uint64(endValue), 64) |
        WordCodec.encodeUint(uint64(startTime), 64 * 2) |
        WordCodec.encodeUint(uint64(endTime), 64 * 3);
    }

    function _getAmplificationData()
        private
        view
        returns (
            uint256 startValue,
            uint256 endValue,
            uint256 startTime,
            uint256 endTime
        )
    {
        startValue = _packedAmplificationData.decodeUint64(0);
        endValue = _packedAmplificationData.decodeUint64(64);
        startTime = _packedAmplificationData.decodeUint64(64 * 2);
        endTime = _packedAmplificationData.decodeUint64(64 * 3);
    }

    function _isOwnerOnlyAction(bytes32 actionId) internal view virtual override returns (bool) {
        return
        (actionId == getActionId(StablePool.startAmplificationParameterUpdate.selector)) ||
        (actionId == getActionId(StablePool.stopAmplificationParameterUpdate.selector)) ||
        super._isOwnerOnlyAction(actionId);
    }
}
