import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'


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

    await deploy('MetaStablePool', {
        from: deployer,
        gasLimit: 12000000,
        gasPrice: ethers.BigNumber.from(90000 * (10 ** 9)),
        args: [ethers.BigNumber.from(1000)],
        log: true,
        libraries: {
            QueryProcessor: queryProcessor.address,
        }
    })
}

deploy.tags = ['mainnet', 'testnet', 'local', 'hardhat']

export default deploy