## mysql

### amazon linux 2 에서 mysql 설치하기

```console
yum install https://dev.mysql.com/get/mysql80-community-release-el7-10.noarch.rpm
amazon-linux-extras install epel -y
yum -y install mysql-community-server
grep 'temporary password' /var/log/mysqld.log
mysql_secure_installation -p
```

---

### 사용법

````console
create database article;
use article;

```CREATE TABLE articles (
_id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(64),
body VARCHAR(64),
updatetime TIMESTAMP
);

INSERT INTO articles (title, body, updatetime) VALUES
('제목1', '내용1', CURRENT_TIMESTAMP),
('제목2', '내용2', CURRENT_TIMESTAMP),
('제목3', '내용3', CURRENT_TIMESTAMP);

alter table articles change column id \_id int;

show variables like 'validate_password%';
set global validate_password.policy=low;

세션에서 character set 설정 방법
현재 MySQL 프롬프트에서 세션 character set을 설정하려면 다음 명령어를 사용합니다:

SET NAMES utf8mb4;
한글 인코딩 문제 해결 할 수 있다.
````

#### 패스워드 설정

여기서 validate_password_length는 최소한의 패스워드 길이를 설정하고, validate_password_policy는 패스워드 정책을 설정합니다. validate_password_policy의 값은 다음과 같습니다:

0: 패스워드 정책 비활성화  
1: LOW  
2: MEDIUM  
3: STRONG

#### 유저 설정

create user  
create user 'root'@'%' identified by '12345678';
DROP USER 'root'@'localhost';

grant all privileges on _._ to '<계정명>'@'%';

flush privileges; // 즉시 적용하기

ansible inventory key.pem chown -R jenkins:jenkins ./1ansible

---

### mysql 라이브러리 사용법

`mysql2` 라이브러리를 사용해서 'db'객체를 정의하고 쿼리할수있다.

```js
const mysql = require("mysql2/promise");

const db = {
  host: "localhost",
  user: "admin",
  port: "3306",
  password: "12345678",
  database: "article",
};

let connection;

async function handleDisconnect() {
  try {
    connection = await mysql.createConnection(db);
    console.log("Connected to MySQL database");

    connection.on("error", async (err) => {
      console.error("Database error", err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("Attempting to reconnect...");
        await handleDisconnect(); // 연결이 끊어지면 재시도
      } else {
        throw err;
      }
    });
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
    setTimeout(handleDisconnect, 5000); // 5초 후에 다시 연결 시도
  }
}

async function task() {
  await handleDisconnect();

  try {
    await connection.query("DROP DATABASE IF EXISTS article1");
    await connection.query("CREATE DATABASE article1");
    await connection.query("USE article1");

    await connection.query(`
      CREATE TABLE articles (
        _id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(64),
        body VARCHAR(64),
        updatetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      INSERT INTO articles (title, body, updatetime) VALUES
      ('제목1', '내용1', CURRENT_TIMESTAMP),
      ('제목2', '내용2', CURRENT_TIMESTAMP),
      ('제목3', '내용3', CURRENT_TIMESTAMP)
    `);

    console.log("완료");
  } catch (err) {
    console.error("Error during task execution:", err);
  } finally {
    if (connection) {
      await connection.end(); // 작업 후 연결 종료
    }
  }
}

task();

module.exports = db;
```
