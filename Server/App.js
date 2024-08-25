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
  if (!uName || !uEmail || !uPass) {
    return res.status(400).json({ error: "All fields are required." });
  }
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
// const express = require("express");
// const mongoose = require("mongoose");
// const router = require("./Routes/UserRoutes");

// const app = express();
// const cors = require("cors");

// // Setup Middlewares
// app.use(express.json());
// app.use(cors());
// app.use("/users", router);

// // connecting to database
// mongoose
//   .connect(
//     process.env.MONGODB_URI || "mongodb+srv://admin:fpInEZKkxEkx5Ppz@mernusermanagementsyste.pmdy3.mongodb.net/",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => console.log("Connected To MongoDB"))
//   .then(() => {
//     app.listen(8000, () => console.log("Server running on port 8000"));
//   })
//   .catch((err) => console.error("Database connection error:", err));

// // User Registration Model
// require("./Model/UserRegister");
// const User = mongoose.model("UserRegister");

// // User Registration Route
// app.post("/register", async (req, res) => {
//   const { uName, uEmail, uPass } = req.body;

//   if (!uName || !uEmail || !uPass) {
//     return res.status(400).json({ error: "All fields are required." });
//   }

//   try {
//     await User.create({ uName, uEmail, uPass });
//     res.status(201).json({ message: "User Created Successfully" });
//   } catch (err) {
//     console.error("Error creating user:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // User Login Route
// app.post("/login", async (req, res) => {
//   const { uEmail, uPass } = req.body;

//   if (!uEmail || !uPass) {
//     return res.status(400).json({ error: "Both email and password are required." });
//   }

//   try {
//     const user = await User.findOne({ uEmail });

//     if (!user) {
//       return res.status(404).json({ error: "User Not Found" });
//     }

//     if (user.uPass === uPass) {
//       return res.status(200).json({ status: "ok", message: "Login Successful" });
//     } else {
//       return res.status(401).json({ error: "Incorrect Password" });
//     }
//   } catch (err) {
//     console.error("Error during login:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
