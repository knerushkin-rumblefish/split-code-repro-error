/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  BaseSplitCodeFactory,
  BaseSplitCodeFactoryInterface,
} from "../BaseSplitCodeFactory";

const _abi = [
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
];

export class BaseSplitCodeFactory__factory {
  static readonly abi = _abi;
  static createInterface(): BaseSplitCodeFactoryInterface {
    return new utils.Interface(_abi) as BaseSplitCodeFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BaseSplitCodeFactory {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as BaseSplitCodeFactory;
  }
}
