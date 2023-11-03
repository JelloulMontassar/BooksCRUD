const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = mongoose.Schema({
    email : {type : String , required:true},
    password : {type : String , required : true},
    lastname : {type : String },
    firstname : { type : String },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    
    }

})
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User",userSchema);
