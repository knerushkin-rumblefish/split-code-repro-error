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


import "./BasePoolSplitCodeFactory.sol";

import "./MetaStablePool.sol";

contract MetaStablePoolFactory is BasePoolSplitCodeFactory {
    constructor() BasePoolSplitCodeFactory(type(MetaStablePool).creationCode) {
        // solhint-disable-previous-line no-empty-blocks
    }

    /**
     * @dev Deploys a new `MetaStablePool`.
     */
    function create(uint256 amplificationParameter) external returns (address) {
        return
            _create(
                abi.encode(
//                    MetaStablePool.NewPoolParams({
//                        vault: getVault(),
//                        name: name,
//                        symbol: symbol,
//                        tokens: tokens,
//                        rateProviders: rateProviders,
//                        priceRateCacheDuration: priceRateCacheDuration,
//                        amplificationParameter: amplificationParameter,
//                        swapFeePercentage: swapFeePercentage,
//                        pauseWindowDuration: pauseWindowDuration,
//                        bufferPeriodDuration: bufferPeriodDuration,
//                        oracleEnabled: oracleEnabled,
//                        owner: owner
//                    })
//                    getVault(),
//                    name,
//                    symbol,
//                    tokens,
//                    rateProviders,
//                    priceRateCacheDuration,
                    amplificationParameter
//                    swapFeePercentage,
//                    pauseWindowDuration,
//                    bufferPeriodDuration
                )
            );
    }
}
