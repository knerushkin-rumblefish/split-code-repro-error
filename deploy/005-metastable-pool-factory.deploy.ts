import { DeployFunction } from 'hardhat-deploy/types'
import { BigNumber, logger } from 'ethers'
import { ethers } from 'hardhat'
import {MetaStablePool, MetaStablePoolFactory} from "../src/contracts";
import {TOKENS} from "./000-test-tokens.deploy";

const deploy: DeployFunction = async function ({ deployments, getNamedAccounts }) {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()


    const queryProcessor = await deploy('QueryProcessor', {
        from: deployer,
        gasLimit: 12000000,
        gasPrice: BigNumber.from(90000 * (10 ** 9)),
        args: [],
        log: true,
    })

    const VaultDeployment = await deployments.get("Vault");
    const metaStablePoolFactoryResult = await deploy('MetaStablePoolFactory', {
        from: deployer,
        gasLimit: 12000000,
        gasPrice: BigNumber.from(90000 * (10 ** 9)),
        args: [VaultDeployment.address],
        log: true,
        libraries: {
            QueryProcessor: queryProcessor.address,
        }
    })

    const metaStablePoolFactoryContract = await ethers.getContractAt('MetaStablePoolFactory', metaStablePoolFactoryResult.address) as MetaStablePoolFactory


    let tokens = []
    for (let tokenName of TOKENS) {
        const TokenDeployment = await deployments.get(tokenName)
        tokens.push(TokenDeployment.address)
    }
    tokens = tokens.sort()
    const noRateProviders = tokens.map(() => ethers.constants.AddressZero)

    const amplificationParameter = BigNumber.from(100)
    const swapFeePercentage = BigNumber.from(0.008e18)
    const noPriceRateCache = tokens.map(() => BigNumber.from(0))

    const transaction= await metaStablePoolFactoryContract.create(
        "Meta Pool",
        "meta-pool",
        tokens,
        amplificationParameter,
        noRateProviders,
        noPriceRateCache,
        swapFeePercentage,
        deployer
    )
    const receipt = await transaction.wait()

    const poolCreatedEvents = receipt?.events?.filter((e) => e.event === 'PoolCreated')
    if (poolCreatedEvents && poolCreatedEvents.length > 0) {
        const poolAddress = poolCreatedEvents[0].args?.pool

        logger.info(`deploying "MetaStablePool": deployed at ${poolAddress}`)


        const metaStablePoolContract = await ethers.getContractAt('MetaStablePool', poolAddress) as MetaStablePool

        const resultOracleUpdate = await metaStablePoolContract.updateOracle(
            1,
            ethers.BigNumber.from(1).mul(ethers.BigNumber.from(10).pow(18)),
            ethers.BigNumber.from(5).mul(ethers.BigNumber.from(10).pow(18))
        )
        console.log('result', resultOracleUpdate.map(r => r.toString()))
    }
}

deploy.tags = ['error', 'hardhat', 'hardhat-error']

export default deploy