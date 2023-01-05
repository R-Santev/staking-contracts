import { ethers } from "hardhat";

const STAKING_CONTRACT_ADDRESS = process.env.STAKING_CONTRACT_ADDRESS ?? "";
const STAKE_AMOUNT = ethers.utils.parseEther("1");

async function main() {
  const [account, mainNode] = await ethers.getSigners();

  console.log(
    "Fund node",
    account.address,
    "from",
    mainNode.address
  );

  const tx = await mainNode.sendTransaction({
    to: account.address,
    value: STAKE_AMOUNT,
    // nonce: await mainNode.getTransactionCount(),
    gasLimit: "0x100000",
    gasPrice: await mainNode.getGasPrice(),
  })
    .catch(err => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! tx error ', err);
      
    })
  if (!tx) {
    return;
  }

  const receipt = await tx.wait();

  console.log("receipt", receipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
