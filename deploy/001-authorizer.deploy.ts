import { DeployFunction } from 'hardhat-deploy/types'

const deploy: DeployFunction = async function ({ deployments, getNamedAccounts }) {
  const { deploy } = deployments
  const { deployer, admin } = await getNamedAccounts()

  const result = await deploy('Authorizer', {
    from: deployer,
    gasLimit: 4000000,
    args: [
      deployer,
    ],
    log: true,
  })
}

deploy.tags = ['prod', 'test', 'local', 'hardhat']

export default deploy
