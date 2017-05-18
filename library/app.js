// entry point

// require/pass in the libraries 
var express = require('express');
var app = express();
var path = require('path');   // path is a system module built into npm/node
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//middleware
app.use(bodyParser.json());  //handle payload information

// include models
Genre = require('./models/genre');
Book = require('./models/book');
// create mongoosedb connection
var uri = 'mongodb://localhost:27017/bookstore';
mongoose.connect(uri);
var db = mongoose.connection;

// set the routes

// basic hello world http GET request. 
// put in the URI and then the [callback] function that will be used to execute 
app.get('/', function(req, res){
    res.send('Hello World!');
});   //http GET request

// route api to get everything in the genres collection
app.get('/api/genres', function(req, res){
    //res.send('genres');
    Genre.getGenres(function(err, genres){
        if(err){
            throw err;
        }
        res.json(genres);
    });
});

// post request to add genre (use same URL/URI, as long as the requests are different)
app.post('/api/genres', function(req, res){
    var genre = req.body;   //allows us to access everything that comes in through the form
    
    Genre.addGenre(genre, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

// post request to add genre (use same URL/URI, as long as the requests are different)
app.put('/api/genres/:_id', function(req, res){
    var id = req.params._id;    //parameters from the URI
    var genre = req.body;   //allows us to access everything that comes in through the form
    
    Genre.updateGenre(id, genre, {}, function(err, genre){  // blank curly braces indicate the empty options argument
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

app.delete('/api/genres/:_id', function(req, res){
    var id = req.params._id;    //parameters from the URI
    Genre.deleteGenre(id, function(err, genre){  // blank curly braces indicate the empty options argument
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

// route api to get everything in the books collection
app.get('/api/books', function(req, res){
    Book.getBooks(function(err, books){
        if(err){
            throw err;
        }
        res.json(books);
    })
});

// route api to get books by their ID
app.get('/api/books/:_id', function(req, res){  //put in _id to match the id col of mongodb
    // need to take the :id var from the URI
    var bookId = req.params._id;
    Book.getBookById(bookId, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    })
});

// post request to add book (use same URL/URI, as long as the requests are different)
app.post('/api/books', function(req, res){
    var book = req.body;   //allows us to access everything that comes in through the form
    
    Book.addBook(book, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

// PUT request for book
app.put('/api/books/:_id', function(req, res){
    var id = req.params._id;    //parameters from the URI
    var book = req.body;   //allows us to access everything that comes in through the form
    
    Book.updateBook(id, book, {}, function(err, book){  // blank curly braces indicate the empty options argument
        if(err){
            throw err;
        }
        res.json(book);
    });
});

app.delete('/api/books/:_id', function(req, res){
    var id = req.params._id;    //parameters from the URI
    Book.deleteBook(id, function(err, book){  // blank curly braces indicate the empty options argument
        if(err){
            throw err;
        }
        res.json(book);
    });
});

// host server
app.listen(3000);
console.log("now serving...");