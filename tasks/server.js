var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var port = 3000;

var index = require('./routes/index');  //variable to hold the routes
var tasks = require('./routes/tasks');  //variable to hold routes
var app = express();

// view engine (render the html templates)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// set the static folder
app.use(express.static(path.join(__dirname, 'client')));

// bopdy parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/', index);
app.use('/api', tasks);

app.listen(port, function(){
    console.log("Now listening on " + port);
})