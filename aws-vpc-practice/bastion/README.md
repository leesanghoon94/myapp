# bastion host

<img width="727" alt="bastion" src="https://github.com/leesanghoon94/my/assets/127801771/31f871bc-ecb9-42e1-a7c8-9a3a0cf8dd64">

## prerequisite

```
cd tf/
tfi
tfp
tfa -auto-approve
```

## bastion host에서 private ec2로 접속

완료후  
터미널로 접속  
ssh-add로 이미 pem키 등록해놨음  
ssh -A 쓰면 private ec2에 pem키를 scp 없이 사용할수있다

```
ssh ec2-user@43.203.83.162
```

## private ec2에서 nat gw을 통해 인터넷 연결 확인

curl -v google.com

## clean up

tfd -auto-approve
