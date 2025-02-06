## **프로젝트 설명**

이 프로젝트는 RabbitMQ와 Node.js(Express)를 활용해 간단한 주문 관리 시스템을 구현한 예제입니다.  
비동기 메시지 큐를 통해 주문 데이터를 처리하고, 파일 기반 데이터베이스를 사용해 데이터를 저장 및 조회합니다.

- 비동기 처리를 활용한 효율적인 아키텍처 구현
- RabbitMQ를 이용한 메시지 큐 처리
- 프론트엔드와 백엔드 간 데이터 연동
---

### **주요 구성 요소**
1. **Order Page (주문 페이지)**
    - 사용자가 주문을 제출합니다.
    - 주문 데이터는 RabbitMQ Queue에 메시지로 전송됩니다.

2. **Express 서버**
    - RabbitMQ에서 메시지를 소비(consume)합니다.
    - 소비된 주문 데이터를 처리하여 `database.json` 파일에 저장합니다.

3. **Database (File-based JSON)**
    - 주문 데이터가 저장되는 파일입니다.
    - `fs.writeFile`을 사용해 데이터를 추가하고, `fs.readFile`을 이용해 데이터를 읽습니다.

4. **Order Detail Page (주문 상세 페이지)**
    - 저장된 주문 데이터를 읽어와 브라우저에서 HTML로 표시합니다.

---


### **프로세스 흐름**
1. 사용자가 주문 페이지에서 주문 데이터를 제출합니다.
2. 주문 데이터가 RabbitMQ Queue에 메시지로 전송됩니다.
3. Express 서버가 Queue 메시지를 소비하고 데이터베이스(`database.json`)에 저장합니다.
4. 주문 상세 페이지에서 `database.json` 파일을 읽어와 주문 내역을 사용자에게 표시합니다.

---

### **아키텍처 다이어그램**

```plaintext
+----------------+          +------------------+          +-------------------+
|   Order Page   |  ----->  | RabbitMQ Queue   |  ----->  | Express Server    |
| (HTML + JS)    |          | (Message Queue)  |          | (Consumer)        |
+----------------+          +------------------+          +-------------------+
                                                                  |
                                                                  |
                                                     +-----------------------+
                                                     | File-based Database   |
                                                     | (database.json)       |
                                                     +-----------------------+
                                                                  |
                                                                  |
                                                     +-----------------------+
                                                     | Order Detail Page     |
                                                     | (HTML + JS)           |
                                                     +-----------------------+
```


[프로젝트 폴더 바로가기](express)

### 사용법
```zsh
cd express
node app.js
```