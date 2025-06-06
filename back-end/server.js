const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/auth");
const fundAccountRoutes = require("./routes/fundAccount");
const lookbookRoutes = require("./routes/lookbook");
const generateRoutes = require('./routes/generate');
const db = require('./db');
const app = express();

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());

// Mount routes with explicit paths
app.use("/api/auth", authRoutes);
app.use("/api/fund", fundAccountRoutes);
app.use("/api/lookbook", lookbookRoutes);
app.use('/api/generate', generateRoutes);

(async () => {
  try {
    const [rows] = await db.query('SELECT 1');
    console.log('✅ Successfully connected to the database!');
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
})();

// Only start the server if this file is run directly (not required as a module)
if (require.main === module) {
    const PORT = process.env.PORT || 2000;
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
        console.log('Available routes:');
        console.log('- GET /api/auth/public-key');
        console.log('- GET /api/auth/user/wallet/:email');
        console.log('- GET /api/auth/balance');
        console.log('- GET /api/auth/lookbookIDs');
    });
}

module.exports = app;