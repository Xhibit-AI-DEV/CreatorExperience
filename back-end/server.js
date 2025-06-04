const express = require('express');
const cors = require('cors');
const authRoutes = require("./routes/auth");
const fundAccountRoutes = require("./routes/fundAccount");
const lookbookRoutes = require("./routes/lookbook");
const generateRoutes = require('./routes/generate');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", authRoutes);
app.use("/", fundAccountRoutes);
app.use("/", lookbookRoutes);
app.use('/', generateRoutes);
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
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
    });
}

module.exports = app;