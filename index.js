const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
var fs = require(`fs`);
const GridFsStorage = require("multer-gridfs-storage");
// const flash = require('connect-flash');

// Initialize App
const app = express();

// DB Config
const db = require('./config/keys').MongoURI;

// Connect to Mongoose
 mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
     .then( () => console.log('MongoDB Connected.....'))
     .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/indexRouter'));

const PORT = 8081;

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});