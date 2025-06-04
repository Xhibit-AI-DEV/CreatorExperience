const StellarSdk = require('stellar-sdk');
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

async function createTestAccount() {
  const pair = StellarSdk.Keypair.random();
  const publicKey = pair.publicKey();
  const secret = pair.secret();

  const friendbotUrl = `https://friendbot.stellar.org?addr=${publicKey}`;
  await fetch(friendbotUrl);

  return { publicKey, secret };
}
module.exports = { createTestAccount };
