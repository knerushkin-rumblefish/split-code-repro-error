import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'
import {BigNumber} from "ethers";
import {TOKENS} from "./000-test-tokens.deploy";


const deploy: DeployFunction = async function ({ deployments, getNamedAccounts }) {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    const queryProcessor = await deploy('QueryProcessor', {
        from: deployer,
        gasLimit: 12000000,
        gasPrice: ethers.BigNumber.from(90000 * (10 ** 9)),
        args: [],
        log: true,
    })
    const amplificationParameter = BigNumber.from(100)
    const swapFeePercentage = BigNumber.from(0.008e18)

    let tokens = []
    for (let tokenName of TOKENS) {
        const TokenDeployment = await deployments.get(tokenName)
        tokens.push(TokenDeployment.address)
    }
    tokens = tokens.sort()
    const rateProviders = [ ethers.constants.AddressZero, ethers.constants.AddressZero ]

    const VaultDeployment = await deployments.get("Vault")

    console.log('VaultDeployment', VaultDeployment.address)
    // await deploy('MetaStablePool', {
    //     from: deployer,
    //     gasLimit: 12000000,
    //     gasPrice: ethers.BigNumber.from(90000 * (10 ** 9)),
    //     args: [
    //         VaultDeployment.address,
    //         "Meta Pool",
    //         "meta-pool",
    //         tokens,
    //         rateProviders,
    //         amplificationParameter,
    //         swapFeePercentage,
    //         0,
    //         0,
    //         deployer
    //     ],
    //     log: true,
    //     libraries: {
    //         QueryProcessor: queryProcessor.address,
    //     }
    // })
}

deploy.tags = ['mainnet', 'testnet', 'local', 'hardhat']

export default deploy