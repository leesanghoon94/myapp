const net = require("net");
const path = "/tmp/unix_socket";

const client = net.createConnection(path, () => {
  console.log("connected to server");

  process.stdin.on("data", (data) => {
    client.write(data.toString().trim());
  });
});

client.on("data", (data) => {
  console.log("Received:", data.toString());
});

client.on("end", () => {
  console.log("Disconnected from server.");
});

client.on("error", (err) => {
  console.error("client error:", err);
});
