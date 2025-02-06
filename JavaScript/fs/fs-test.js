//commonJS modules ES modules

const fs = require("fs");
// import fs from "fs"; es modules

// 폴더 생성
//async
fs.mkdir("hello", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("hello dir create");
});
//비동기sync
try {
  fs.mkdirSync("hi");
  console.log("hi dir create");
} catch (err) {
  console.log(err);
}

// 디렉토리 삭제
fs.rmdir("hello", (err) => {
  if (err) {
    throw err;
  }
  console.log(" hello dir 삭제");
});

try {
  fs.rmdirSync("hi");
  console.log(" hi dir 삭제");
} catch (err) {
  console.log(err);
}

// 파일에 데이터쓰기
const string = "async hello world";
const string2 = "sync hello world";
const file = "async.dat";
const file2 = "sync.dat";
fs.writeFile(file, string, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("async:", string);
});

try {
  fs.writeFileSync(file2, string2);
  console.log("sync :", string);
} catch (err) {
  console.log(err);
}

//기존에 파일에 있던 데이터 뒤에 새로운 데이터를 추가하고 싶다면 대신에 appendFile() 또는 appendFileSync() 메서드를 사용해야 합니다.
fs.appendFile(file, "sex", (err) => console.log(err));

try {
  fs.appendFileSync(file2, "sex");
} catch (err) {
  console.log(err);
}

//파일로 부터 데이터 읽기
//fs 모듈의 readFile() 메서드를 사용하면 비동기로 파일로 부터 데이터을 읽을 수 있습니다.
//여기서 주의할 점은 반드시 두번째 인자를 "utf8"로 명시하여 인코딩이 되도록 해줘야 한다는 것입니다. 두번째 인자를 생략하면 콜백 함수의 data 인자로 문자열이 아닌 버퍼(buffer)가 넘어오기 때문에 육안으로 인식이 어렵습니다.
fs.readFile(file, "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});

try {
  fs.readFileSync(file2, "utf-8");
} catch (err) {
  console.log(err);
}

//파일/디렉토리 메타 정보 확인하기
//fs 모듈이 제공하는 메서드 중에서 마지막으로 소개해드릴 메서드는 stat() 입니다.
//stat() 함수는 파일이나 디렉토리의 메타 정보를 확인할 때 사용합니다.

fs.stat(file, (err, stats) => {
  if (err) {
    console.log(err);
  }
  console.log(stats);
  console.log({
    size: stats.size, // 파일 ��기
    mode: stats.mode, // 파일 모드
    others: stats.mtime,
    isFile: stats.isFile(), // 파일인지 확인
  });
});

try {
  fs.statSync(file2);
  console.log({
    size: stats.size, // 파일 ��기
    mode: stats.mode, // 파일 모드
    others: stats.mtime,
    isFile: stats.isFile(), // 파일인지 확인
  });
} catch (err) {
  console.log(err);
}
