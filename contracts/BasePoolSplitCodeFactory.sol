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

import "./BaseSplitCodeFactory.sol";

/**
 * @dev Same as `BasePoolFactory`, for Pools whose creation code is so large that the factory cannot hold it.
 */
abstract contract BasePoolSplitCodeFactory is BaseSplitCodeFactory {
    mapping(address => bool) private _isPoolFromFactory;

    event PoolCreated(address indexed pool);

    constructor(bytes memory creationCode) BaseSplitCodeFactory(creationCode) {}


    function _create(bytes memory constructorArgs) internal override returns (address) {
        address pool = super._create(constructorArgs);

        _isPoolFromFactory[pool] = true;
        emit PoolCreated(pool);

        return pool;
    }
}
