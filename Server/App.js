// fpInEZKkxEkx5Ppz
const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/UserRoutes");

const app = express();
const cors = require("cors");

// Setup Middlewares
app.use(express.json());
app.use(cors());
app.use("/users", router);

// connecting to database
mongoose
  .connect(
    "mongodb+srv://admin:fpInEZKkxEkx5Ppz@mernusermanagementsyste.pmdy3.mongodb.net/"
  )
  .then(() => console.log("Connected To Mongo DB"))
  .then(() => {
    app.listen(8000);
  })

  .catch((err) => console.error(err));

// User Registration Part
require("./Model/UserRegister");
const User = mongoose.model("UserRegister");
app.post("/register", async (req, res) => {
  const { uName, uEmail, uPass } = req.body;
  try {
    await User.create({
      uName,
      uEmail,
      uPass,
    });
    res.send("User Created Successfully");
  } catch (err) {
    console.error(err);
  }
});

// User Login Part
app.post("/login", async (req, res) => {
  const { uEmail, uPass } = req.body;
  try {
    const user = await User.findOne({ uEmail });

    if (!user) {
      res.json("User Not Found");
    }

    if (user.uPass === uPass) {
      res.json({ status: "ok" });
    } else {
      res.json("Incorrect User Name Or Email");
    }
  } catch (err) {
    console.error(err);
    res.json("Server Error");
  }
});
