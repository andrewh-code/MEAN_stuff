var express = require('express');
var router = express.Router();      // initiate router

var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/task_proj');

// set router for home page (accepts GET request)
router.get('/tasks', function(request, response, next){
    //response.send('Hello from tasks page');
    db.tasks.find(function(err, books){
        if(err){
            response.send(err);
        }
        response.json(books);
    })
});


// REST API to retrieve ONE task
router.get('/task/:id', function(request, response, next){
    var taskID = request.params.id;

    db.tasks.findOne({_id: mongojs.ObjectId(taskID)}, function(err, task){
        if(err){
            response.send(err);
        }
        response.json(task);
    });
});

// REST API to save a task
router.post('/task/', function(request, response, next){
    var task = req.body;    // get the task from the form

    if (!task.title || (task.isDone + '')){
        response.status(400);
        response.json({
            "error": "bad data"
        });
    }else{
        db.tasks.save(task, function(err, task){
            if (err){
                res.send(err);
            }
            res.json(task);
        });
    }
});


// REST api to delete a task
router.delete('/task/:id', function(request, response, next){
    var taskID = request.params.id;

    db.tasks.remove({_id: mongojs.ObjectId(taskID)}, function(err, task){
        if(err){
            response.send(err);
        }
        response.json(task);
    });
});

// REST api to update a task
router.put('/task/:id', function(request, response, next){
    var taskID = request.params.id;
    var task = req.body;
    var updTask = {};

    if (task.isDone){
        upTask.isDone = task.isDone;
    }
    if (task.title){
        upTask.title = task.title;
    }

    if (!updTask){
        response.status(400);
        response.json({
            "error":"Bad data"
        });
    }else{
        db.tasks.update({_id: mongojs.ObjectId(taskID)},updTask, {}, function(err, task){   // take in the taskid, updated task object, empty task, callback function
        if(err){
            response.send(err);
        }
        response.json(task);
    });
    }
    
});
// export the router object so other functions/calsses can use it
module.exports = router;
