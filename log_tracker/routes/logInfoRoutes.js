var express = require('express');
var router = express.Router();      // initiate router


// create REST api calls
// hello world test
router.get('/', function(request, response){
    response.send("Hello world");
});

// export all the REST api calls so that the server can use them (this is key)
// if you don't do this, you'll get Router.use() requires middleware function but got an object error
module.exports = router;
