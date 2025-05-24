   const { ethers } = require("ethers");
   const { TestToken } = require("../constants/TestToken.js");

   exports.mintTokens = async (req, res) => {
     try {
       const { to, amount } = req.body;

       console.log("Mint request received:", { to, amount }); 
       if (!ethers.utils.isAddress(to)) {
         console.error("Invalid address:", to);
         return res.status(400).json({ message: "Invalid recipient address", address: to });
       }
       if (!amount || isNaN(amount) || amount <= 0) {
         return res.status(400).json({ message: "Invalid amount", amount });
       }

       const provider = new ethers.providers.JsonRpcProvider(process.env.GANACHE_URL);
       const signer = new ethers.Wallet(process.env.GANACHE_API_KEY, provider);
       const contract = new ethers.Contract(
         process.env.TestTokenGanacheAddress,
         TestToken,
         signer
       );

       const tx = await contract.mint(to, amount);
       const receipt = await tx.wait();

       return res.status(200).json({
         message: "Tokens minted successfully",
         transactionHash: receipt.transactionHash,
       });
     } catch (error) {
       console.error("Mint error:", error);
       return res.status(500).json({ message: error.reason || error.message });
     }
   };

   exports.burnTokens = async (req, res) => {
     try {
       const { amount } = req.body;

       if (!amount || isNaN(amount) || amount <= 0) {
         return res.status(400).json({ message: "Invalid amount", amount });
       }

       const provider = new ethers.providers.JsonRpcProvider(process.env.GANACHE_URL);
       const signer = new ethers.Wallet(process.env.GANACHE_API_KEY, provider);
       const contract = new ethers.Contract(
         process.env.TestTokenGanacheAddress,
         TestToken,
         signer
       );

       const tx = await contract.burn(amount);
       const receipt = await tx.wait();

       return res.status(200).json({
         message: "Tokens burned successfully",
         transactionHash: receipt.transactionHash,
       });
     } catch (error) {
       console.error("Burn error:", error);
       return res.status(500).json({ message: error.reason || error.message });
     }
   };

   exports.getBalance = async (req, res) => {
     try {
       const { address } = req.params;

       if (!ethers.utils.isAddress(address)) {
         console.error("Invalid address:", address);
         return res.status(400).json({ message: "Invalid address", address });
       }

       const provider = new ethers.providers.JsonRpcProvider(process.env.GANACHE_URL);
       const contract = new ethers.Contract(
         process.env.TestTokenGanacheAddress,
         TestToken,
         provider
       );

       const balance = await contract.balanceOf(address);

       return res.status(200).json({
         balance: balance.toString(),
       });
     } catch (error) {
       console.error("Balance error:", error);
       return res.status(500).json({ message: error.reason || error.message });
     }
   };
  