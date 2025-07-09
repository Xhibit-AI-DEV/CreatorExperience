const StellarSdk = require("stellar-sdk");
require("dotenv").config();

// Initialize Stellar server (testnet)
const server = new StellarSdk.Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

async function createStellarAccount() {
  try {
    console.log("🚀 Creating new Stellar account...");

    // Create a new keypair
    const newKeypair = StellarSdk.Keypair.random();
    const publicKey = newKeypair.publicKey();
    const secretKey = newKeypair.secret();

    console.log("✅ New account created!");
    console.log("📋 Public Key (Account Address):", publicKey);
    console.log("🔑 Secret Key:", secretKey);
    console.log(
      "⚠️  IMPORTANT: Save this secret key securely - you'll need it to sign transactions!"
    );
    console.log("");

    // Fund the account with XLM (required for operations)
    console.log("💰 Funding account with XLM...");
    const response = await fetch(
      `https://horizon-testnet.stellar.org/friendbot?addr=${publicKey}`
    );

    if (response.ok) {
      console.log("✅ Account funded with XLM!");
    } else {
      console.log("❌ Failed to fund account with XLM");
      return null;
    }

    return { publicKey, secretKey, keypair: newKeypair };
  } catch (error) {
    console.error("❌ Error creating account:", error);
    return null;
  }
}

async function createXhibitAsset() {
  try {
    console.log("🏗️  Creating XHIBIT asset...");

    // Use the issuer secret from environment or create a new one
    const issuerSecret = process.env.ISSUER_SECRET;
    if (!issuerSecret) {
      console.log("❌ ISSUER_SECRET not found in environment variables");
      console.log("Please set ISSUER_SECRET in your .env file");
      return null;
    }

    const issuerKeypair = StellarSdk.Keypair.fromSecret(issuerSecret);
    const issuerPublic = issuerKeypair.publicKey();

    console.log("📋 Issuer Public Key:", issuerPublic);
    console.log("✅ XHIBIT asset issuer ready!");

    return { issuerKeypair, issuerPublic };
  } catch (error) {
    console.error("❌ Error creating XHIBIT asset:", error);
    return null;
  }
}

async function establishTrustline(userKeypair, issuerPublic) {
  try {
    console.log("🔗 Establishing trustline for XHIBIT...");

    const userPublic = userKeypair.publicKey();
    const userAccount = await server.loadAccount(userPublic);

    // Check if trustline already exists
    const hasTrustline = userAccount.balances.some(
      (b) => b.asset_code === "XHIBIT" && b.asset_issuer === issuerPublic
    );

    if (hasTrustline) {
      console.log("✅ Trustline for XHIBIT already exists!");
      return true;
    }

    // Build trustline transaction
    const fee = await server.fetchBaseFee();
    const asset = new StellarSdk.Asset("XHIBIT", issuerPublic);

    const transaction = new StellarSdk.TransactionBuilder(userAccount, {
      fee,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.changeTrust({
          asset: asset,
          limit: "1000000", // Set a limit of 1M XHIBIT tokens
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(userKeypair);
    const txResult = await server.submitTransaction(transaction);

    console.log("✅ Trustline established!");
    console.log("📋 Transaction Hash:", txResult.hash);
    return true;
  } catch (error) {
    console.error(
      "❌ Error establishing trustline:",
      error.response?.data || error.message
    );
    return false;
  }
}

async function transferXhibitTokens(issuerKeypair, userPublic, amount = "100") {
  try {
    console.log(`💸 Transferring ${amount} XHIBIT tokens...`);

    const issuerPublic = issuerKeypair.publicKey();
    const issuerAccount = await server.loadAccount(issuerPublic);
    const fee = await server.fetchBaseFee();
    const asset = new StellarSdk.Asset("XHIBIT", issuerPublic);

    const transaction = new StellarSdk.TransactionBuilder(issuerAccount, {
      fee,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: userPublic,
          asset: asset,
          amount: amount,
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(issuerKeypair);
    const txResult = await server.submitTransaction(transaction);

    console.log("✅ XHIBIT tokens transferred successfully!");
    console.log("📋 Transaction Hash:", txResult.hash);
    return true;
  } catch (error) {
    console.error(
      "❌ Error transferring XHIBIT tokens:",
      error.response?.data || error.message
    );
    return false;
  }
}

async function main() {
  console.log("🌟 Stellar XHIBIT Token Setup - Standalone Version");
  console.log("==================================================");
  console.log("");

  // Step 1: Create new account
  const account = await createStellarAccount();
  if (!account) {
    console.log("❌ Failed to create account. Exiting...");
    return;
  }

  // Wait a moment for the account to be funded
  console.log("⏳ Waiting for account funding to complete...");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Step 2: Create XHIBIT asset (get issuer info)
  const assetInfo = await createXhibitAsset();
  if (!assetInfo) {
    console.log("❌ Failed to create XHIBIT asset. Exiting...");
    return;
  }

  // Step 3: Establish trustline
  const trustlineEstablished = await establishTrustline(
    account.keypair,
    assetInfo.issuerPublic
  );
  if (!trustlineEstablished) {
    console.log("❌ Failed to establish trustline. Exiting...");
    return;
  }

  // Step 4: Transfer XHIBIT tokens
  const transferSuccess = await transferXhibitTokens(
    assetInfo.issuerKeypair,
    account.publicKey,
    "100"
  );
  if (!transferSuccess) {
    console.log("❌ Failed to transfer XHIBIT tokens. Exiting...");
    return;
  }

  console.log("");
  console.log("🎉 Setup Complete!");
  console.log("==================");
  console.log("📋 Account Address:", account.publicKey);
  console.log("🔑 Secret Key:", account.secretKey);
  console.log("💰 XHIBIT Balance: 100 tokens");
  console.log("");
  console.log("⚠️  IMPORTANT: Save your secret key securely!");
  console.log(
    "🔍 You can view your account at: https://laboratory.stellar.org/#account-viewer"
  );
  console.log("🌐 Testnet Explorer: https://stellar.expert/explorer/testnet");
}

// Run the main function
main().catch(console.error);
