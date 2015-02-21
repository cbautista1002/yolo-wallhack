var redis    = require('../lib/redis.js');
// Reverse index - from end of list
var numLines = -10;

/*
    Only keep the last numLines number of lines
*/
var trim = function(){
    redis.ltrim('lines', numLines, -1, function(error){
        if(error) throw error;
    });
};

/*
    Save the new line to the database, then trim
*/
exports.save = function(line, callback){
    redis.rpush('lines', line, function(error, data){
        if(error) return callback(error, null);
        trim();
    });
};

/*
    Fetch the lines from the database
*/
exports.get = function(callback){
    redis.lrange('lines', 0, -1, function(error, data){
        if(error) return callback(error, null);
        callback(null, data);
    });
};