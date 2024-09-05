# bastion host

<img width="727" alt="bastion" src="https://github.com/leesanghoon94/my/assets/127801771/31f871bc-ecb9-42e1-a7c8-9a3a0cf8dd64">

### 사용법

```zsh
tfi
tfp
tfa -auto-approve
```

## bastion host에서 private ec2로 접속

테라폼 배후 완료후 터미널로 접속 (terminal, warp)  
ssh-add 로 미리 만들어놓은 my.pem키 등록해준다.  
ssh -A 쓰면 private ec2에 pem키를 scp 없이 사용할수있다.

```zsh
ssh ec2-user@43.203.83.162
```

## private ec2에서 nat gw을 통해 인터넷 연결 확인

curl -v google.com

## 정리하기

```zsh
tfd -auto-approve
```

ec2, nat-gw 시간에따른 비용이 나오기전에 정리하기
