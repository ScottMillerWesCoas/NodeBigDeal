var express = require('express'); 
var fs = require('fs'); 
var app = express(); 
var request = require('request');
var url = require('url');



app.get('/express', function(req, res){
  res.sendFile(__dirname + '/index.html'); 
});

app.get('/express/:item', function(req, res){
  var item = req.params.item; 
  fs.readFile('resume.txt', function(err, data){
    if (err) throw err; 
    var parsed = JSON.parse(data.toString()); 
    parsed.forEach(function(el){
      if (el.key.toString() === item){ 
          var str = JSON.stringify(el, null, 2); 
          res.end(str + '\n');  
        } 
      });
    }); 
  }); 

app.listen(5000, function(){
  console.log('listenin on 5000'); 
}); 

//Webscraper functionality 
app.get('/express/ws/:website', function(req, res){
  var ws = req.params.website; 
  //var ws = website.slice(0, website.length-4); FOR ENTERING .com at end of URL
  var goGet = 'http://www.' + ws + '.com'; 
  console.log('GETTING ' + goGet); 
  request(goGet, function (error, response, body) {
  if (!error && response.statusCode == 200) {
     fs.writeFile('websites/' + ws + '.html', body, function(err){
    if (err) return console.log(err);
   }); 
  }
  
}); 
  setTimeout(function(){
  res.sendFile(__dirname + '/websites/' + ws + '.html'); 
  }, 1500); 
}); 



app.get('/express/twitter/:user', function(req, res){
  var user = req.params.user; 
  var options = {
    protocol: "https:",
    host: "api.twitter.com/1.1",
    pathname: '/search/tweets.json',
    query: {
      q: '?q=' + user + '&src=typd'
    }
  };
  console.log('searching twitter for ' + user + ' mentions'); 
  var searchURL = url.format(options);
  request(searchURL).pipe(res); 
}); 



//  https://twitter.com/search?q=%40twitterapi
// Replace “https://twitter.com/search” with “https://api.twitter.com/1.1/search/tweets.json” 
// and you will get: https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi




// https://twitter.com/search?q=wentz&src=typd
// https://api.twitter.com/1.1/search/tweets.json?q=wentz&src=typd


/*
FROM EXAMPLE: 
var url = require('url');

options = {
  // add URL options here
  protocol: 'http',
  host:'search.twitter.com',
  pathname: 'http://search.twitter.com/search.json?q=codeschool',
  query: {q: 'codeschool'}
  
};

var searchURL = url.format(options);
console.log(searchURL);




var url = require('url');

var options = {
  protocol: "http:",
  host: "search.twitter.com",
  pathname: '/search.json',
  query: { q: "codeschool"}
};

var searchURL = url.format(options);

var request = require('request');
request(searchURL, function(req, res, body){
  console.log(body); 
}); 





*/