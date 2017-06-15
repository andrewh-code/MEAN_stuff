// get the mongoose model library
var mongoose = require('mongoose');

// create schema for users
var userSchema = mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})


// export user 
var User = module.exports = mongoose.model('users', userSchema);    // this is stupid (you need to have a PLURALized collection name in mongodb )

// create methods specific to the user

// insert new user
module.exports.addUser = function(user, callback){
    User.create(user, callback);
}

//find user
module.exports.getUser = function(userID, callback){
    User.findById(userID, callback);
}

// retrieve all users
// don't use limit for this
module.exports.getUsers = function(callback, limit){
    User.find(callback).limit(limit);   // max number of users returned
}