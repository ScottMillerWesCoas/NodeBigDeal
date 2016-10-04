var eventEmitter = require('events').EventEmitter; 
var fs = require('fs'); 

var logger = new eventEmitter(); 

logger.on('error', function(message){
  console.log("ERR: " + message); 
}); 

logger.on('warn', function(message){
  fs.readFile('./writtenFiles/writeThis2.txt', 'utf8', function(err, contents){
      console.log(contents); 
      console.log("WARNING: " + message); 
      
  }); 
 
}); 

logger.emit('error', 'you effed up, man!!'); 
logger.emit('warn', 'async party?'); 
