var express = require('express');
var router = express.Router();      // initiate router

// include the model
var TrackerInfo = require('../models/info');    //TODO: bad practice, figure out how to refactor the ../

// create REST api calls
// hello world test
router.get('/', function(request, response){
    response.send("Hello world");
});

// rest api to get job info
router.get('/info', function(request, response){
    TrackerInfo.getLogInfo(function(err, infos){
        if (err){
            throw err;
        }
        response.json(infos);
    })
});

// api to post/add the log info
router.post('/info', function(request, response){
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

// export all the REST api calls so that the server can use them (this is key)
// if you don't do this, you'll get Router.use() requires middleware function but got an object error
module.exports = router;
