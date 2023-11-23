const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const idValidator = require('mongoose-id-validator');

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
      
},{
    timestamps: true 
})
BookSchema.statics.findByAuthor = function(authorId) {
    return this.find({ author: authorId }).populate('categories').exec();
  };
  BookSchema.plugin(idValidator, {message: 'Author ID {VALUE} does not exist'});
const Books = mongoose.model('Books',BookSchema);
module.exports = Books;