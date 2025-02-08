require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const admin = require('firebase-admin');
const path = require('path');

// Ensure correct path to service account JSON file
const serviceAccount = require(path.join(__dirname, './Database/firebase.json'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://your-project-id.firebaseio.com' // Replace with your actual Firebase database URL
  });
} else {
  admin.app(); // Use existing app instance if already initialized
}

const db = admin.firestore();

console.log("Firebase Initialized Successfully!");

module.exports = { db };


 // Initialize Firestore (or use Realtime DB if needed)



// Default Route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
//port