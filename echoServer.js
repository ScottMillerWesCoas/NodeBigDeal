var net = require('net'); 

/* FOR A LIL' INTER-TERMINAL WINDOW CHAT APP, simply navigate to the folder containing this file in terminal, 
TYPE node chatAppNode.js (or whatever you renamed this file), then open another terminal window (or 2 to see this thing work)
and type telnet localhost 3003 (or whatever the server is listening to, listed below on line 38) and type away in either of those
other terminals for chat app magic; 
*/

var sockets = [];  

var s = net.Server(function(socket){
    sockets.push(socket); 

    socket.on('data', function(d){
        sockets.forEach(function(el){
            if (el !== socket) el.write(d); 
        }); 
    });

    socket.on('end', function(d){
        var remove = sockets.indexOf(socket); 
        sockets.splice(remove, 1); 
    });   

}); 

s.listen(3020);
console.log('listening on 3020'); 