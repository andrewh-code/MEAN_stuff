var express = require('express');
var router = express.Router();      // initiate router

// set router for home page (accepts GET request)
router.get('/', function(request, response, next){
    //response.send('Hello from index page');
    // want to load the html page
    response.render('index.html');
});

// export the router object so other functions/calsses can use it
module.exports = router;
