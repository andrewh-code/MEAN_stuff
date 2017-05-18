// rquire packages/libraries
var mongoose = require('mongoose');

// create schema for genre 
// this is for the application

// create genreSchema from a mongoose schema, pass in the object's properties
var genreSchema = mongoose.Schema({
    name:{
        type: String,
        required: true      // indicates that it is needed (validation can be done here)
    },
    create_date:{
        type: Date,
        default: Date.now   // default --> automatically inserted
    }
});

var Genre = module.exports = mongoose.model('Genres', genreSchema); //this Genre object is accessible from anywhere else in the project


// can do all the database operations in the routes, can also encapsulate them in the models class

// get genres function  (accessible from other classes/functions)
module.exports.getGenres = function(callback, limit){
    Genre.find(callback).limit(limit);  // maximum number of documents that will be returned
}

// add genre
module.exports.addGenre = function(genre, callback){
    Genre.create(genre, callback);
}

// update a genre
module.exports.updateGenre = function(id, genre, options, callback){
    var query = {_id: id};
    var update = {
        name: genre.name
    }
    Genre.findOneAndUpdate(query, update, options, callback);
}

//delete genre
module.exports.deleteGenre = function(id, callback){
    var query = {_id: id};
    Genre.remove(query, callback);
}