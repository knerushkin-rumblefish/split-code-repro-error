/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  BasePoolSplitCodeFactory,
  BasePoolSplitCodeFactoryInterface,
} from "../BasePoolSplitCodeFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "PoolCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "constructorArgs",
        type: "bytes",
      },
    ],
    name: "_getCreationCodeWithArgs",
    outputs: [
      {
        internalType: "bytes",
        name: "code",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCreationCode",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCreationCodeContracts",
    outputs: [
      {
        internalType: "address",
        name: "contractA",
        type: "address",
      },
      {
        internalType: "address",
        name: "contractB",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVault",
    outputs: [
      {
        internalType: "contract IVault",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "isPoolFromFactory",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class BasePoolSplitCodeFactory__factory {
  static readonly abi = _abi;
  static createInterface(): BasePoolSplitCodeFactoryInterface {
    return new utils.Interface(_abi) as BasePoolSplitCodeFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BasePoolSplitCodeFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as BasePoolSplitCodeFactory;
  }
}
