const express = require('express');
const router = express.Router();
const StellarSdk = require('stellar-sdk');
const db = require("../db");
const server = new StellarSdk.Horizon.Server(
    "https://horizon-testnet.stellar.org",
  );
console.log('Stellar server instantiated!');

const issuerSecret = process.env.ISSUER_SECRET;
const issuerKeypair = StellarSdk.Keypair.fromSecret(issuerSecret);
const issuerPublic = issuerKeypair.publicKey();
const assetCode = 'XHIBIT';

router.post('/fund-account', async (req, res) => {
  const { walletAddress } = req.body;
  const fundAmount = '100'; // Amount to send

  try {
    if (!StellarSdk.StrKey.isValidEd25519PublicKey(walletAddress)) {
      return res.status(400).json({ success: false, message: 'Invalid Stellar wallet address' });
    }

    const userAccount = await server.loadAccount(walletAddress);

    const hasTrustline = userAccount.balances.some(
      b => b.asset_code === assetCode && b.asset_issuer === issuerPublic
    );

    if (!hasTrustline) {
      return res.status(400).json({
        success: false,
        message: `Recipient has no trustline for ${assetCode}. Please add trustline first.`
      });
    }

    const issuerAccount = await server.loadAccount(issuerPublic);
    const fee = await server.fetchBaseFee();
    const asset = new StellarSdk.Asset(assetCode, issuerPublic);

    const transaction = new StellarSdk.TransactionBuilder(issuerAccount, {
      fee,
      networkPassphrase: StellarSdk.Networks.TESTNET
    })
      .addOperation(StellarSdk.Operation.payment({
        destination: walletAddress,
        asset: asset,
        amount: fundAmount
      }))
      .setTimeout(30)
      .build();

    transaction.sign(issuerKeypair);
    const txResult = await server.submitTransaction(transaction);

    // ✅ Update user balance in DB
    await db.query(
      'UPDATE users SET balance = balance + ? WHERE public_key = ?',
      [fundAmount, walletAddress]
    );

    res.json({
      success: true,
      message: `✅ ${assetCode} tokens sent to ${walletAddress}`,
      transactionHash: txResult.hash
    });

  } catch (error) {
    console.error('❌ Fund account error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fund account',
      error: error.response?.data || error.message
    });
  }
});

// DEMO ONLY: Add trustline by signing with user's secret key
router.post('/add-trustline', async (req, res) => {
  const { walletSecret } = req.body;

  try {
    // Validate secret key
    if (!StellarSdk.StrKey.isValidEd25519SecretSeed(walletSecret)) {
      return res.status(400).json({ success: false, message: 'Invalid Stellar secret key' });
    }

    const userKeypair = StellarSdk.Keypair.fromSecret(walletSecret);
    const userPublic = userKeypair.publicKey();

    // Load user account
    const userAccount = await server.loadAccount(userPublic);

    // Check if trustline already exists
    const hasTrustline = userAccount.balances.some(
      b => b.asset_code === assetCode && b.asset_issuer === issuerPublic
    );
    if (hasTrustline) {
      return res.status(400).json({
        success: false,
        message: `Trustline for ${assetCode} already exists.`
      });
    }

    // Build trustline transaction
    const fee = await server.fetchBaseFee();
    const asset = new StellarSdk.Asset(assetCode, issuerPublic);

    const transaction = new StellarSdk.TransactionBuilder(userAccount, {
      fee,
      networkPassphrase: StellarSdk.Networks.TESTNET
    })
      .addOperation(StellarSdk.Operation.changeTrust({
        asset: asset,
        limit: '1000000' // Optional: set a limit
      }))
      .setTimeout(30)
      .build();

    transaction.sign(userKeypair);
    const txResult = await server.submitTransaction(transaction);

    res.json({
      success: true,
      message: `✅ Trustline for ${assetCode} established!`,
      transactionHash: txResult.hash
    });

  } catch (error) {
    console.error('❌ Add trustline error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to add trustline',
      error: error.response?.data || error.message
    });
  }
});

module.exports = router;
