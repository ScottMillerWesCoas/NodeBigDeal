var http = require('http'); 

//PURE, SIMPLE NODE SERVER
// http.createServer(function(req, res){
//   res.writeHead(200, {'Content-Type':'text/plain'}); 
//   res.write('How are you?\n'); 
//   setTimeout(function(){
//     res.write('thanks for asking, I\'m good!\n'); 
//     res.end(); 
//   }, 3000); 
//   res.write("I'm waitin' ova here...\n")
// }).listen(3200, function(){console.log('you\'re listening on 3200')}); 


//EVENT EMITTER STYLE FOR NODE SERVER
var server = http.createServer(); 
server.on('request', function(req, res){
  res.writeHead(200, {'Content-Type':'text/plain'}); 
  res.write('How are you?\n'); 
  setTimeout(function(){
    res.write('thanks for asking, I\'m good!\n'); 
    res.end(); 
  }, 3000); 
  res.write("I'm waitin' ova here...\n"); 
  }); 
server.listen(3200, function(){console.log('you\'re listening on 3200')}); 