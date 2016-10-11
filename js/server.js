function iniciar() {

  var dgram = require('dgram');
  var socket = dgram.createSocket('udp4');

  var testMessage = "[hello world] pid: " + process.pid;
  var broadcastAddress = '255.255.255.255';
  var broadcastPort = 5555;


  socket.bind(function(){
      socket.setBroadcast(true);
  });

  socket.on("message", function ( data, rinfo ) {
  	console.log("Message received from ", rinfo.address, " : ", data.toString());
  });

  setInterval(function () {
  	socket.send(new Buffer(testMessage),
  			0,
  			testMessage.length,
  			broadcastPort,
  			broadcastAddress,
  			function (err) {
  				if (err) console.log(err);

  				console.log("Message sent");
  			}
  	);
  }, 1000);
}
