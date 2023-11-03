const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryEnum = ['Horror', 'Mystery', 'Fiction', 'Science Fiction', 'Romance', 'Fantasy', 'Non-fiction', 'Thriller', 'Biography', 'Adventure', 'Drama'];

const CategorySchema = new Schema({
  name: {
    type: String,
    enum: categoryEnum, 
    required: [true, 'Category name is required'],
  },
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
