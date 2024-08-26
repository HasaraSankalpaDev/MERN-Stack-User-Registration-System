const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const cors = require("cors");
const User = require("./Model/UserRegister");

const app = express();

// Setup Middlewares
app.use(express.json());
app.use(cors());

// Connecting to Database
mongoose
  .connect("mongodb+srv://admin:fpInEZKkxEkx5Ppz@mernusermanagementsyste.pmdy3.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((err) => console.error("Database connection error:", err));

// User Registration Route
app.post("/register", async (req, res) => {
  const { uName, uEmail, uPass, uType } = req.body;

  // Validate input
  if (!uName || !uEmail || !uPass) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ uEmail }] });
    if (existingUser) {
      return res.json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(uPass, 10);

    // Create and save the new user
    const newUser = new User({
      uName,
      uEmail,
      uPass: hashedPassword,
      uType,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch All Users Route
app.get("/register", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User Login Route
app.post("/login", async (req, res) => {
  const { uEmail, uPass } = req.body;

  // Validate input
  if (!uEmail || !uPass) {
    return res.status(400).json({ error: "Both email and password are required" });
  }

  // Hashing Password

  try {
    const user = await User.findOne({ uEmail });

    if (!user) {
      return res.status(404).json({ status: "notFound", error: "User not found" });
    }

    // Check if the password matches
    const isPasswordCorrect = await bcrypt.compare(uPass, user.uPass);
    if (!isPasswordCorrect) {
      return res.status(401).json({ status: "pwsError", error: "Incorrect password" });
    }

    // User found and password is correct
    const responseMessage = user.uType === "User" ? "Found User" : "Found Admin";
    return res.status(200).json({ status: "ok", message: responseMessage });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ error: "Server Error" });
  }
});
