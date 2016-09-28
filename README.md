# NodeBigDeal
Building Servers/TCP connections for sockets in node, including an inter-terminal chat app.  Fun!

#NOTES:

##WHAT’S NODE? 
1. v8, the javascript engine inside of chrome, is the foundation upon which node is built 
(according to Ryan Dahl, the creator of node, it’s focus is on networking the right way) 
2. Node.js is a runtime environment/toolset, libraries for running JS applications outside the browser - work very well with web sockets, webRTC
3. Node can idle, OS unschedules, schedules back when timeout is done 
1. Node doesn’t need to be forcefully exited, it exits when there’s nothing left to do, but it knows not to exit if you say have a setInterval going 
1. Just type node filename.js when you’re in the folder in terminal to execute the file - sweet!
1. mostly used to run real-time server applications and shines through it’s performance using non-blocking I/O and asynchronous events 
1. Node is single-threaded, so not good for very long-running calculations/operations
1. process is the global object in node, as opposed to window in front-end JS. 
1. Node is great for streaming or event-driven applications like chat applications, game servers, ad servers, streaming servers
1. Node also good for building out an API on the backend, still using JS
used by Microsoft, Yahoo!, LinkedIn, eBay, NYT

##WHY NODE? 
1. NODE HANDLES CONCURRENCY WELL, 'CAUSE IT NEVER WAITS FOR ANYTHING 

- [ ] ex. you send 100 simultaneous requests (say using apache bench in the terminal with ab -n 100 -c 100 http://127.0.0.1:8000 ) and the response contains 2 parts:  ‘hello' in the body as part 1 and ‘world’ is in a setTimeout that comes after 2 seconds (like above).  The exciting thing is that if this weren’t non-blocking, if you used apache bench and sent 100 requests at this server, it would take 200 seconds, because it would wait for each 2 second setTimeout to finish before engaging the next request, but with node it still takes just 2 seconds because it handles all the requests as they come in (in parallel)    


##Headers

- [ ] Node has http library built in which allows for client and server side http

- var http = require(‘http’); 
- http.createServer(function(req, res){

- }).listen(8000)

- or 

- var s = http.createServer(function(req, res){
- res.writeHead(200, {‘Content-Type’: ‘text/plain’});  //<— header(s)
- res.write(‘hello’); //<— write part of the body first; 
- setTimeout(function(){
-    res.end(‘world!\n”); //<— body
-    },2000); 
- })
- s.listen(8000); 

- [ ] headers sent with res.writeHead(200, {‘Content-Type’: ‘text/plain’}): 
res headers 
HTTP/1.1 200 OK
Content-Type: text/html
Date: Tue, 27 Sep 2016 20:19:33 GMT
Connection: keep-alive
Transfer-Encoding: chunked

- [ ] in headers, there’s the key “Connection”, which is auto-set to “keep-alive”, so there is a persistent connection to the server (new to http 1.1), this is valuable because you can now make request after request on the same connection without having to go through the effort of tearing down and building back up a connection.  


Transfer-Encoding: chunked allows the sending of variable-length responses over a persistent connection 

##TO TEST RES IN NODE: 
1. cd into folder, run node server.js (or whatever your file is called), once server is up and running
1. Open new terminal window, cd to that folder, then enter into terminal: 

- curl http://localhost:8000 - or whatever port your server is set to listen to and you’ll get the res.write(‘xxx’), res.end(‘xxx’) back in terminal  - or go to url localhost:8000 in chrome of course
- to inspect the headers in your res, simply type curl -i  http://localhost:8000 into the terminal 
Example: 
res headers 
HTTP/1.1 200 OK
Content-Type: text/html
Date: Tue, 27 Sep 2016 20:19:33 GMT
Connection: keep-alive
Transfer-Encoding: chunked

In headers, there’s the key “Connection”, which is auto-set to “keep-alive”, so there is a persistent connection to the server (new to http 1.1), this is valuable because you can now make request after request on the same connection without having to go through the effort of tearing down and building back up a connection.  

Transfer-Encoding: chunked allows the sending of variable-length responses over a persistent connection - we don’t want to buffer it, we want to proxy it.  Instead of using up server memory with like 50,000 lines of code from a SQL database, we send it along to the client

before HTTP 1.1, the connection was just cut at the end of each message, now with transfer-encoding: chucked and HTTP 1.1, connection can persist and variable-length res can be sent, including part 1 of body in res.write(‘hello\n’) and part 2 in res.end(‘world\n’);  HTTP determines that the individual message is closed.  


##TO LOAD TEST IN NODE USING APACHE BENCH (BUILT-IN):

- [ ] cd into proper dir and use: 
- [ ] ab -n 100 -c 100 http://192.168.9.9:8000/ - or whatever your computer's hostname is, and the port your server is listening on in the terminal.  Here’s the breakdown of what that means: 

- ab —  apache bench
- -n 100 — -n is number of requests to perform, so here we’re saying perform 100 requests
- -c 100 — -c is concurrency, how many requests to make at one time, here we’re saying make all 100 requests simultaneously
- http://192.168.9.9:8000/ — important - you must use the hostname, if my computer’s hostname is 192.169.9.9 (find in system preferences/sharing/remote login), and we’re on port 8000 so http://192.168.9.9:8000/  and you must put the / at the very end!


##NODE INTER-TERMINAL WINDOW CHAT APP

- [] FOR A LIL' INTER-TERMINAL WINDOW CHAT APP, simply navigate to the folder containing this file in terminal, TYPE node chatAppNode.js (or whatever you renamed this file), then open another terminal window (or 2 to see this thing work)
- [] cd into the right folder and type telnet localhost 3003 (or whatever the server is listening to, listed below on line 38) and type away in either of those other terminals for chat app magic; 

##MISC. 
1. Just typing node w/o an argument (file to run) brings up a fun REPL (read evaluate print loop) you can write functions in, etc. 


