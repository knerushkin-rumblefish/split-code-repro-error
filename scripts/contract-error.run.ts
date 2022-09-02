import { deployments, ethers } from 'hardhat'

import { MetaStablePool } from "../src/contracts";

export async function run() {
    const queryProcessorDeployment = await deployments.get('QueryProcessor')

    const metaStablePoolDeployment = await deployments.get('MetaStablePool')

    const MetaStablePoolFactory = await ethers.getContractFactory('MetaStablePool',
        {
            libraries: {
                'QueryProcessor': queryProcessorDeployment.address,
            }
        }
    )

    let metaStablePool = (await MetaStablePoolFactory.attach(
        metaStablePoolDeployment.address,
    )) as MetaStablePool

    await metaStablePool.setSupply(ethers.BigNumber.from(1000).mul(ethers.BigNumber.from(10).pow(18)))

    const miscDataTotalSupply = await metaStablePool.getMiscDataTotalSupply()
    console.log('miscDataTotalSupply', miscDataTotalSupply.toString())

    const resultOracleUpdate = await metaStablePool.updateOracle(
        1,
        ethers.BigNumber.from(1).mul(ethers.BigNumber.from(10).pow(18)),
        ethers.BigNumber.from(5).mul(ethers.BigNumber.from(10).pow(18))
    )
    console.log('meta stable pool oracle update', resultOracleUpdate.map(r => r.toString()))
    //
    // const result = await metaStablePool.errorMethod(
    //     ethers.BigNumber.from(1),
    //     ethers.BigNumber.from(2)
    // )
    // await result.wait(2)
}
