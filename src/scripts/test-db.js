const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function test() {
  try {
    console.log("Connecting to:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err);
    process.exit(1);
  }
}

test();
