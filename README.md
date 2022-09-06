Factory deploy pool with BaseSplitCodeFactory, which is splitting contract for deployment, to deploy contract > 24kB.

Setup `.env` file
```bash
MAINNET_ACCOUNT='0x'
MAINNET_PRIVKEY='0x'
TESTNET_ACCOUNT='0x'
TESTNET_PRIVKEY='0x'
```
Run with:
```bash
yarn hardhat deploy                   # Hardhat Network
yarn hardhat deploy --network testnet # Godwoken Network
```

Looks like Code Split Factory do not work for contracts larger than 24kB on Godwoken.

| Contract                        | Size         |
|---------------------------------|--------------|
| MetaStablePool                  | ***25.409*** |
| MetaStablePoolFactory           | 3.121        |
| MetaStablePoolLessThan24        | ***23.629*** |
| MetaStablePoolLessThan24Factory | 3.121        |

### Update
Added `MetaStablePoolExternalLibrary` where one library is externalized to reduce contract size. Contract is deployed but can't perform single call without revert on Godwoken.  

| Contract                        | Size         |
|---------------------------------|--------------|
| MetaStablePool                  | ***25.409*** |
| MetaStablePoolLessThan24        | ***23.629*** |
| MetaStablePoolExternalLibrary   | ***23.807*** |