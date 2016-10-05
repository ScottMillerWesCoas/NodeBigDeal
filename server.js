// var http = require('http'); 
// var fs = require('fs'); 
// var me = 'Scott'; 

// function send404Response(res){
//     res.writeHead(404, {'Content-Type': 'text/plain'}); 
//     res.write('404 Error, page not found'); 
//     res.end(); 
// }

// function onRequest(req, res){
//     if (req.method === 'GET' && req.url === '/') {
//         res.writeHead(200, {'Content-Type': 'text/html'}); 
//         fs.createReadStream("./index.html").pipe(res); 
//         console.log('res headers: \n' + res._header); 
//     } else { 
//     send404Response(res); 
//     }
// }

// http.createServer(onRequest).listen(3009);  
// console.log('server up, ' + me); 

/* ANOTHER VERSION OF AN http server in NODE
*/
var http = require('http'); 
var fs = require('fs');
var s = http.createServer(
    // res.writeHead(200, {"Content-Type":"text/plain"});
    // res.write("isn't this great your flight lands at 8 \nMy flight leaves at 9\n"); 
    // setTimeout(function(){
    //     res.end('my game just rewinds\n'); 
    //     }, 2000);  
    //res.end('my game just rewinds\n');
); 



s.on('request', function(req, res){
 res.writeHead(200, {"Content-Type":"text/plain"});
    res.write("isn't this great your flight lands at 8 \nMy flight leaves at 9\n"); 
     //req.pipe(res); //THE setTimeout BELOW DOESN'T RUN with req.pipe(res), it includes a res.end() apparently. 
     //uncomment req.pipe(res) and in terminal use curl -d 'whatevs' http://localhost:8000 to get 'whatevs' back in terminal
    var file = fs.createReadStream('README.md'); 
    var newFile = fs.createWriteStream('writtenFiles/newReadMe.md');   
    var fileBytes = req.headers['content-length']; 
    var uploadedBytes = 0; 
    req.on('readable', function(){
      var chunk = null; 
      while(null !== (chunk = req.read())){
        uploadedBytes += chunk.length; 
        var progress = (uploadedBytes / fileBytes) * 100; 
        res.write('progress: ' + parseFloat(progress).toFixed(2) + '%\n'); 
      }
    }); 
    req.pipe(newFile, { end: false }); //using req.pipe(*to a text file*) does not kill process the way req.pipe(res) does.  Process continues with req piped to txt file
    // req.on('end', function(){
    //   res.end('file uploaded!'); 
    // }); 
    setTimeout(function(){
        res.end('you got the whole file, homey!\n'); 
        }, 1500);  
}); 



// http.createServer(function(req, res){
//   res.writeHead(200, {"Content-Type":'text/plain'}); 
//   req.pipe(res); 
// }).listen(8080, function(){
//   console.log('looks who\'s on 8080'); 
// }); 
  

//Below is less efficient form of above, which uses req.pipe(res); 
// s.on('request', function(req, res){
//   res.writeHead(200, {'Content-Type': 'text/plain'}); 
//   req.on('readable', function(){
//     var chunk = null; 
//     while (null !== (chunk = req.read())){
//       console.log(chunk.toString()); 
//       res.write(chunk);  
//     }
//   }); 
//   req.on('end', function(){
//     res.end(); 
//   }); 
// }); 


var port = 8000; 
s.listen(port, function(){
  console.log('you are listening on port', port); 
}); 


