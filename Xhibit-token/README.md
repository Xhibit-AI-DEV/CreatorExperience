# XHIBIT Token - Standalone Stellar Script

This standalone script creates a new Stellar account, deploys the XHIBIT asset, establishes trustlines, and transfers 100 XHIBIT tokens without requiring any backend or database connections.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Create a .env file:**

   ```bash
   # Create .env file in the Xhibit-token directory
   echo "ISSUER_SECRET=your_issuer_secret_key_here" > .env
   ```

3. **Generate an issuer secret key (if you don't have one):**

   ```bash
   node -e "console.log(require('stellar-sdk').Keypair.random().secret())"
   ```

4. **Update the .env file with your issuer secret key**

## Usage

Run the script:

```bash
npm start
```

Or directly:

```bash
node XhibitToken.js
```

## What the script does:

1. **Creates a new Stellar account** with a random keypair
2. **Funds the account** with XLM using the Stellar testnet friendbot
3. **Sets up the XHIBIT asset** using your issuer secret key
4. **Establishes a trustline** between the new account and the XHIBIT asset
5. **Transfers 100 XHIBIT tokens** to the new account

## Output

The script will console log:

- The new account's public key (address)
- The new account's secret key (save this securely!)
- Transaction hashes for each operation
- Final confirmation of the setup

## Important Notes

- This script uses the **Stellar testnet** - no real funds are involved
- Save the secret key securely - you'll need it to sign transactions
- The issuer secret key in your .env file controls the XHIBIT asset
- You can view your account on the [Stellar Laboratory](https://laboratory.stellar.org/#account-viewer)

## Security

- Never commit your .env file to version control
- Keep your secret keys secure and private
- This is for testing purposes only

## Troubleshooting

- Make sure your .env file contains a valid ISSUER_SECRET
- Ensure you have an internet connection for Stellar network access
- Check that the issuer account has sufficient XLM for transaction fees
