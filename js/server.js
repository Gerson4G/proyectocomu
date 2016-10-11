var fecha = [];
var portTCP = [];
net = require('net');
var ip = require('ip');
var enviarPuerto = false;
var hostnames = [];
var ips = [];
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
    portTCP.push(abrirPuerto());
    hostnames.push(msg.toString());
    ips.push(rinfo.address);
    TCP(ip.address,portTCP[portTCP.length-1]);
    enviarPuerto = true;

    if(enviarPuerto){
      console.log('ENVIANDO PUERTO '+portTCP[portTCP.length-1]);
      var mensaje = portTCP[portTCP.length-1].toString();
      socket.send(new Buffer (mensaje), 0, mensaje.length, rinfo.port , rinfo.address, function(err, bytes) {
        if (err) throw err;
        console.log('Puerto enviado');
      });
      enviarPuerto=false;
    }

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
    fecha.push(new Date().getTime());
    socket.name = socket.remoteAddress;

    socket.on('error', (e) => {

            console.log(socket.name);

     });
    socket.on('end', () => {
        console.log('client disconnected');
        console.log(socket.remoteAddress);
        for(i=0;i<ips.length;i++){
          if(socket.remoteAddress.replace(/^.*:/, '')==ips[i]){ //lo q pasa
                              // es q remoteAddress esta como ipv6 y anexa ::ffff:direccion entonces asi le quito lo de ipv6
            var aux=new Date();
            fecha[i]=(aux.getTime()-fecha[i])/1000;
          }
        }
    });

    socket.on('data', (data) => {
        console.log("llego por TCP.......");
    });

    });
    serverTCP.listen(port_tcp,ip, () => {
    console.log('server escuchando');
    });
}

function abrirPuerto() {
  return Math.floor((Math.random() * 9999) + 2500);
}
