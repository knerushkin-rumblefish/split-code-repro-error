import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat'
import {BigNumber} from "ethers";


const deploy: DeployFunction = async function ({ deployments, getNamedAccounts }) {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    const AuthorizerDeployer = await deployments.get('Authorizer')

    await deploy('Vault', {
        from: deployer,
        gasLimit: 12000000,
        gasPrice: ethers.BigNumber.from(90000 * (10 ** 9)),
        args: [AuthorizerDeployer.address, ethers.constants.AddressZero, 0, 0],
        log: true,
    })
}

deploy.tags = ['mainnet', 'testnet', 'local', 'hardhat']

export default deploy