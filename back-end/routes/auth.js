const express = require("express");
const router = express();
const { createTestAccount } = require("../services/stellarService");
const db = require("../db");

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Received signup request for:", email);

    const { publicKey, secret } = await createTestAccount();
    console.log("Created test account:", publicKey);

    await db.query('INSERT INTO users (email, public_key, secret) VALUES (?, ?, ?)', [email, publicKey, secret]);
    console.log("Saved user to DB");

    res.json({ wallet_address: publicKey });
    console.log("Response sent");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Signup failed" });
  }
});

router.get('/public-key', async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  try {
    const [results] = await db.query(
      'SELECT public_key FROM users WHERE email = ?',
      [email]
    );
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ wallet_address: results[0].public_key });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/balance', async (req, res) => {
  const { publicKey } = req.query;
  if (!publicKey) {
    return res.status(400).json({ error: 'publicKey is required' });
  }
  try {
    const [results] = await db.query(
      'SELECT balance FROM users WHERE public_key = ?',
      [publicKey]
    );
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ balance: results[0].balance });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


// GET lookbookIDs for public_key
router.get('/lookbookIDs', async (req, res) => {
  const { publicKey } = req.query;  
  if (!publicKey) {
    return res.status(400).json({ error: 'publicKey is required' });
  }
  try {
    const [results] = await db.query(
      'SELECT lookbookIDs FROM users WHERE public_key = ?',
      [publicKey]
    );
    res.json({ lookbookIDs: JSON.parse(results[0].lookbookIDs) });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get("/user/wallet/:email", async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    // Query the database for the user's wallet address
    const [user] = await db.query(
      "SELECT public_key FROM users WHERE email = ?",
      [email]
    );

    if (!user || !user[0]) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      walletAddress: user[0].public_key
    });

  } catch (error) {
    console.error("❌ Error fetching wallet address:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch wallet address",
      error: error.message
    });
  }
});

module.exports = router;
