var http = require('http'); 
var fs = require('fs'); 

// PURE NODE RESPONSE WHERE SERVER RETURNS DATA SENT BY CLIENT 
// USE curl -d 'whatever in here' http://localhost:3000 in terminal to test
// http.createServer(function(req, res){
//   res.writeHead(200); 
//   req.on('readable', function(){
//     var chunk = null;
//     while(null !== (chunk = req.read())){
//       console.log(chunk.toString());
//       res.write(chunk);  
//     }
//   }); 
//   req.on('end', function(){
//     res.end(); 
//   }); 
// }).listen(3000, function(){
//   console.log('up on ol\' 3000...');
// }); 


// LINE 9 to LINE 18 ABOVE can all be replace with req.pipe(res), as below
// use curl -d 'whatever in here' http://localhost:3000 in terminal to test
// http.createServer(function(req, res){
//   res.writeHead(200); 
//   req.pipe(res); 
// }).listen(3000, function(){
//   console.log('up on ol\' 3000...');
// }); 


//INITIAL PIPING ONE FILE TO ANOTHER, SIMPLY RUN SERVER (node stream.js in term to test)
// var file = fs.createReadStream('writtenFiles/bigFileUpload.md'); 
// var newFile = fs.createWriteStream('writtenFiles/bigFileUpload_copy.md');
// file.pipe(newFile);  



//PIPING CLIENT REQ DATA TO NEW FILE
//USE curl -d 'whatever in here' http://localhost:3000 in terminal to test
//PIPING CLIENT REQ FILE TO NEW FILE
//USE curl --upload-file resume.txt http://localhost:3000 in terminal to test - USE FILE IN MAIN FOLDER
// var counter = 1; 
// http.createServer(function(req, res){
// console.log(req); 
//   var newFile = fs.createWriteStream('writtenFiles/newFile' + counter + '.html');
//   req.pipe(newFile); 
//   req.on('end', function(){
//     counter++; 
//     res.end('uploaded info!\n'); 
//   }); 
// }).listen(3000, function(){
//    console.log('up on ol\' 3000...');
//  }); 


//SWEET UPLOAD PERCENTAGE 
//USE curl --upload-file resume.txt http://localhost:3000 in terminal to test - USE FILE IN MAIN FOLDER
//USE curl --upload-file /Usr/Desktop/WHATEVERFILE.EXT http://localhost:3000 - absolute path to copy ANY FILE on your computer!
var counter = 0; 
http.createServer(function(req, res){
 res.writeHead(200, {"Content-Type":"text/plain"});
    var newFile = fs.createWriteStream('writtenFiles/clientFile' + counter + '.md');   
    var fileBytes = req.headers['content-length']; 
    var uploadedBytes = 0; 
    req.on('readable', function(){
      var chunk = null; 
      while(null !== (chunk = req.read())){
        uploadedBytes += chunk.length; 
        var progress = (uploadedBytes / fileBytes) * 100; 
        //res.write('progress: ' + parseFloat(progress).toFixed(2) + '%\n'); 
        console.log(chunk.toString()); 
      }
    }); 
    req.pipe(newFile); 
    //CAN USE req.pipe(newFile, { end: false }); TO KEEP STREAM OPEN AND NOT CLOSE CONNECTION
    req.on('end', function(){
      counter++; 
      res.end('file uploaded!'); 
    }); 
}).listen(3000, function(){console.log('listening on 3000');}); 