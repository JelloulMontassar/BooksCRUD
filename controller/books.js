const bookModel = require("../models/BooksModel");
const Category = require("../models/categoryModel");
const authorModel = require("../models/authorModel");

const getAllBooks = (async (req,res)=>{
    try{
        const books = await bookModel.find({}).populate("author").populate("categories");
        res.status(200).json({model :books});
    }catch{
        console.log(req.body);
        res.status(500).json({message: "error.message"})
    }
})
//Get Book By ID
const getBookByID = (async (req,res)=>{
    try{
        /* const books = await Book.find().byTitle('JavaScript');
        const boo = await Book.findById('someBookId');
        const jsonString = JSON.stringify(books);

        const totalCost = book.calculateTotalCost(); */
        const {id} = req.params;
        const book = await bookModel.findById(id);
        res.status(200).json(book);
    }catch{
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
//Get Books By AuthorID
const getBookByAuthorID = (async (req, res) => {
    const authorId = req.params.authorId; 

    try {
      const books = await bookModel.findByAuthor(authorId);
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch books by author', message: err.message });
    }
  }
)
//Update Book
const updateBook = (async (req,res)=>{
    try{
        const {id} = req.params;
        const book = await bookModel.findByIdAndUpdate(id,req.body);
        if (!book){
            return res.status(400).json({message:`book not found ${id}`})
        }
        const upbook = await bookModel.findById(id);
        res.status(200).json(upbook);
    }catch{
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
//Delete Book
const deleteBook = (async (req,res)=>{
    try{
        const {id} = req.params;
        const book = await bookModel.findByIdAndDelete(id,req.body);
        if (!book){
            return res.status(400).json({message:`book not found ${id}`})
        }
        
    }catch{
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
//Add Books
const addBook = (async (req,res)=>{
    const booksData = req.body;

    try {
    const createdBooks = [];
    if (!Array.isArray(booksData)) {
        return res.status(400).json({ message: 'Invalid request body. Expected an array of books.' });
        }
    // Loop through each book in the array and create it
    for (const bookData of booksData) {
      const book = await bookModel.create(bookData);
      createdBooks.push(book);

      // Update the author's books field with the ID of the new book
      console.log('Author ID:', book.author);
      await authorModel.findByIdAndUpdate(
        book.author,
        { $push: { books: book._id } },
        { new: true }
      );
    }
        
        res.status(200).json(createdBooks);
       } catch (error) {
        console.error(error);
        res.json(500).json(error)
       }
   
})
 const addCategory=(async(req,res,next)=>{
    try {
        console.log(req.body)
       const category=await Category.create(req.body) 
       res.status(201).json(category)
    } catch (error) {
        console.error(error);
        res.json(500).json(error)
    }
})

module.exports = {
    addCategory,
    getAllBooks : getAllBooks,
    getBookByID :getBookByID,
    updateBook :updateBook,
    deleteBook :deleteBook,
    addBook : addBook,
    getBookByAuthorID



}