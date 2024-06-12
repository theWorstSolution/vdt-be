const User = require("../models/user");
const firebaseApp = require("./firebase");
const { getAuth } = require("firebase-admin/auth");


const authRequire = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    const user = await getAuth(firebaseApp).verifyIdToken(token?token:'').catch((err)=>{console.log(err);})
    if(!user){
        res.status(403).send()
        return;
    }
    req.auth = user;
    
    let dbUser = await User.findById(user.uid)
    if(!dbUser){
        user._id = user.uid
        user.role = user.email.toString() == 'caitendenhonhat@gmail.com'?'admin':'user'
        dbUser = await User.create(user)
    }
    req.auth.role = dbUser.role
    console.log(req.auth);
    
  
    return next();
  };
  
  module.exports = authRequire;