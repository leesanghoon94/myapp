`ECONNREFUSED` 오류는 클라이언트가 서버에 연결하려고 시도했으나, 해당 포트에서 서버가 수신 대기 상태가 아니기 때문에 발생합니다. 즉, 클라이언트가 연결을 시도한 서버 포트(여기서는 8080)가 열려 있지 않거나 서버가 해당 포트에서 실행되고 있지 않음을 의미합니다.

이 문제를 해결하기 위해서는 다음 사항들을 확인해볼 수 있습니다:

1. **서버가 실행 중인지 확인**:

   - 서버가 정상적으로 실행 중인지 확인합니다. `net.js` 코드에서 서버를 제대로 시작했는지, 서버가 오류 없이 실행되고 있는지 확인합니다.

2. **포트 확인**:

   - 클라이언트와 서버가 동일한 포트에서 통신하려고 시도하고 있는지 확인합니다.

3. **서버 코드 확인**:

   - 서버가 제대로 설정되었는지, 클라이언트의 연결을 수락할 준비가 되어 있는지 확인합니다.

4. **방화벽 설정**:

   - 로컬 방화벽 설정이 서버의 포트를 차단하고 있는지 확인합니다.

5. **다른 프로세스가 포트를 사용하고 있는지 확인**:
   - 다른 프로세스가 해당 포트를 사용하고 있는지 확인합니다.

다음은 Node.js에서 `net` 모듈을 사용하여 간단한 서버와 클라이언트를 설정하는 예제입니다:

### 서버 (`server.js`)

```javascript
const net = require("net");

const server = net.createServer((socket) => {
  console.log("클라이언트 연결됨");

  socket.on("data", (data) => {
    console.log("클라이언트로부터 데이터:", data.toString());
  });

  socket.on("end", () => {
    console.log("클라이언트 연결 종료");
  });

  socket.write("서버에서 클라이언트로 메시지 전송");
});

server.on("error", (err) => {
  console.error("서버 오류:", err);
});

server.listen(8080, () => {
  console.log("서버가 8080 포트에서 대기 중");
});
```

### 클라이언트 (`client.js`)

```javascript
const net = require("net");

const client = net.createConnection({ port: 8080, host: "127.0.0.1" }, () => {
  console.log("서버에 연결됨");
  client.write("클라이언트에서 서버로 메시지 전송");
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
```

위의 코드를 실행하기 전에 먼저 서버를 실행(`node server.js`)한 후 클라이언트를 실행(`node client.js`)해야 합니다. 이 순서가 맞지 않으면 클라이언트가 서버에 연결할 수 없기 때문에 `ECONNREFUSED` 오류가 발생합니다.
