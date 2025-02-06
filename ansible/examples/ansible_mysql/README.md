# 개요
* ansible collection mysql을 사용하여 mysql 계정을 생성

# 준비
* docker로 mysql 컨테이너 생성

```sh
docker run --name mysql  --rm -e MYSQL_ROOT_PASSWORD=root -e MYSQL_ROOT_PASSWORD=password1234 -p 3306:3306 -d mysql:8.3.0
```

# 실행방법

* playbook 실행
```sh
ansible-playbook playbook.yaml
```

* 계정 확인

```sh
docker exec -it mysql mysql -uroot -ppassword1234 -e "SELECT user,host FROM mysql.user;"
```


# 참고자료
* https://galaxy.ansible.com/ui/standalone/roles/geerlingguy/mysql/install/

# troubleshooting

1. 도커로 mysql 서버를띄우는데 서버가 자꾸 다운이되었다.
   ```console
   ~/Desktop/hands-on/ansible_practice/examples/collection_mysql git:[main]
   docker run --name mysql  --rm -e MYSQL_ROOT_PASSWORD=root -e MYSQL_ROOT_PASSWORD=password1234 -p 3306:3306 -d mysql:8.3.0 --network=ansible_quickstart_custom_network
   12b9191bca43c0dfd417b36a7a0908981cd7a35df2c164e00c6fb5499e1797e7
   ```
   --network 옵션을 맨끝에 넣어서 생긴 에러
   ```console
    docker run --name mysql  --rm -e MYSQL_ROOT_PASSWORD=root -e MYSQL_ROOT_PASSWORD=password1234 -p 3306:3306 --network=ansible_quickstart_custom_network -d mysql:8.3.0
    ```
   
2. 플레이북 실행중 테스크실행중 cryptography 패키지가 필요하다고 생긴 에러
    ```console
    TASK [Create user] ******************************************************************************************************************************************************
    fatal: [ubuntu1]: FAILED! => {"changed": false, "msg": "unable to connect to database, check login_user and login_password are correct or /root/.my.cnf has the credentials. Exception message: 'cryptography' package is required for sha256_password or caching_sha2_password auth methods"}
    ```
    이 오류 메시지는 필수 암호화 패키지가 누락되어 Ansible 플레이북에서 MySQL 사용자를 만들지 못했음을 나타냅니다. 
    이 패키지는 sha256_password 또는 caching_sha2_password와 같은 인증 방법에 필요합니다. 
    해결 방법: 1. 가상 환경 내에 암호화 패키지 설치: 가상 환경(venv) 내에 pymysql을 설치하므로 동일한 환경에 암호화도 설치해야 합니다.
    pip install cryptography

3. unable to connect to database
```console
TASK [Create user] ******************************************************************************************************************************************************
fatal: [ubuntu1]: FAILED! => {"changed": false, "msg": "unable to connect to database, check login_user and login_password are correct or /root/.my.cnf has the credentials. Exception message: (2003, \"Can't connect to MySQL server on 'localhost' ([Errno 111] Connection refused)\")"}

PLAY RECAP **************************************************************************************************************************************************************
ubuntu1                    : ok=3    changed=2    unreachable=0    failed=1    skipped=0    rescued=0    ignored=0    
```

```console
~/Desktop/hands-on/ansible_practice/examples/collection_mysql git:[main]
docker inspect mysql -f"{{.NetworkSettings.Networks.ansible_quickstart_custom_network.IPAddress}}"
192.168.1.2
```
localhost라고 되어있는 playbook.yaml에 mysql의 아이피로 수정해준다
```yaml
tasks:
- name: Create user
community.mysql.mysql_user:
login_host: 192.168.1.2 <----------- localhost
login_user: root
login_password: password1234
name: bob
password: 12345
priv: '*.*:ALL'
state: present

```