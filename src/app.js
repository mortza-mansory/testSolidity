const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { checkAPIHealth } = require("./services/checkAPIHealth.js");
const { verify, check } = require("./services/KYCverify.js");
const { mintTokens, burnTokens, getBalance } = require("./services/tokenServices.js");

dotenv.config();
const app = express();

const network = process.env.NETWORK || "mainnet";
console.log(`Running on network: ${network}`);

app.use(
  cors({
    credentials: true,
    sameSite: "none",
    origin: process.env.FRONTEND_URL.split(",") ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use((req, res, next) => {
  express.json()(req, res, (err) => {
    if (err) {
      console.error("JSON parse error:", err.message, "Raw body:", req.body);
      return res.status(400).json({ message: "Invalid JSON format", error: err.message });
    }
    next();
  });
});

app.use(cookieParser());

app.get("/health", checkAPIHealth);
app.post("/kyc-verify", verify);
app.post("/kyc-check", check);
app.post("/mint", mintTokens);
app.post("/burn", burnTokens);
app.get("/balance/:address", getBalance);

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

app.listen(process.env.PORT, () =>
  console.log(`Node server listening on port ${process.env.PORT}!`)
);
