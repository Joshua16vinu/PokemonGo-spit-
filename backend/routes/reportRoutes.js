const express = require("express");
const multer = require("multer");
const { createReport, verifyReport } = require("../Database/reportModel");

const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Submit a report
router.post("/submit", upload.single("image"), async (req, res) => {
  const { email, issueType, location } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const response = await createReport(email, issueType, location, imageUrl);
  res.status(response.success ? 200 : 400).json(response);
});

// Verify a report
router.post("/verify", async (req, res) => {
  const { reportId } = req.body;
  const response = await verifyReport(reportId, false);
  res.status(response.success ? 200 : 400).json(response);
});

// Flag a report
router.post("/flag", async (req, res) => {
  const { reportId } = req.body;
  const response = await verifyReport(reportId, true);
  res.status(response.success ? 200 : 400).json(response);
});

module.exports = router;
