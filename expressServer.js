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





