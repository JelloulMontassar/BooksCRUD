const express = require("express");
const mongoose = require('mongoose');
const Books  = require('./models/BooksModel')
const app = express();
app.use(express.json())
app.get("/Books",async (req,res)=>{
    try{
        const books = await Books.find({});
        res.status(200).json(books);
    }catch{
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
app.get("/Books/:id",async (req,res)=>{
    try{
        const {id} = req.params;
        const book = await Books.findById(id);
        res.status(200).json(book);
    }catch{
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
//Update Book
app.put("/Books/:id",async (req,res)=>{
    try{
        const {id} = req.params;
        const book = await Books.findByIdAndUpdate(id,req.body);
        if (!book){
            return res.status(400).json({message:`book not found ${id}`})
        }
        const upbook = await Books.findById(id);
        res.status(200).json(upbook);
    }catch{
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
//Delete Book
app.delete("/Books/:id",async (req,res)=>{
    try{
        const {id} = req.params;
        const book = await Books.findByIdAndDelete(id,req.body);
        if (!book){
            return res.status(400).json({message:`book not found ${id}`})
        }
        
    }catch{
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
app.post("/Books",async (req,res)=>{
    try{
        const book = await Books.create(req.body);
        res.status(200).json(book);
    }catch{
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
module.exports = app;
mongoose.connect("mongodb+srv://jelloulmx:9TdsooyUFvaM3icT@books.tqgkwe4.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log('Connected!'));