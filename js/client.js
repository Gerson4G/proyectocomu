var conectar_tcp = false;
var ip = require('ip');
var PORT = 5555;
var HOST = '';
net = require('net');
os = require ('os');
var myip = ip.address;
var hostname = os.hostname();
var puertoServer;
var ipServer;

//console.log(ip.address());

function iniciar() {

var dgram = require("dgram");
var message = hostname.toString();

clientUDP = dgram.createSocket("udp4");
clientUDP.on('err',function(err){
    console.log("Error -------- UDP");
    console.log(err);
    clientUDP.close();
})
clientUDP.on('message', (msg, rinfo) => {

if(conectar_tcp){
  puertoServer=rinfo.port;
  ipServer=rinfo.address;
  console.log("PUERTO TCP "+msg);
  clientUDP.close();
  TCP(rinfo.address,parseInt(msg));
}
else{
console.log("llego por UDP.......");
console.log(rinfo.address+" "+rinfo.port);

  clientUDP.send(message, 0, message.length, rinfo.port , rinfo.address, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
    conectar_tcp=true;
  });

}
});
clientUDP.bind(PORT);

}

function TCP(ip_tcp,port_tcp){
    fecha=new Date();
    clientTCP = net.connect({port:port_tcp, host:ip_tcp}, () => {
    console.log('connected to server TCP!');
    });
    clientTCP.on('data', (data) => {
    console.log("llego por TCP...");
    });
    clientTCP.on('error', (err) => {
      console.log(err);
        console.log("El Servidor se Desconecto");
        //location.href='index.html';
    });
}

function desconectar() {
  clientTCP.write("Cerrar");
    console.log('Mensaje para cerrar');
  clientTCP.destroy();
}
