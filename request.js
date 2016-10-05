var http = require('http'); 



function makeRequest(message){
  var options = {
    host: 'localhost', 
    port: 8000,
    path: '/',
    method: 'POST'
  }; 
  var request = http.request(options, function(res){
    res.on('data', function(data){
       console.log(data.toString()); 
    }); 
  }); 
  request.write(message); 
  request.end(); 
}

makeRequest('wrote an http request'); 

module.exports = makeRequest; 