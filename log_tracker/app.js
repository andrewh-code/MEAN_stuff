// entry point for backend

// require framework libraries
var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var port = 54321;

// express middleware
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// include the model
var User = require('./models/user');
var TrackerInfo = require('./models/info');

// create mongoosedb connection
var mongooseURL = 'mongodb://localhost:27017/jobtracker';
mongoose.connect(mongooseURL);
var db = mongoose.connection;

// create REST api calls
// hello world test
app.get('/', function(request, response){
    response.send("Hello world");
});


// rest api call to get the user
app.get('/user/:_id', function(request, response){
    // user variable to represent the _id var
    var userid = request.params._id;
    User.getUser(userid, function(err, user){
        if (err){
            throwerr;
        }
        response.json(user);
    }) 
});

// rest api to get all users
app.get('/user', function(request, response){
    User.getUsers(function(err, users){
        if(err){
            throw err;
        }
        response.json(users);
    })
});


// rest api to get job info
app.get('/info', function(request, response){
    TrackerInfo.getLogInfo(function(err, infos){
        if (err){
            throw err;
        }
        response.json(infos);
    })
});

// api to post/add the log info
app.post('/info', function(request, response){
    var bodyInfo = request.body;    // parse the body of the request
    if (bodyInfo == null){
        throw 'bodyInfo is empty';
    }
    

    TrackerInfo.addNewEntry(bodyInfo, function(err, bodyInfo){
        if(err){
            throw err;
        } 
        response.json(bodyInfo);
    });
});

// start  server
app.listen(port, function(){
    console.log("now servering on port " + port);
})