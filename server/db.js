const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "terraform-20240311194459579200000006.cx0ao0u6e4ia.ap-northeast-2.rds.amazonaws.com",
  user: "root",
  port: "3306",
  database: "article",
  password: "12345678",
});

db.query("drop database if exists article");
db.query(`create database article`);
db.query(`use article`);
db.query(`CREATE TABLE articles (
_id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(64),
body VARCHAR(64),
updatetime TIMESTAMP
)`);
db.query(`INSERT INTO articles (title, body, updatetime) VALUES
('제목1', '내용1', CURRENT_TIMESTAMP),
('제목2', '내용2', CURRENT_TIMESTAMP),
('제목3', '내용3', CURRENT_TIMESTAMP);
`);

module.exports = db;
