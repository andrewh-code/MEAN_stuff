// mongodb connection
var mongoose = require('mongoose');

// schema for books 

// book schema
var bookSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true,
    },
    description:{
        type: String 
    },
    author:{
        type: String,
        required: true 
    }, 
    publisher: {
        type: String 
    }, 
    pages:{
        type: Number
    },
    image_url: {
        type: String 
    },
    buy_url:{
        type: String 
    },
    create_date:{
        type: Date,
        default: Date.now
    }
})

var Book = module.exports = mongoose.model('books', bookSchema);

// get books function  (accessible from other classes/functions)
module.exports.getBooks = function(callback, limit){
    Book.find(callback).limit(limit);  // maximum number of documents that will be returned
} 

// find book by its ID
module.exports.getBookById = function(bookId, callback){
    Book.findById(bookId, callback)
}

// add book
module.exports.addBook = function(book, callback){
    Book.create(book, callback);
}

// update book
module.exports.updateBook = function(id, book, options, callback){
    var query = {_id: id};
    var update = {
        title: book.title,
        genre: book.genre,
        description: book.description,
        author: book.author,
        publisher: book.publisher,
        pages: book.pages,
        image_url: book.image_url,
        buy_url: book.buy_url
    }
    Book.findOneAndUpdate(query, update, options, callback);
}

//delete book
module.exports.deleteBook = function(id, callback){
    var query = {_id: id};
    Book.remove(query, callback);
}