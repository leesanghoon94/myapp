const net = require("net");

const client = net.createConnection({ port: 3001, host: "127.0.0.1" }, () => {
  console.log("서버에 연결됨");
  client.write("안녕 서버");
});

client.on("data", (data) => {
  console.log("서버로부터 데이터:", data.toString());
  client.end();
});

client.on("end", () => {
  console.log("서버와의 연결 종료");
});

client.on("error", (err) => {
  console.error("오류 발생:", err);
});

// net.connect({
//   onread: {
//     buffer: Buffer.alloc(4), // 4��이트 버���를 생성합니다.
//     callback: (nread, buf) => {
//       console.log(`Received ${nread} bytes: ${buf.toString()}`);
//     },
//   },
// });
