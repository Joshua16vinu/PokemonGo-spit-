const admin = require("firebase-admin");
const dotenv = require("dotenv");
const { GoogleAuthProvider } = require("firebase/auth");

dotenv.config();

// Create Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// 🔐 Load Firebase credentials from environment variable (JSON string)
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG_JSON);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firestore references
const db = admin.firestore();
const usersRef = db.collection("users");
const reportsRef = db.collection("reports");

module.exports = { admin, db, usersRef, reportsRef, googleProvider };
