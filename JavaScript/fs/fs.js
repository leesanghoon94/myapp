const fs = require("fs");

// 파일 열기 (비동기 방식)
fs.open("./sex", "r+", (err, fd) => {
  if (err) {
    console.error("파일 열기 오류:", err);
    return;
  }

  // 버퍼 생성
  const buffer = Buffer.alloc(2048);

  // 파일 읽기
  fs.read(fd, buffer, 0, 2048, null, (err, bytesRead, buffer) => {
    if (err) {
      console.error("파일 읽기 오류:", err);
      fs.close(fd, () => {});
      return;
    }

    console.log("파일에서 읽은 데이터:", buffer.toString("utf8", 0, bytesRead));

    // 파일 쓰기
    fs.write(fd, "some sex data ", 0, "utf8", (err, written, string) => {
      if (err) {
        console.error("파일 쓰기 오류:", err);
        fs.close(fd, () => {});
        return;
      }

      console.log("파일에 쓴 데이터:", string);

      // 파일 닫기
      fs.close(fd, (err) => {
        if (err) {
          console.error("파일 닫기 오류:", err);
          return;
        }
        console.log("파일 닫기 완료");
      });
    });
  });
});
