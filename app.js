var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);	

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/ajax1.html');
});
app.get('/app2.css', function(req, res){
  res.sendFile(__dirname + '/file/app2.css');

});

app.get('/socket.io.js', function(req,res){
    res.sendFile(__dirname+'/node_modules/socket.io-client/dist/socket.io.js');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
	socket.on('number',function(n){
		var mas=eratosthenes(n);
		socket.emit('number',mas);
		console.log(mas);
	});
	
});
var eratosthenes = function(n) { 
    // Eratosthenes algorithm to find all primes under n 
    var array = [], upperLimit = Math.sqrt(n), output = []; 

    // Make an array from 2 to (n - 1) 
    for (var i = 0; i < n; i++) { 
     array.push(true); 
    } 

    // Remove multiples of primes starting from 2, 3, 5,... 
    for (var i = 2; i <= upperLimit; i++) { 
     if (array[i]) { 
      for (var j = i * i; j < n; j += i) { 
       array[j] = false; 
      } 
     } 
    } 

    // All array[i] set to true are primes 
    for (var i = 2; i < n; i++) { 
     if(array[i]) { 
      output.push(i); 
     } 
    } 

    return output; 
}; 
