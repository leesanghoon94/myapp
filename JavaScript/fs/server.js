const WebSocket = require("ws");
//서버를 생성
var http = require("http");

http
  .createServer(function (request, response) {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" }); // 한글화 하려면 charset=utf-8 필수
    response.write("<h1>Hello Node !</h1>"); // 스트림 형식으로 작성
    response.end("<p>hello web server with node.js</p>");
  })
  .listen(8080, function () {
    console.log("Server Running at http://127.0.0.1:8080");
  });

const server = new WebSocket.Server({ port: 8081 });

server.on("connection", (socket, req) => {
  console.log("Client connected");
  console.log("Headers:", req);

  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    socket.send(`Server received: ${message}`);
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });

  socket.on("error", (error) => {
    console.error("WebSocket error observed:", error);
  });
});

console.log("WebSocket server is running on ws://localhost:8081");
