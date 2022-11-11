const ethers = require('ethers');
const fs = require('fs');

async function main() {
  // 127.0.0.1:8545
  const provider = new ethers.providers.JsonRpcProvider(
    'http://127.0.0.1:8545'
  );
  const wallet = new ethers.Wallet(
    '0xf3d5da85ddc1ff714247fac44d9041f5509cddef5543ae349d1b1b6bdf86627d',
    provider
  );
  const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8');
  const binary = fs.readFileSync(
    './SimpleStorage_sol_SimpleStorage.bin',
    'utf8'
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log('Deploying, please wait...');
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
