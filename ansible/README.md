# 개요
https://github.com/choisungwook/ansible_practice  
ansible 공부중 악분일상 유투브보고 공부한 내용 정리  
도커로 개발환경 만들기 

# 사용법
```console
cd docker
docker-compose up -d

cd vagrant
vagrant up

```

ubuntu 2개는 ansible-node 이고 로컬에서 ansible로 ssh 통신할 예정

# ansible examples
[playbook 실행 실패](./examples/ansible_failed)  
[ansible vault](./examples/ansible_vault)  
[ansible 멱등성](./examples/ansible_idempotent)  
[ansible mysql collection 예제](./examples/ansible_idempotent)