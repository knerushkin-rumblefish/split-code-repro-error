/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ProtocolFeesCollector,
  ProtocolFeesCollectorInterface,
} from "../ProtocolFeesCollector";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IVault",
        name: "_vault",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newFlashLoanFeePercentage",
        type: "uint256",
      },
    ],
    name: "FlashLoanFeePercentageChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newSwapFeePercentage",
        type: "uint256",
      },
    ],
    name: "SwapFeePercentageChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "selector",
        type: "bytes4",
      },
    ],
    name: "getActionId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAuthorizer",
    outputs: [
      {
        internalType: "contract IAuthorizer",
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
        internalType: "contract IERC20[]",
        name: "tokens",
        type: "address[]",
      },
    ],
    name: "getCollectedFeeAmounts",
    outputs: [
      {
        internalType: "uint256[]",
        name: "feeAmounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFlashLoanFeePercentage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSwapFeePercentage",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newFlashLoanFeePercentage",
        type: "uint256",
      },
    ],
    name: "setFlashLoanFeePercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newSwapFeePercentage",
        type: "uint256",
      },
    ],
    name: "setSwapFeePercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "vault",
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
        internalType: "contract IERC20[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
    ],
    name: "withdrawCollectedFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b50604051610b32380380610b3283398101604081905261002f9161004d565b30608052600160005560601b6001600160601b03191660a05261007b565b60006020828403121561005e578081fd5b81516001600160a01b0381168114610074578182fd5b9392505050565b60805160a05160601c610a8c6100a6600039806103f252806104e35250806102875250610a8c6000f3fe608060405234801561001057600080fd5b50600436106100835760003560e01c806338e9922e1461008857806355c676281461009d5780636b6b9f69146100bb5780636daefab6146100ce578063851c1bb3146100e1578063aaabadc5146100f4578063d877845c14610109578063e42abf3514610111578063fbfa77cf14610131575b600080fd5b61009b610096366004610901565b610139565b005b6100a5610198565b6040516100b291906109f3565b60405180910390f35b61009b6100c9366004610901565b61019e565b61009b6100dc366004610750565b6101f1565b6100a56100ef3660046108a1565b610283565b6100fc6102d5565b6040516100b29190610982565b6100a56102e4565b61012461011f3660046107d0565b6102ea565b6040516100b291906109af565b6100fc6103f0565b610141610414565b6101586706f05b59d3b20000821115610258610445565b60018190556040517fa9ba3ffe0b6c366b81232caab38605a0699ad5398d6cce76f91ee809e322dafc9061018d9083906109f3565b60405180910390a150565b60015490565b6101a6610414565b6101bc662386f26fc10000821115610259610445565b60028190556040517f5a0b7386237e7f07fa741efc64e59c9387d2cccafec760efed4d53387f20e19a9061018d9083906109f3565b6101f9610457565b610201610414565b61020b8483610470565b60005b8481101561027357600086868381811061022457fe5b905060200201602081019061023991906108e5565b9050600085858481811061024957fe5b6020029190910135915061026990506001600160a01b038316858361047d565b505060010161020e565b5061027c6104d8565b5050505050565b60007f0000000000000000000000000000000000000000000000000000000000000000826040516020016102b8929190610931565b604051602081830303815290604052805190602001209050919050565b60006102df6104df565b905090565b60025490565b606081516001600160401b038111801561030357600080fd5b5060405190808252806020026020018201604052801561032d578160200160208202803683370190505b50905060005b82518110156103ea5782818151811061034857fe5b60200260200101516001600160a01b03166370a08231306040518263ffffffff1660e01b815260040161037b9190610982565b60206040518083038186803b15801561039357600080fd5b505afa1580156103a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103cb9190610919565b8282815181106103d757fe5b6020908102919091010152600101610333565b50919050565b7f000000000000000000000000000000000000000000000000000000000000000081565b600061042b6000356001600160e01b031916610283565b905061044261043a8233610572565b610191610445565b50565b816104535761045381610604565b5050565b61046960026000541415610190610445565b6002600055565b6104538183146067610445565b6104d38363a9059cbb60e01b848460405160240161049c929190610996565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152610657565b505050565b6001600055565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663aaabadc56040518163ffffffff1660e01b815260040160206040518083038186803b15801561053a57600080fd5b505afa15801561054e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102df91906108c9565b600061057c6104df565b6001600160a01b0316639be2a8848484306040518463ffffffff1660e01b81526004016105ab939291906109fc565b60206040518083038186803b1580156105c357600080fd5b505afa1580156105d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105fb919061087a565b90505b92915050565b62461bcd60e51b6000908152602060045260076024526642414c23000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b60006060836001600160a01b0316836040516106739190610949565b6000604051808303816000865af19150503d80600081146106b0576040519150601f19603f3d011682016040523d82523d6000602084013e6106b5565b606091505b509150915060008214156106cd573d6000803e3d6000fd5b6106f78151600014806106ef5750818060200190518101906106ef919061087a565b6101a2610445565b50505050565b60008083601f84011261070e578182fd5b5081356001600160401b03811115610724578182fd5b602083019150836020808302850101111561073e57600080fd5b9250929050565b80356105fe81610a41565b600080600080600060608688031215610767578081fd5b85356001600160401b038082111561077d578283fd5b61078989838a016106fd565b909750955060208801359150808211156107a1578283fd5b506107ae888289016106fd565b90945092505060408601356107c281610a41565b809150509295509295909350565b600060208083850312156107e2578182fd5b82356001600160401b03808211156107f8578384fd5b818501915085601f83011261080b578384fd5b813581811115610819578485fd5b8381029150610829848301610a1b565b8181528481019084860184860187018a1015610843578788fd5b8795505b8386101561086d576108598a82610745565b835260019590950194918601918601610847565b5098975050505050505050565b60006020828403121561088b578081fd5b8151801515811461089a578182fd5b9392505050565b6000602082840312156108b2578081fd5b81356001600160e01b03198116811461089a578182fd5b6000602082840312156108da578081fd5b815161089a81610a41565b6000602082840312156108f6578081fd5b813561089a81610a41565b600060208284031215610912578081fd5b5035919050565b60006020828403121561092a578081fd5b5051919050565b9182526001600160e01b031916602082015260240190565b60008251815b81811015610969576020818601810151858301520161094f565b818111156109775782828501525b509190910192915050565b6001600160a01b0391909116815260200190565b6001600160a01b03929092168252602082015260400190565b6020808252825182820181905260009190848201906040850190845b818110156109e7578351835292840192918401916001016109cb565b50909695505050505050565b90815260200190565b9283526001600160a01b03918216602084015216604082015260600190565b6040518181016001600160401b0381118282101715610a3957600080fd5b604052919050565b6001600160a01b038116811461044257600080fdfea26469706673582212201ddca9026c753610854d1b56e256bad16dcefa3d22f5401a93b5ce4e85cf1b8364736f6c63430007010033";

export class ProtocolFeesCollector__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ProtocolFeesCollector> {
    return super.deploy(
      _vault,
      overrides || {}
    ) as Promise<ProtocolFeesCollector>;
  }
  getDeployTransaction(
    _vault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_vault, overrides || {});
  }
  attach(address: string): ProtocolFeesCollector {
    return super.attach(address) as ProtocolFeesCollector;
  }
  connect(signer: Signer): ProtocolFeesCollector__factory {
    return super.connect(signer) as ProtocolFeesCollector__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProtocolFeesCollectorInterface {
    return new utils.Interface(_abi) as ProtocolFeesCollectorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ProtocolFeesCollector {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ProtocolFeesCollector;
  }
}
