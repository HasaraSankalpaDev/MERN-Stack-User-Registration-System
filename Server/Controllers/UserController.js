// const User = require("../Model/UserModel");
const RegUser = require("../Model/UserRegister");

// Add Users
// const addUsers = async (req,res,next) => {
//     let user;
//     const {uName,uEmail,uPass} = req.body;
//     try{
//         user = new User({uName,uEmail,uPass});
//         await user.save();
//     }catch(err){
//      console.error(err);
//     }

//     if(!user){
//         return res.status(400).json({message: "Can't Insert user data"});
//     }

//     return res.status(200).json({message : "User Inserted Successfully"});
// };

// // View Users
// const viewUsers = async (req,res,next) => {
//     let user;
//     try{
//         user = await User.find({});
//     }catch(err){
//      console.error(err);
//     }

//     if(!user) {
//         return res.status(400).json({message: "No user found"});
//     }
//     res.json(user);
// }

// View Users
const viewRegUsers = async (req,res,next) => {
    let user;
    try{
        user = await RegUser.find({});
    }catch(err){
     console.error(err);
    }

    if(!user) {
        return res.status(400).json({message: "No user found"});
    }
    res.json(user);
}

// Get User By Id
const getUserById = async (req,res,next) => {
    let user;
    const id = req.params.id;
    try{
        user = await RegUser.findById(id);
    }catch(err){
     console.error(err);
    }

    if(!user) {
        return res.status(400).json({message: "No user found"});
    }
    res.json(user);
}

// exports.addUsers = addUsers;
// exports.viewUsers = viewUsers;
exports.viewRegUsers = viewRegUsers;
exports.getUserById = getUserById;
