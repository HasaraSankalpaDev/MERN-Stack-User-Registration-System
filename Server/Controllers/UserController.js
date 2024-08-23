const User = require("../Model/UserModel");

const addUsers = async (req,res,next) => {
    let user;
    const {uName,uEmail,uPass} = req.body;
    try{
        user = new User({uName,uEmail,uPass});
        await user.save();
    }catch(err){
     console.error(err);
    }

    if(!user){
        return res.status(400).json({message: "Can't Insert user data"});
    }

    return res.status(200).json({message : "User Inserted Successfully"});
};

exports.addUsers = addUsers;