const mongoose = require('mongoose');
cosnt = BookSchema = mongoose.Schema({
    name :{
        type :String,
        required :(true,"Please enter a book name")
    },
    pageNumber :{
        type:Number,
        required :(true,"Please enter number of pages")

    },
    author:{
        type:String,
        required :(true,"Please enter the author name")

    },
    price :{
        type:Number,
        required :(true,"Please enter the price")

    }
})

const Books = mongoose.model('Books',BookSchema);
module.exports = Books;