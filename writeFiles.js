
//Javascript is for the browser
//Node is for the server
//Server responsible for looking at the request made by the client and returning the right file
var fs = require('fs'); 
var path = require('path'); 

fs.writeFileSync('writtenFiles/writeThis2.txt', 'wrote file with the ol fs');  
console.log(fs.readFileSync('writtenFiles/writeThis2.txt').toString()); 

var web = "Desktop/Node_Work//newFile.html"; 
console.log(path.normalize(web)); 
console.log(path.dirname(web)); 
console.log(path.basename(web)); 
console.log(path.extname(web)); 
