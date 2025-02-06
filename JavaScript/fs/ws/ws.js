const WebSocket = require("ws");

let socket = new WebSocket("ws://localhost:8081");

socket.onopen = function () {
  console.log("[open] Connection established");
  socket.send("Hello Server");
  setTimeout(() => {
    socket.close();
  }, 5000);
};

socket.onmessage = function (event) {
  console.log(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(
      `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
    );
  } else {
    console.log("[close] Connection died");
  }
};

socket.onerror = function (error) {
  console.log(`[error] ${error.message}`);
};
