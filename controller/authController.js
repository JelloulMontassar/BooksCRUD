const { response } = require("../app");
const jwt = require('jsonwebtoken');
const userModel = require("../models/userModel")
const bcrypt = require('bcrypt');
//Login


const signUp = (req,res,next)=>{
    console.log("body;",req.body)
    bcrypt.hash(req.body.password,10)
    .then((hash)=>{
        const user = new userModel({
            email : req.body.email,
            password:hash
        })
        user.save().then((response)=>{
            const newUser = response.toObject()
            delete newUser.password
            res.status(201).json({
                user:newUser,
                message:"Utilisateur Créé ! ",
            })
        })
        .catch((error)=>res.status(400).json({error}))
    })
    .catch((error)=>res.status(500).json({error}))

}
const logIn = (req, res, next) => {
    userModel.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: "Login ou mot de passe incorrecte" });
        }
  
        bcrypt.compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ message: "Login ou mot de passe incorrecte" });
            }
  
            res.status(200).json({
              token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                expiresIn: "24h",
              }),
            });
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };
  
module.exports = {
    logIn : logIn,
    signUp : signUp



}