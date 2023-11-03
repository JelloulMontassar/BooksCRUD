const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookSchema = mongoose.Schema({
    author: { type: Schema.Types.ObjectId, 
        ref: "Author" 
    },

    name :{
        type :String,
        required :(true,"Please enter a book name")
    },
    pageNumber :{
        type:Number,
        required :(true,"Please enter number of pages")

    },
    price :{
        type:Number,
        required :(true,"Please enter the price")

    },
    categories: [
        {
          type: Schema.Types.ObjectId,
          ref: "Category",
        }
      ],
})

const Books = mongoose.model('Books',BookSchema);
module.exports = Books;