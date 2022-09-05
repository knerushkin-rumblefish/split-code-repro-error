import { DeployFunction } from 'hardhat-deploy/types'
import { run } from '../scripts/contract-error.run'


const deploy: DeployFunction = async function ({ deployments, getNamedAccounts }) {
    // await run()
}

deploy.tags = ['mainnet', 'testnet', 'local', 'hardhat']

export default deploy