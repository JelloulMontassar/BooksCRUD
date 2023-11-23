const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const authorSchema = mongoose.Schema({
   
    lastname : {type : String },
    firstname : { type : String },
    nationality: {type:String},
    //books :[{type:Schema.Types.ObjectId,ref:"Books"}]

})
authorSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Author",authorSchema);
