const express = require("express");
const router = express.Router();
const BookController = require("../controller/books")
const auth = require("../middleware/auth")
router.use(express.json())
//Get All Books
router.get("/",BookController.getAllBooks)
//Get Book By ID
router.get("/:id",auth.loggedMiddleware,auth.isAdmin,BookController.getBookByID)
//Update Book
router.put("/:id",BookController.updateBook)
//Delete Book
router.delete("/:id",BookController.deleteBook)
//Add Books
router.post("/",BookController.addBook)
router.route("/category").post(BookController.addCategory)

module.exports = router;
