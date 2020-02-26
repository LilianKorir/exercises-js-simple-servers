let net = require('net');

// We will be listening on port 2000
let SERVER_PORT = 2000;

// Create a server object. The callback function tells
// the server what to do when a client connects
let server = net.createServer(function(connection) {
  // A client has connected! Get the client's IP address.
  let clientAddress = connection.remoteAddress;

  // The client wont' see this, only someone watching the console
  // running the server will see it.
  console.log(`[CONNECT] Client at ${clientAddress} connected`);

  // Get the current date and time
  let currentTime = new Date();

  // Send some data to the client. We have to include a newline
  // if that's what we want the client to receive.
  connection.write(`Current time: ${currentTime}`);

  // Terminate the client's connection. We might not always want to
  // end the connection immediately after sending the client some data.
  connection.end();
});

// Start the server, listening on port SERVER_PORT
// Once the server has finished starting, we print out
// a message saying as much.
server.listen(SERVER_PORT, function() {
  console.log(`[LISTENING] Time server listening on port ${SERVER_PORT}`);
});
