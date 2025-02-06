# 개요
* semaphore docker compose

# 실행 방법

```sh
docker-compose up -d
✔ Container semaphroe-mysql-1      Started
✔ Container ansible-node1          Started
✔ Container ansible-node0          Started
✔ Container semaphroe-semaphore-1  Started
```

# 웹 대시보드 접속
* localhost:3000 으로 접속
  * id: admin
  * password: changeme

# 삭제 방법

```sh
docker-compose down
```

# 참고자료
* https://docs.semui.co/administration-guide/
* https://github.com/ansible-semaphore/semaphore/discussions/847
