var conectar_tcp = false;
var ip = require('ip');
var PORT = 5555;
var HOST = '';
net = require('net');
//console.log(ip.address());

function iniciar() {

var dgram = require("dgram");
var message = "Mi ip es: "+ip.address;

clientUDP = dgram.createSocket("udp4");
clientUDP.on('err',function(err){
    console.log("Error -------- UDP");
    console.log(err);
    clientUDP.close();
})
clientUDP.on('message', (msg, rinfo) => {

if(conectar_tcp){
  clientUDP.close();
  TCP(rinfo.address,9999);
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
    clientTCP = net.connect({port:port_tcp, host:ip_tcp}, () => {
    console.log('connected to server TCP!');
    //clientTCP.write(JSON.stringify(json));
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
