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
var s = http.createServer(function(req, res){
    res.writeHead(200, {"Content-Type":"text/plain"});
    res.write("isn't this great your flight lands at 8 \nMy flight leaves at 9\n"); 
    setTimeout(function(){
        res.end('my game just rewinds\n'); 
        }, 2000);  
})

s.listen(8000); 





// var connect = require('connect'); 
// var http = require('http'); 

// var app = connect(); 

// function profile(req, res){
//     console.log('user reqd profile'); 
// }

// function forum(req, res){
//     console.log('user reqd forum'); 
// }

// app.use('/profile', profile); 
// app.use('/forum', forum); 

// http.createServer(app).listen(3005);
// console.log('connect server up');  
