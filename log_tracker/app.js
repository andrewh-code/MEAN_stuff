// entry point for backend

// require framework libraries
var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// middleware
var port = 54321;
app.use(bodyParser.json());  //handle payload information

// include the model
var User = require('./models/user');
var TrackerInfo = require('./models/info');

// create mongoosedb connection
var mongooseURL = 'mongodb://localhost:27017/jobtracker';
mongoose.connect(mongooseURL);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongooseURL);
});


// include the routes
var infoRoutes = require('./routes/logInfoRoutes');

app.use('/api', infoRoutes);

app.use(function(req, res) {
      res.status(404).send('404, page not found');
  });

// // rest api call to get the user
// app.get('/user/:_id', function(request, response){
//     // user variable to represent the _id var
//     var userid = request.params._id;
//     User.getUser(userid, function(err, user){
//         if (err){
//             throwerr;
//         }
//         response.json(user);
//     }) 
// });

// // rest api to get all users
// app.get('/user', function(request, response){
//     User.getUsers(function(err, users){
//         if(err){
//             throw err;
//         }
//         response.json(users);
//     })
// });


// start  server
app.listen(port, function(){
    console.log("now servering on port " + port);
})