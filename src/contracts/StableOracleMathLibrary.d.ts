/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface StableOracleMathLibraryInterface extends ethers.utils.Interface {
  functions: {
    "calcLogPrices(uint256,uint256,uint256,int256)": FunctionFragment;
    "calcSpotPrice(uint256,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "calcLogPrices",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calcSpotPrice",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "calcLogPrices",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calcSpotPrice",
    data: BytesLike
  ): Result;

  events: {};
}

export class StableOracleMathLibrary extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: StableOracleMathLibraryInterface;

  functions: {
    calcLogPrices(
      amplificationParameter: BigNumberish,
      balanceX: BigNumberish,
      balanceY: BigNumberish,
      logBptTotalSupply: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        logSpotPrice: BigNumber;
        logBptPrice: BigNumber;
      }
    >;

    calcSpotPrice(
      amplificationParameter: BigNumberish,
      balanceX: BigNumberish,
      balanceY: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  calcLogPrices(
    amplificationParameter: BigNumberish,
    balanceX: BigNumberish,
    balanceY: BigNumberish,
    logBptTotalSupply: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { logSpotPrice: BigNumber; logBptPrice: BigNumber }
  >;

  calcSpotPrice(
    amplificationParameter: BigNumberish,
    balanceX: BigNumberish,
    balanceY: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    calcLogPrices(
      amplificationParameter: BigNumberish,
      balanceX: BigNumberish,
      balanceY: BigNumberish,
      logBptTotalSupply: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        logSpotPrice: BigNumber;
        logBptPrice: BigNumber;
      }
    >;

    calcSpotPrice(
      amplificationParameter: BigNumberish,
      balanceX: BigNumberish,
      balanceY: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    calcLogPrices(
      amplificationParameter: BigNumberish,
      balanceX: BigNumberish,
      balanceY: BigNumberish,
      logBptTotalSupply: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calcSpotPrice(
      amplificationParameter: BigNumberish,
      balanceX: BigNumberish,
      balanceY: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    calcLogPrices(
      amplificationParameter: BigNumberish,
      balanceX: BigNumberish,
      balanceY: BigNumberish,
      logBptTotalSupply: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calcSpotPrice(
      amplificationParameter: BigNumberish,
      balanceX: BigNumberish,
      balanceY: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}