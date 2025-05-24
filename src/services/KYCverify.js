const { ethers } = require("ethers");
const { kycVerificationABI } = require("../constants/kycVerificationABI.js");

exports.verify = async (req, res) => {
  try {
    const { address } = req.body;

    console.log("KYC verify request received:", { address });
    if (!ethers.utils.isAddress(address)) {
      console.error("Invalid address:", address);
      return res.status(400).json({ message: "Invalid address", address });
    }

    console.log("Connecting to Ganache at:", process.env.GANACHE_URL);
    console.log("KYC contract address:", process.env.KYCVerificationGanacheAddress);
    console.log("ABI defined:", !!kycVerificationABI, "ABI length:", kycVerificationABI ? kycVerificationABI.length : 0);

    if (!kycVerificationABI || !Array.isArray(kycVerificationABI)) {
      throw new Error("Invalid or missing kycVerificationABI");
    }

    const provider = new ethers.providers.JsonRpcProvider(process.env.GANACHE_URL);
    const signer = new ethers.Wallet(process.env.GANACHE_API_KEY, provider);
    const contract = new ethers.Contract(
      process.env.KYCVerificationGanacheAddress,
      kycVerificationABI,
      signer
    );

    const network = await provider.getNetwork();
    console.log("Connected to network:", network);

    const tx = await contract.verifyUser(address, true, { gasLimit: 200000 });
    const receipt = await tx.wait();

    return res.status(200).json({
      message: "User verified successfully",
      transactionHash: receipt.transactionHash,
    });
  } catch (error) {
    console.error("KYC verify error:", error);
    return res.status(500).json({ message: error.message || "Failed to verify KYC" });
  }
};

exports.check = async (req, res) => {
  try {
    const { address } = req.body;

    console.log("KYC check request received:", { address });
    if (!ethers.utils.isAddress(address)) {
      console.error("Invalid address:", address);
      return res.status(400).json({ message: "Invalid address", address });
    }

    console.log("Connecting to Ganache at:", process.env.GANACHE_URL);
    console.log("KYC contract address:", process.env.KYCVerificationGanacheAddress);
    console.log("ABI defined:", !!kycVerificationABI, "ABI length:", kycVerificationABI ? kycVerificationABI.length : 0);

    if (!kycVerificationABI || !Array.isArray(kycVerificationABI)) {
      throw new Error("Invalid or missing kycVerificationABI");
    }

    const provider = new ethers.providers.JsonRpcProvider(process.env.GANACHE_URL);
    const contract = new ethers.Contract(
      process.env.KYCVerificationGanacheAddress,
      kycVerificationABI,
      provider
    );

    const network = await provider.getNetwork();
    console.log("Connected to network:", network);

    const isVerified = await contract.checkKYC(address);

    return res.status(200).json({ isVerified });
  } catch (error) {
    console.error("KYC check error:", error);
    return res.status(500).json({ message: error.message || "Failed to check KYC" });
  }
};
