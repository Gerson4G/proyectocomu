function iniciar() {

var dgram = require("dgram");

clientUDP = dgram.createSocket("udp4");
clientUDP.on('err',function(err){
    console.log("Error -------- UDP");
    console.log(err);
    clientUDP.close();
})
clientUDP.on('message', (msg, rinfo) => {
console.log("llego por UDP.......");
console.log(rinfo.address+" "+rinfo.port);

});
clientUDP.bind(5555);

}
