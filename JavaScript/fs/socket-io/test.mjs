import { createServer } from "node:http";
import { readFile } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = createServer((req, res) => {
  readFile(join(__dirname, "index.html"), (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

const io = new Server(server);

io.on("connection", (socket) => {
  io.emit("message", `${socket.id} 님이 연결되었습니다.`);
});

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    io.emit("message", `${socket.id}: ${msg}`);
  });
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    socket.broadcast.emit("message", `${socket.id} 님의 연결이 끊어졌습니다.`);
  });
});

server.listen(3000, () => {
  console.log("http://localhost:3000 에서 서버 구동 중...");
});
