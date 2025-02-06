```
(node:90970) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use node --trace-warnings ... to show where the warning was created)
/Users/lee/Desktop/fs/socket-io/test.js:1
import { createServer } from "node:http";
^^^^^^

SyntaxError: Cannot use import statement outside a module
    at Object.compileFunction (node:vm:360:18)
    at wrapSafe (node:internal/modules/cjs/loader:1126:15)
    at Module._compile (node:internal/modules/cjs/loader:1162:27)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1252:10)
    at Module.load (node:internal/modules/cjs/loader:1076:32)
    at Function.Module._load (node:internal/modules/cjs/loader:911:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:22:47
```

이 오류는 Node.js에서 ES 모듈(ECMAScript Modules)을 사용할 때 발생하는 문제입니다. Node.js는 기본적으로 CommonJS 모듈 시스템을 사용하지만, ES 모듈을 사용하려면 몇 가지 설정을 추가해야 합니다. 아래에서 이 문제를 해결하는 방법을 설명하겠습니다.

### 문제의 원인

1. **모듈 유형 설정**: Node.js는 ES 모듈을 기본적으로 지원하지 않으며, ES 모듈을 사용하려면 두 가지 방법 중 하나를 선택해야 합니다.

   - `package.json` 파일에서 `"type": "module"`을 설정합니다.
   - 파일 확장자를 `.mjs`로 변경합니다.

2. **`import` 문 사용**: ES 모듈 문법을 사용할 경우, `import` 문을 사용할 수 있지만, 이를 사용하려면 위의 설정 중 하나가 필요합니다.

### 해결 방법

#### 방법 1: `package.json` 파일 수정

`package.json` 파일에 `"type": "module"`을 추가합니다. 예를 들어:

```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "type": "module",
  "main": "test.js"
  // 나머지 설정
}
```

이렇게 하면 모든 `.js` 파일이 ES 모듈로 처리됩니다.

#### 방법 2: 파일 확장자 변경

파일의 확장자를 `.mjs`로 변경합니다. 예를 들어, `test.js`를 `test.mjs`로 변경합니다. 그런 다음, 파일을 실행할 때도 확장자를 포함해야 합니다.

```bash
node test.mjs
```

### 예시

만약 `test.js` 파일이 아래와 같은 내용을 포함하고 있다면:

```javascript
import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World\n");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
```

이 코드를 `package.json`에 `"type": "module"`을 추가하거나, 파일 확장자를 `.mjs`로 변경한 후 실행하면 문제가 해결됩니다.

### 결론

위의 방법 중 하나를 선택하여 ES 모듈을 사용할 수 있도록 설정한 후, 코드를 다시 실행하면 더 이상 `SyntaxError`가 발생하지 않을 것입니다.
