import { ethers } from "hardhat";

async function main() {

  const NFT_CONTRACT_ADDRESS = "0x160732c843461cb4Ce63DF3e6F5FB37F1bc6EBeb";
  const contractFactory = await ethers.getContractFactory("CryptoDevToken");
  const contract = await contractFactory.deploy(NFT_CONTRACT_ADDRESS);

  await contract.deployed();

  console.log(`Contract deployed to ${contract.address}`);
}






main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
