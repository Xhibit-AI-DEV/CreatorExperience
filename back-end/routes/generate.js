const express = require("express");
const router = express.Router();
const db = require("../db");
const StellarSdk = require('stellar-sdk');

const server = new StellarSdk.Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

router.post("/generate", async (req, res) => {
  const { lookbookId, senderWallet } = req.body;
  const tokenAmount = "10"; // Amount of XHIBIT tokens to transfer

  if (!lookbookId || !senderWallet) {
    return res.status(400).json({ 
      success: false, 
      message: "lookbookId and senderWallet are required" 
    });
  }

  try {
    // Get the sender's secret key from users table
    const [user] = await db.query(
      "SELECT secret FROM users WHERE public_key = ?",
      [senderWallet]
    );

    if (!user || !user[0] || !user[0].secret) {
      return res.status(404).json({
        success: false,
        message: "User not found or secret key not available"
      });
    }

    const senderSecret = user[0].secret;

    // Get the lookbook's registered wallet address
    const [lookbook] = await db.query(
      "SELECT user_wallet FROM lookbooks WHERE id = ?",
      [lookbookId]
    );

    if (!lookbook || !lookbook[0]) {
      return res.status(404).json({
        success: false,
        message: "Lookbook not found"
      });
    }

    const recipientWallet = lookbook[0].user_wallet;

    // Stellar setup
    const XHIBIT_ASSET = new StellarSdk.Asset('XHIBIT', process.env.ISSUER_WALLET);

    // Get the sender's account
    const senderAccount = await server.loadAccount(senderWallet);

    // Create the transaction
    const transaction = new StellarSdk.TransactionBuilder(senderAccount, {
      fee: '100',
      networkPassphrase: StellarSdk.Networks.TESTNET
    })
      .addOperation(StellarSdk.Operation.payment({
        destination: recipientWallet,
        asset: XHIBIT_ASSET,
        amount: tokenAmount
      }))
      .setTimeout(30)
      .build();

    // Sign the transaction with the sender's secret key
    const keypair = StellarSdk.Keypair.fromSecret(senderSecret);
    transaction.sign(keypair);

    // Submit the signed transaction
    const result = await server.submitTransaction(transaction);

    // Update balances in the database
    // Decrease sender's balance
    await db.query(
      'UPDATE users SET balance = balance - ? WHERE public_key = ?',
      [tokenAmount, senderWallet]
    );

    // Increase recipient's balance
    await db.query(
      'UPDATE users SET balance = balance + ? WHERE public_key = ?',
      [tokenAmount, recipientWallet]
    );

    // Update lookbook earnings
    await db.query(
      'UPDATE lookbooks SET earnings = IFNULL(earnings, 0) + ? WHERE id = ?',
      [tokenAmount, lookbookId]
    );

    res.json({
      success: true,
      message: "Transaction successful",
      transactionHash: result.hash,
      amount: tokenAmount
    });

  } catch (error) {
    console.error("❌ Error in token transfer:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to process token transfer",
      error: error.message
    });
  }
});

module.exports = router;