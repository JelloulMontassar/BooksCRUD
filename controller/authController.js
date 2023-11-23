const { response } = require("../app");
const jwt = require('jsonwebtoken');
const userModel = require("../models/userModel")
const bcrypt = require('bcrypt');
//Login


const signUp = (req,res,next)=>{
    let {email,password} = req.body;
    if (email==""||password==""){
      res.status(400).json({message:"Email or password must not be empty"})
    }
    else
      {
        userModel.find({email}).then(res1=>{
          if(res1.length){
            res.status(400).json({message:"User with this email already exists !"})
          }
          else{
            bcrypt.hash(req.body.password,10)
      .then((hash)=>{
          const user = new userModel({
              login : req.body.login,
              motdepasse:hash,
              role:req.body.role,
              telephone:req.body.telephone,
              nom:req.body.nom,
              prenom:req.body.prenom
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
        })
        
      }
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
              token: jwt.sign({ userId: user._id ,role:user.role}, "RANDOM_TOKEN_SECRET", {
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