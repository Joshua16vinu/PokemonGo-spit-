const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
app.use(cors());
// app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/uploads", express.static("uploads")); // Serve uploaded images


app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.get("/", (req, res)=>{
    res.send("Server is running")
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
