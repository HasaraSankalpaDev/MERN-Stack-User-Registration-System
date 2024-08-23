const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserModel = new Schema({
    uName: {
        type: String,
        required: true
    },
    uEmail: {
        type: String,
        required: true
    },
    uPass: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("UserModel", UserModel);
