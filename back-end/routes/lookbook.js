const express = require("express");
const router = express.Router();
const db = require("../db"); // Your DB connection

// POST /create-lookbook - create a new lookbook
router.post("/create-lookbook", async (req, res) => {
  const { userWallet, title, description, ipHash } = req.body;

  // Debug: log request
  console.log("Received create-lookbook:", req.body);

  // Timeout fallback
  setTimeout(() => {
    if (!res.headersSent) {
      console.error("Timeout: No response sent");
      res
        .status(500)
        .json({ success: false, message: "Timeout: No response sent" });
    }
  }, 5000);

  try {
    if (!userWallet || !title || !ipHash) {
      console.log("Missing required fields");
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    console.log("About to query DB");
    const [result] = await db.query(
      "INSERT INTO lookbooks (user_wallet, title, description, ip_hash, status) VALUES (?, ?, ?, ?, ?)",
      [userWallet, title, description, ipHash, "pending"]
    );
    const lookbookId = result.insertId;

    // Append new lookbookId to lookbookIDs array in DB
    await db.query(
      'UPDATE users SET lookbookIDs = JSON_ARRAY_APPEND(lookbookIDs, "$", ?) WHERE public_key = ?',
      [lookbookId, userWallet]
    );

    // Fetch updated lookbookIDs to return in response
    const [users] = await db.query(
      "SELECT lookbookIDs FROM users WHERE public_key = ?",
      [userWallet]
    );
    let lookbookIds = [];
    if (users.length > 0 && users[0].lookbookIDs) {
      lookbookIds = JSON.parse(users[0].lookbookIDs);
    }

    res.json({
      success: true,
      message: "Lookbook created",
      lookbookId,
      lookbookIds,
    });
  } catch (error) {
    console.error(
      "❌ Lookbook creation error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      message: "Failed to create lookbook",
      error: error.response?.data || error.message,
    });
  }
});

// GET /lookbooks - fetch all lookbooks
router.get("/lookbooks", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM lookbooks");
    res.json({
      success: true,
      lookbooks: rows,
    });
  } catch (error) {
    console.error("❌ Error fetching lookbooks:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch lookbooks",
      error: error.message,
    });
  }
});

// GET fetch all lookbook IDs for a wallet address
router.get("/lookbooks/:wallet", async (req, res) => {
  try {
    const { wallet } = req.params;
    const [rows] = await db.query(
      "SELECT id FROM lookbooks WHERE user_wallet = ?",
      [wallet]
    );
    // Map the rows to an array of IDs
    const lookbookIds = rows.map(row => row.id);
    res.json({
      success: true,
      lookbookIds,
    });
  } catch (error) {
    console.error("❌ Error fetching lookbook IDs:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch lookbook IDs",
      error: error.message,
    });
  }
});

// GET all earnings for wallet address
router.get("/lookbook/earnings/:wallet", async (req, res) => {
  try {
    const { wallet } = req.params;
    const [rows] = await db.query(
      "SELECT SUM(earnings) AS totalEarnings FROM lookbooks WHERE user_wallet = ?",
      [wallet]
    );
    res.json({ success: true, totalEarnings: rows[0].totalEarnings || 0 });
  } catch (error) {
    console.error("❌ Error fetching total earnings:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch total earnings",
      error: error.message,
    });
  }
});

// GET earnings details for wallet address
router.get("/lookbook/earnings/details/:wallet", async (req, res) => {
  try {
    const { wallet } = req.params;
    const [rows] = await db.query(
      "SELECT id AS lookbookId, earnings FROM lookbooks WHERE user_wallet = ?",
      [wallet]
    );
    res.json({ success: true, lookbooks: rows });
  } catch (error) {
    console.error("❌ Error fetching earnings details:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch earnings details",
      error: error.message,
    });
  }
});

module.exports = router;
