const { config } = require('dotenv')
config()

const TESTNET_ACCOUNT = process.env.TESTNET_ACCOUNT as string
const TESTNET_PRIVKEY = process.env.TESTNET_PRIVKEY as string
const MAINNET_ACCOUNT = process.env.MAINNET_ACCOUNT as string
const MAINNET_PRIVKEY = process.env.MAINNET_PRIVKEY as string

import { HardhatUserConfig } from 'hardhat/types'

import 'hardhat-contract-sizer'
import 'hardhat-deploy'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'


const harhatConfig: HardhatUserConfig = {
  contractSizer: {
    runOnCompile: true,
    alphaSort: true,
    disambiguatePaths: false,
    strict: true,
  },
  solidity: {
    compilers: [
      {
        version: '0.7.1',
        settings: {
          optimizer: { enabled: true, runs: 1 },
        },
      }
    ],
    overrides: {
      'contracts/StablePool/meta/MetaStablePool.sol': {
        version: '0.7.1',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          }
        },
      },
      'contracts/StablePool/meta/MetaStablePoolExternalLibrary.sol': {
        version: '0.7.1',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      'contracts/pool-stable/meta/MetaStablePoolFactory.sol': {
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          }
        },
        version: '0.7.1',
      },
    }
  },

  typechain: {
    outDir: 'src/contracts',
    target: 'ethers-v5',
  },

  namedAccounts: {
    deployer: {
      mainnet: MAINNET_ACCOUNT,
      testnet: TESTNET_ACCOUNT,
      local: TESTNET_ACCOUNT,
      hardhat: TESTNET_ACCOUNT,
    }
  },

  networks: {
    hardhat: {
      live: true,
      saveDeployments: true,
      allowUnlimitedContractSize: false,

      tags: ['hardhat'],
      gas: 12000000,
      accounts: [
        {
          privateKey: TESTNET_PRIVKEY,
          balance: '100000000000000000000000000000000'
        },
      ]
    },
    local: {
      live: false,
      tags: ['local'],
      accounts: [
        TESTNET_PRIVKEY
      ],
      chainId: 0x116e8,
      url: 'http://127.0.0.1:8024',
      throwOnCallFailures: true,
      gas: 12000000,
      timeout: 100000
    },
    testnet: {
      tags: ['testnet'],
      accounts: [
        TESTNET_PRIVKEY
      ],
      chainId: 0x116e9,
      url: 'https://godwoken-testnet-v1.ckbapp.dev',
      throwOnCallFailures: true,
      gas: 12000000,
      gasPrice: 90000 * 10 ** 9,
      timeout: 100000
    },
    mainnet: {
      tags: ['mainnet'],
      accounts: [
        MAINNET_PRIVKEY
      ],
      chainId: 0x116ea,
      url: 'https://v1.mainnet.godwoken.io/rpc',
      throwOnCallFailures: true,
      gas: 12000000,
      gasPrice: 90000 * 10 ** 9,
      timeout: 100000
    },
  },
}

export default harhatConfig
