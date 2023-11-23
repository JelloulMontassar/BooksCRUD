const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = mongoose.Schema({
    email : {type : String , required:true},
    password : {type : String , required : true},
    lastname : {type : String },
    firstname : { type : String },
    role:{
        type:String,
        enum:['user','admin'],required:true
    
    }

},{
    timestamps: true 
})
userSchema.virtual('name').get(function () {
    return `${this.firstname} ${this.lastname}`;
});
userSchema.methods.toPublic = function () {
    const userObject = this.toObject(); 

    delete userObject.password;

    userObject.name = `${this.firstname} ${this.lastname}`;

    return userObject;
};
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User",userSchema);
