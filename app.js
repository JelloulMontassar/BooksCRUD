const express = require("express");
const app = express();

const mongoose = require('mongoose');
const bookRoute  = require('./routes/books')
const authRoute = require('./routes/auth')
const authorRoute = require('./routes/author')
mongoose.connect("mongodb://127.0.0.1:27017/books")
.then(() => console.log('Connected!'));
app.use(express.json())
app.use("/api/author",authorRoute);
app.use("/api/books",bookRoute);
app.use("/api/auth",authRoute);
module.exports =app;