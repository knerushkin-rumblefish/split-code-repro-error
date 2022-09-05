import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'


export const TOKENS = ['CKB', 'USDC'];

const deployToken = async (
    name: string,
    symbol: string,
    { deployments, getNamedAccounts }: HardhatRuntimeEnvironment
) => {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    const result = await deploy(symbol, {
        contract: 'ERC20',
        from: deployer,
        gasLimit: 4000000,
        args: [name, symbol],
        log: true,
    })

    return result.address
}

const deploy: DeployFunction = async (hre) => {
    for (let i = 0; i < TOKENS.length; i++) {
        const tokenSymbol = TOKENS[i]
        const tokenName = TOKENS[i]

        await deployToken(tokenName, tokenSymbol, hre)
    }
}

deploy.tags = ['prod', 'test', 'local', 'hardhat']

export default deploy
