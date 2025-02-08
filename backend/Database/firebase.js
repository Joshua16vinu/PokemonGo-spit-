const admin = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();

// Load Firebase credentials from the environment variable
const serviceAccount = require("./firebase.json");


// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const db = admin.firestore();
const usersRef = db.collection("users");
const reportsRef = db.collection("reports");

module.exports = { admin, db, usersRef, reportsRef };
