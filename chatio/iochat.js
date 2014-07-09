var express = require('express');

module.exports = function(io){

io.sockets.on('connection', function (socket) {
	    socket.on('setPseudo', function (data) {
	    socket.pseudo=data;
	});
	socket.on('message', function (message) {
			var time=timeStamp();
	    	
	        var data = { 'message' : message, pseudo : socket.pseudo, 'time': time };
	        
	        socket.broadcast.emit('message', data);
	        console.log("user " + socket.pseudo + " send this : " + message);
	    
	});
});
function timeStamp() {
// Create a date object with the current time
  var now = new Date();
 
// Create an array with the current month, day and time
  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
 
// Create an array with the current hour, minute and second
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
 
// Determine AM or PM suffix based on the hour
  var suffix = ( time[0] < 12 ) ? "AM" : "PM";
 
// Convert hour from military time
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
 
// If hour is 0, set it to 12
  time[0] = time[0] || 12;
 
// If seconds and minutes are less than 10, add a zero
  for ( var i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }
 
// Return the formatted string
  return date.join("/") + " " + time.join(":") + "  " + suffix;
}
}