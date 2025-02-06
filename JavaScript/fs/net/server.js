// import { createServer, createConnection } from "node:net";

// // TCP 소켓 생성 및 연결
// const client = new net.Socket();

// client.connect(port, host, () => {
//   console.log("서버에 연결되었습니다.");

//   // 서버에 데이터 쓰기
//   client.write("some data");
// });

// // 데이터 수신
// client.on("data", (data) => {
//   console.log("서버로부터 받은 데이터:", data.toString());

//   // 소켓 닫기
//   client.destroy(); // 또는 client.end();
// });

// // 소켓 닫힘
// client.on("close", () => {
//   console.log("연결이 닫혔습니다.");
// });

// // 오류 처리
// client.on("error", (err) => {
//   console.error("오류 발생:", err);
// });
const http = require("http");
const net = require("net");
const fs = require("fs");
const path = require("path");

let server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, "index.html");

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("Internal Server Error");
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(data);
  });
});

server.listen(3000, "127.0.0.1");
console.log("http://127.0.0.1:3000");

let netserver = net.createServer((socket) => {
  socket.write("Hello, client!\r\n");
  socket.on("data", (data) => {
    console.log(data.toString());
  });
});

net.socket.on("message", () => {
  console.log("message");
});

netserver.listen(3001, "127.0.0.1");
