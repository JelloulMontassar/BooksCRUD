const bookModel = require("../models/BooksModel");
const Category = require("../models/categoryModel");
const getAllBooks = (async (req,res)=>{
    try{
        const books = await bookModel.find({});
        res.status(200).json({model :books});
    }catch{
        console.log(req.body);
        res.status(500).json({message: "error.message"})
    }
})
//Get Book By ID
const getBookByID = (async (req,res)=>{
    try{
        const {id} = req.params;
        const book = await bookModel.findById(id);
        res.status(200).json(book);
    }catch{
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
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
       try {
        const book = await bookModel.create(req.body);
        res.status(200).json(book);
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
    addBook : addBook



}