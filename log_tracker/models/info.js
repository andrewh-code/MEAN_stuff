// get the mongoose model library
var mongoose = require('mongoose');


// create schema for the log info
var infoSchema = mongoose.Schema({
    date:{
        type: Date,
        default: Date.now
    },
    action: String,
    position: String,
    company: String,
    contact_name: String,
    contact_email: String,
    contact_phone: String,
    extra: String
})

// export the info schema
var LogInfo = module.exports = mongoose.model('info', infoSchema);

// create methods for the info
module.exports.getLogInfo = function(callback){
    LogInfo.find(callback);
}

// method to add log to the backend
module.exports.addNewLog = function(info, callback){
    LogInfo.create(info, callback);
}