
var listaM = [];
net = require('net');
var ip = require('ip');
var enviarPuerto = false;
var cerrado= false;
var puertoTCP=7777;
var tiempoEnvio=1000;
var nombre;

function Maquina(tiempo,puerto,nombre,ip) {
  this.tiempo=tiempo;
  this.puerto=puerto;
  this.hostname=nombre;
  this.ip=ip;
  this.cerrado=false;
}

function iniciar() {

TCP(ip.address,puertoTCP)

  var dgram = require('dgram');
  var socket = dgram.createSocket('udp4');

  var testMessage = "";
  var broadcastAddress = '255.255.255.255';
  var broadcastPort = 5555;


  socket.bind(function(){
      socket.setBroadcast(true);
  });
  socket.on('message', (msg, rinfo) => {
    console.log("Message received from " + rinfo.address);
    nombre=msg.toString();
  //  listaM.push(new Maquina(0,rinfo.port,msg.toString(),rinfo.address));
    //listaM.push(new Maquina(0,puertoTCP,msg.toString(),rinfo.address));

/* SI LO QUIERO EN DIFERENTES PUERTOS EL TCP*/
    //TCP(ip.address,listaM[listaM.length-1].puerto);
    //TCP(ip.address,puertoTCP)
    enviarPuerto = true;

    if(enviarPuerto){
      //console.log('ENVIANDO PUERTO '+listaM[listaM.length-1].puerto);
      //var mensaje = listaM[listaM.length-1].puerto.toString();
      var mensaje = puertoTCP.toString();
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
  }, tiempoEnvio);
}

function TCP(ip,port_tcp){


    serverTCP = net.createServer(function(socket) {
    var pos=listaM.length-1;
    console.log('client connected');
    listaM.push(new Maquina(0,socket.remotePort,nombre,socket.remoteAddress));
    listaM[listaM.length-1].tiempo=new Date().getTime();

    socket.on('error', (e) => {
        console.log(e);
            console.log(socket.name);
     });
    socket.on('end', () => {

        registroTiempo(socket,pos);
        console.log('client disconnected');
    });

    socket.on('data', (data) => {
        //console.log("llego por TCP.......");
        if(data.toString()=="Cerrar"){
              cerrado=true;
            }
    });

    });
    serverTCP.listen(port_tcp,ip, () => {
    console.log('server escuchando');
    });
}

function abrirPuerto() {
  return Math.floor((Math.random() * 9999) + 2500);
}

function registroTiempo(socket, pos){

  var aux=new Date();
  try {
    listaM[pos].cerrado=true;
    listaM[pos].tiempo=(aux.getTime()-listaM[pos].tiempo)/1000;
  }
    catch(err) {
        console.log();
  }

  cerrado=false;
}
