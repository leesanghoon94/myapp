`ENTRYPOINT`, `CMD`, `RUN`은 Dockerfile에서 사용되는 주요 명령어지만, 각각의 목적이 다릅니다.

---

## 🔹 `RUN`: **이미지 빌드 시 실행**
- `RUN` 명령어는 **이미지를 빌드하는 시점**에 실행됩니다.
- 실행 결과는 이미지에 저장되며, 컨테이너 실행 시 다시 실행되지 않습니다.
- 보통 패키지 설치, 설정 파일 복사 등의 작업에 사용됩니다.

### ✅ 예제 (RUN 사용)
```dockerfile
FROM ubuntu:latest
RUN apt update && apt install -y nginx
```
🔹 `RUN` 명령어로 `nginx`를 설치하면, **이미지에 `nginx`가 포함**됨.  
🔹 컨테이너 실행 시 `nginx` 설치 과정이 다시 실행되지 않음.

---

## 🔹 `CMD`: **컨테이너 실행 시 기본 실행 명령**
- `CMD`는 **컨테이너 실행 시 기본적으로 실행할 명령어**를 지정합니다.
- 사용자가 `docker run` 시 별도의 명령을 입력하면 `CMD`는 무시됩니다.
- 한 개의 `CMD`만 설정 가능하며, 여러 개 설정하면 마지막 `CMD`만 적용됩니다.

### ✅ 예제 (CMD 사용)
```dockerfile
FROM ubuntu:latest
CMD ["nginx", "-g", "daemon off;"]
```
🔹 `docker run` 실행 시 기본적으로 `nginx -g "daemon off;"` 명령이 실행됨.  
🔹 그러나 사용자가 `docker run myimage bash`와 같이 실행하면 `CMD`는 무시되고 `bash`가 실행됨.

---

## 🔹 `ENTRYPOINT`: **컨테이너 실행 시 고정적으로 실행**
- `ENTRYPOINT`는 **반드시 실행되어야 하는 명령어**를 지정합니다.
- 사용자가 `docker run` 시 추가 명령을 입력해도 `ENTRYPOINT`는 유지됩니다.
- 보통 컨테이너의 핵심 실행 프로그램을 정의할 때 사용합니다.

### ✅ 예제 (ENTRYPOINT 사용)
```dockerfile
FROM ubuntu:latest
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```
🔹 `docker run` 실행 시 무조건 `nginx -g "daemon off;"` 실행됨.  
🔹 사용자가 `docker run myimage bash`를 실행해도 `nginx`가 먼저 실행되고, 이후 `bash`가 실행됨.

---

## 🔹 `CMD` vs `ENTRYPOINT` 차이점 정리
| 속성        | CMD | ENTRYPOINT |
|------------|--------------------------|--------------------------|
| 기본 동작  | 컨테이너 실행 시 실행할 명령을 제공 | 컨테이너 실행 시 반드시 실행할 명령을 고정 |
| 명령어 재정의 | `docker run` 실행 시 다른 명령을 입력하면 CMD는 무시됨 | `docker run` 실행 시에도 ENTRYPOINT는 유지됨 |
| 유스케이스 | 기본 실행 명령 제공 (`nginx`, `bash` 등) | 특정 프로그램 강제 실행 (예: `python app.py`) |

### ✅ `CMD` vs `ENTRYPOINT` 비교 예제
#### CMD 사용:
```dockerfile
FROM ubuntu:latest
CMD ["echo", "Hello, World!"]
```
```bash
$ docker run myimage
Hello, World!

$ docker run myimage ls
bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```
🔹 `ls` 명령을 추가하면 `CMD`는 무시됨.

---

#### ENTRYPOINT 사용:
```dockerfile
FROM ubuntu:latest
ENTRYPOINT ["echo", "Hello, World!"]
```
```bash
$ docker run myimage
Hello, World!

$ docker run myimage ls
Hello, World! ls
```
🔹 `ls`를 입력해도 `echo`가 유지되므로 `"Hello, World! ls"`가 출력됨.

---

## 🔹 `ENTRYPOINT` + `CMD` 함께 사용하기
`ENTRYPOINT`는 고정 명령어, `CMD`는 기본 인자를 제공하는 방식으로 조합할 수 있습니다.

### ✅ 예제
```dockerfile
FROM ubuntu:latest
ENTRYPOINT ["ping"]
CMD ["localhost"]
```
```bash
$ docker run myimage
PING localhost (127.0.0.1) 56(84) bytes of data.

$ docker run myimage google.com
PING google.com (142.250.196.14) 56(84) bytes of data.
```
🔹 기본적으로 `ping localhost`가 실행됨.  
🔹 사용자가 `google.com`을 입력하면 `ping google.com` 실행됨.

---

## 🔥 정리
| 명령어       | 실행 시점 | 역할 | 특징 |
|------------|--------|-----|-----|
| `RUN` | 이미지 빌드 시 | 패키지 설치, 설정 | 실행 결과가 이미지에 저장됨 |
| `CMD` | 컨테이너 실행 시 | 기본 실행 명령 | 사용자가 다른 명령을 입력하면 무시됨 |
| `ENTRYPOINT` | 컨테이너 실행 시 | 고정 실행 명령 | 사용자가 입력한 명령과 결합 가능 |

🚀 **Mac 환경에서 `systemd` 없이 실행하려면 `ENTRYPOINT` 대신 `CMD` 또는 `RUN`을 활용하는 것이 좋습니다!**



`-c` 옵션은 **Bash에서 문자열로 된 명령어를 실행**할 때 사용됩니다.

---

## ✅ `-c` 옵션의 역할
`/bin/bash -c "명령어"`
- 문자열로 전달된 명령어를 실행하고, 종료됩니다.
- 보통 **스크립트 없이 한 줄짜리 명령어를 실행할 때** 사용됩니다.

### 🔹 예제 1: `-c` 없이 실행
```bash
/bin/bash
```
- 그냥 Bash 쉘을 실행하고, 사용자가 직접 명령어를 입력해야 합니다.

### 🔹 예제 2: `-c` 옵션 사용
```bash
/bin/bash -c "echo Hello, World!"
```
- `bash`가 `echo Hello, World!` 명령을 실행하고 종료됩니다.

---

## ✅ Docker에서 `ENTRYPOINT`와 `-c` 옵션 사용 예제
```yaml
services:
  ubuntu1:
    image: ubuntu:latest
    entrypoint: ["/bin/bash", "-c", "echo Hello from Ubuntu! && tail -f /dev/null"]
```
### 실행 과정:
1. 컨테이너가 실행되면 **`/bin/bash -c "echo Hello from Ubuntu! && tail -f /dev/null"`** 가 실행됨.
2. `"Hello from Ubuntu!"`가 출력됨.
3. `tail -f /dev/null`로 컨테이너가 계속 실행 상태 유지됨.

---

## 🔥 정리
| 옵션 | 설명 |
|------|------|
| `-c` | 문자열로 명령어를 받아 실행 후 종료 |

🚀 **Docker에서 `ENTRYPOINT: ["/bin/bash", "-c", "..."]`를 사용하면 컨테이너가 실행되면서 특정 명령을 자동 실행할 수 있음!**

---
### ❌ **오류 원인:**
**"System has not been booted with systemd as init system (PID 1)"**  
이 오류는 **Docker 컨테이너가 `systemd`가 아니라 `bash` 또는 `sh`를 init 프로세스로 사용하기 때문**입니다.  
즉, 컨테이너 내부에서 `systemctl`이 작동하지 않습니다.

---

## ✅ **해결 방법 1: `systemctl` 없이 SSH 직접 재시작 (추천)**
컨테이너에서 `systemd` 없이 SSH를 실행하고 재시작하는 가장 간단한 방법입니다.

```bash
# 1. 현재 실행 중인 SSH 서버 종료
pkill -u root -x sshd

# 2. SSH 서버 다시 실행
/usr/sbin/sshd -D
```

이렇게 하면 SSH 서버가 다시 실행됩니다.

---

## ✅ **해결 방법 2: `systemd`를 활성화하여 `systemctl restart ssh` 사용**
만약 꼭 `systemctl`을 사용하고 싶다면, 컨테이너를 `systemd` 기반으로 실행해야 합니다.

### 1️⃣ **Docker 컨테이너를 `--privileged` 모드로 실행**
```bash
docker run -it --privileged --name ubuntu-systemd -d ubuntu:latest /sbin/init
```
- `--privileged`: 모든 권한을 가진 컨테이너 실행
- `/sbin/init`: 컨테이너의 PID 1을 `systemd`로 설정

### 2️⃣ **컨테이너에 접속**
```bash
docker exec -it ubuntu-systemd bash
```

### 3️⃣ **필요한 패키지 설치**
```bash
apt update && apt install -y systemd systemd-sysv openssh-server
```

### 4️⃣ **SSH 서비스 활성화 및 재시작**
```bash
systemctl enable ssh
systemctl start ssh
systemctl restart ssh
```

---

## ✅ **정리**
| 방법 | 설명 | 사용 가능 여부 |
|------|------|---------------|
| `pkill -u root -x sshd && /usr/sbin/sshd -D` | `systemctl` 없이 SSH 재시작 | ✅ 일반 컨테이너 |
| `systemctl restart ssh` | `systemd` 활성화 후 사용 | ✅ `--privileged` 컨테이너 |

💡 **Docker 컨테이너에서는 `systemd`를 굳이 사용하지 않고 방법 1을 쓰는 것이 일반적입니다!** 🚀

--ask-vault-password-file
--ask-vault-pass
--ask-pass