var portTCP = 9999;
net = require('net');
var ip = require('ip');

function iniciar() {

  var dgram = require('dgram');
  var socket = dgram.createSocket('udp4');

  var testMessage = "[hello world] pid: " + process.pid;
  var broadcastAddress = '255.255.255.255';
  var broadcastPort = 5555;


  socket.bind(function(){
      socket.setBroadcast(true);
  });
  socket.on('message', (msg, rinfo) => {
    console.log("Message received from " + rinfo.address);
    TCP(ip.address,portTCP);
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

function TCP(ip,port_tcp){

    serverTCP = net.createServer(function(socket) {
    console.log('client connected');
    socket.name = socket.remoteAddress;

    socket.on('error', (e) => {
            /*Llamar aqui la funcion que quita el cliente de los vectores
                la ip del cliente q se desconecta esta guarda en socket.name
            */
            console.log(socket.name);

     });
    socket.on('end', () => {
        console.log('client disconnected');
    });

    socket.on('data', (data) => {
        console.log("llego por TCP.......");
    });

    });
    serverTCP.listen(port_tcp,ip, () => {
    console.log('server escuchando');
    });
}
