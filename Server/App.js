const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes");

const app = express();
const cors = require("cors");

// Setup Middlewares
app.use(express.json());
app.use(cors());
app.use("/users", router);

// Connecting to Database
mongoose
  .connect(
    "mongodb+srv://admin:fpInEZKkxEkx5Ppz@mernusermanagementsyste.pmdy3.mongodb.net/"
  )
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((err) => console.error("Database connection error:", err));

// User Registration Part
require("./Model/UserRegister");
const User = mongoose.model("UserRegister");

app.post("/register", async (req, res) => {
  const { uName, uEmail, uPass, uType } = req.body;
  
  if (!uName || !uEmail || !uPass) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newUser = await User.create({
      uName,
      uEmail,
      uPass,
      uType,
    });
    res.status(201).json({ message: "User Created Successfully", user: newUser });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

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

// User Login Part
app.post("/login", async (req, res) => {
  const { uEmail, uPass } = req.body;

  if (!uEmail || !uPass) {
    return res.status(400).json({ error: "Both email and password are required" });
  }

  try {
    const user = await User.findOne({ uEmail });

    if (!user) {
      // User not found
      return res.status(404).json({ status: "notFound" });
    }

    if (user.uPass !== uPass) {
      // Incorrect password
      return res.status(401).json({ status: "pwsError" });
    }

    // User found and password is correct
    const responseMessage = user.uType === "User" ? "Found User" : "Found Admin";
    return res.status(200).json({ status: "ok", message: responseMessage });
    
  } catch (err) {
    // Handle server error
    console.error("Error during login:", err);
    return res.status(500).json({ error: "Server Error" });
  }
});
