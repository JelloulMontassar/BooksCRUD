const authorModel = require("../models/authorModel");

const addAuthor = (async (req,res)=>{
    try{
        const author = await authorModel.create(req.body);
        res.status(200).json(author);
    }catch{
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})
const getAuthorWithBooks = async (req, res) => {
    try {
      const author = await authorModel.findById(req.params.authorId).populate({
        path: 'books',
        select:"-author",
        populate: { path: 'categories' ,select:"-_id"}});
      res.status(200).json(author);
    } catch (error) {  // Added the error parameter
      console.error(error.message);  // Log the error message
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports = {
    addAuthor:addAuthor,
    getAuthorWithBooks:getAuthorWithBooks
}