import { ethers, run, network } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const KYCVerification = await ethers.getContractFactory("KYCVerification");
  const kyc = await KYCVerification.deploy();
  await kyc.deployed(); 
  const kycAddress = kyc.address;

  const TestToken = await ethers.getContractFactory("TestToken");
  const token = await TestToken.deploy(kycAddress);
  await token.deployed();
  const tokenAddress = token.address;

  console.log("KYC_CONTRACT_ADDRESS=", kycAddress);
  console.log("TEST_TOKEN_ADDRESS=", tokenAddress);

  if (network.name !== "ganache") {
    await sleep(20000); 

    try {
      await run("verify:verify", {
        address: kycAddress,
        constructorArguments: [],
      });
    } catch (error: any) {
      console.error("KYCVerification verification failed:", error.message);
    }

    try {
      await run("verify:verify", {
        address: tokenAddress,
        constructorArguments: [kycAddress],
      });
    } catch (error: any) {
      console.error("TestToken verification failed:", error.message);
    }
  } else {
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error: any) => {
  console.error(error);
  process.exitCode = 1;
});