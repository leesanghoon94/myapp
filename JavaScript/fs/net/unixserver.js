const net = require("net");
const path = "/tmp/unix_socket";

const server = net.createServer((clientSocket) => {
  console.log("Client connected");
  clientSocket.on("data", (data) => {
    console.log("Received:", data.toString());
    clientSocket.write(data);
  });

  clientSocket.on("end", () => {
    console.log("client disconnected.");
  });

  clientSocket.on("error", (err) => {
    console.error("client error:", err);
  });
});

const fs = require("fs");

if (fs.existsSync(path)) {
  fs.unlinkSync(path);
}

// 서버 소켓을 unix 도메인 소켓 파일에 바인딩
server.listen(path, () => {
  console.log(`server listening on ${path}`);
});

server.on("error", (err) => {
  console.error("server error:", err);
});
