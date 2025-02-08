const express = require("express");
const path = require("path");
const { createUser } = require(path.join(__dirname, "../Database/userModel"));


const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
  const { email, name } = req.body;
  const response = await createUser(email, name);
  res.status(response.success ? 200 : 400).json(response);
});

module.exports = router;
