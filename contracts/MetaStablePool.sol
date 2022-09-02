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

import "./WordCodec.sol";
import "./OracleMiscData.sol";
import "./StableOracleMath.sol";
import "./LogCompression.sol";
import "./PoolPriceOracle.sol";
import "./StablePool/BalancerPoolToken.sol";

/**
 * @dev StablePool suitable for assets with proportional prices (i.e. with slow-changing exchange rates between them).
 * Requires an external feed of these exchange rates.
 *
 * It additionally features a price oracle.
 */
contract MetaStablePool is BalancerPoolToken, StableOracleMath, PoolPriceOracle {
    using WordCodec for bytes32;
    using OracleMiscData for bytes32;

    bytes32 private _miscData;
    uint256 private _amplificationParameter;

    constructor(uint256 amplificationParameter)
        BalancerPoolToken('tokenName', 'tokenSymbol')
    {
        _amplificationParameter = amplificationParameter;
    }

    function _getMiscData() internal view returns (bytes32) {
        return _miscData;
    }

    function _setMiscData(bytes32 newData) internal {
        _miscData = _miscData.insertBits192(newData, 0);
    }


    function getMiscDataTotalSupply() external view returns (int256) {
        return _miscData.logTotalSupply();
    }

    function setSupply(uint256 totalSupply) external {
        bytes32 miscData = _getMiscData();
        miscData = miscData.setLogTotalSupply(LogCompression.toLowResLog(totalSupply));
        _setMiscData(miscData);
    }
    /**
     * @dev Updates the Price Oracle based on the Pool's current state (balances, BPT supply and invariant). Must be
     * called on *all* state-changing functions with the balances *before* the state change happens, and with
     * `lastChangeBlock` as the number of the block in which any of the balances last changed.
     */
    function updateOracle(
        uint256 lastChangeBlock,
        uint256 balance0,
        uint256 balance1
    ) public view returns (int256, int256) {
        bytes32 miscData = _getMiscData();
        (uint256 currentAmp, ) = _getAmplificationParameter();

        (int256 logSpotPrice, int256 logBptPrice) = StableOracleMath._calcLogPrices(
            currentAmp,
            balance0,
            balance1,
            miscData.logTotalSupply()
        );

        return (logSpotPrice, logBptPrice);
    }

    function errorMethod(
        uint256 balance0,
        uint256 balance1
    ) public returns (uint256) {
        updateOracle(10000, balance0, balance1);
        return 0;
    }


    function _getAmplificationParameter() internal view returns (uint256 value, bool isUpdating) {
        isUpdating = false;
        value = _amplificationParameter;
    }


    function _getOracleIndex() internal view override returns (uint256) {
        return _getMiscData().oracleIndex();
    }

}
