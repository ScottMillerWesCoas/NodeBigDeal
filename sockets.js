var express = require('express'); 
var app = express(); 
var server = require('http').createServer(app); 
var io = require('socket.io')(server); 
// var redis = require('redis'); 
// var redisClient = redis.createClient(); 
  var twit = require('twitter'), 
    twitter = new twit({
    consumer_key: 'NzGQb6pdpcXCeZwbQISjC1Cgo',
    consumer_secret: 'ZQX8VVyUyj3Z5HYJ3jb6euGXLCGkniy5LsylYgsGEiCery2xUR',
    access_token_key: '62640643-VJ8z9PUo7B8FPWMnMS8hQllTuq8xO4tnzPwD96iM7',
    access_token_secret: '8yqP03C9iDqq1KVOwtzgww0Ltfapl5DM88s8t4RR86CuS'
  }); 

var messages = []; 
var tweets = []; 
var jtweets = []; 
var storeMessages = function(data){
  messages.push(data); 
 //var message = JSON.stringify(data); 
 //STRINGIFY TO EASILY SEND TO REDIS, THEN lpush to push to redis list, ltrim to cut the list to the first 20 items in it
 // redisClient.lpush("messages", message, function(err, response){
 //  redisClient.ltrim("messages", 0, 19); 
 // }); 
}; 

io.on('connection', function(client){

  console.log('client connected...'); 
  client.on('messages', function(query){
  tweets = []; 

  twitter.stream('statuses/filter', {track: query}, function(stream){
    
    stream.on('data', function(data){
      var name, tweet; 
      for (var x in data){
        if (x === 'user'){
          for (var y in data[x]){
            if (y === 'screen_name') {
              //console.log('\n' + data[x][y] + ':');
              name = data[x][y];  
          }
        }
      }
    }
      for (var z in data){
        if (z === 'text') {
          //console.log(data[z]);
          tweet = data[z]; 
        tweets.push({name: name, tweet: tweet}); 
      }
    } 
      setTimeout(function(){
        stream.destroy(); 
        //console.log(tweets); 
        tweets.forEach(function(el){
        // client.emit("messages", el.data);
          // console.log(el); 
          // console.log(typeof el);  
          client.broadcast.emit('messages', el.name, el.tweet); 
          client.emit("messages", el.name, el.tweet); 
          storeMessages(tweets);  
      // process.exit(0); 
      }); 
    }, 3000); 
}); 

    });
    
     
  }); 

  client.on('join', function(name){
    // redisClient.lrange('messages',0, -1, function(err, messages){
    //   messages = messages.reverse(); 
    // }); 
    //client.nickname = name; 
    tweets.forEach(function(el){
      // client.emit("messages", el.data);
      client.emit("messages", el.tweet);  
    }); 
  }); 
}); 

// io.sockets.on('connection', function(client){
//   client.on('join', function(name){
//     client.set('nickname', name); 
//     client.broadcast.emit("chat", name + " joined the chat"); 
//   }); 
//   client.on("messages", function(message){
//     client.get('nickname', function(error, name){
//       client.broadcast.emit("messages", name + ": " + message); 
//       client.emit("messages", name + ": " + message); 
//     }); 
//   }); 
// }); 

app.get('/', function(req, res){
  res.sendFile(__dirname + '/sockets.html'); 
}); 

server.listen(8080, function(){
  console.log('up on 8080'); 
}); 




