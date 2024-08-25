const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserRegister = new Schema({
    uName: { type: String, required: true },
    uEmail: { type: String, required: true },
    uPass: { type: String, required: true }
});

module.exports = mongoose.model("UserRegister", UserRegister);
