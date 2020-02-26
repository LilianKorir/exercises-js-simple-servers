let net = require('net');
let fs = require('fs');

let serverLog = require('./lib/serverLog');
let input = fs.readFileSync('files/hi.txt');
let SERVER_PORT = 2003;

let server = net.createServer(function (connection) {
  let clientAddress = connection.remoteAddress;
  let expectedInput = 'files/hi.txt';
  serverLog('CONNECT', `Client at ${clientAddress} connected`);
  serverLog('INIT', `expexted input: ${expectedInput}`);
  connection.write('which file do you want to access?');
  // give the name of the file...then it access
  connection.on('data', function (clientData) {
    let userinput = clientData;
    serverLog('RECEIVE', `Received data: ${userinput}`);
    if (userinput === expectedInput) {
      connection.write(input);
    }
  });

  connection.on('end', function () {
    serverLog('DISCONNET', `Client ${clientAddress} disconnected`);
  });
});

server.listen(SERVER_PORT, function () {
  serverLog('LISTENING', `document server listening on port ${SERVER_PORT}`);
});
