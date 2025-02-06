## 1. Ansible Vault란?
Ansible Vault는 민감한 정보를 암호화하여 Ansible Playbook에서 안전하게 관리할 수 있도록 도와주는 기능입니다. 이를 통해 **비밀번호, API 키, SSH 키, 데이터베이스 접속 정보** 등을 안전하게 저장하고 사용할 수 있습니다.

## 2. Ansible Vault 기본 사용법

### 2.1. Vault 파일 생성
Vault 파일을 생성할 때는 `ansible-vault create` 명령을 사용합니다.
```sh
ansible-vault create secrets.yml
```
이후 비밀번호를 입력하면 `secrets.yml` 파일이 생성되며, 자동으로 편집 모드가 열립니다.

### 2.2. 기존 파일 암호화
이미 존재하는 파일을 암호화하려면 다음 명령어를 사용합니다.
```sh
ansible-vault encrypt config.yml
```
이제 `config.yml` 파일이 암호화되며, `ansible-vault edit config.yml`을 사용해 내용을 수정할 수 있습니다.

### 2.3. Vault 파일 수정
암호화된 Vault 파일을 수정하려면 다음 명령어를 사용합니다.
```sh
ansible-vault edit secrets.yml
```
이 명령을 실행하면 비밀번호 입력 후 파일을 수정할 수 있습니다.

### 2.4. Vault 파일 복호화
파일을 복호화하려면 다음 명령을 실행합니다.
```sh
ansible-vault decrypt secrets.yml
```
이제 파일이 일반 텍스트로 변경됩니다.

- 파일을 복호화하면 또 암호화를 해줘야되는게 번거로우니 edit을 활용해야 편할것같다, 
### 2.5. 암호화된 파일 실행
암호화된 파일을 포함한 Playbook을 실행할 때는 `--ask-vault-pass` 옵션을 사용합니다.
```sh
ansible-playbook -i inventory playbook.yml --ask-vault-pass
```
Vault 비밀번호 입력 후 Playbook이 실행됩니다.

## 3. 실무에서 Ansible Vault 활용법

### 3.1. 환경별로 다른 보안 정보 관리
서버 환경(개발, 스테이징, 운영)에 따라 다른 보안 정보를 관리할 수 있습니다.
```sh
ansible-vault create group_vars/prod/secrets.yml
ansible-vault create group_vars/dev/secrets.yml
```
이렇게 하면 환경별로 다른 보안 정보를 저장할 수 있습니다.

### 3.2. Vault 비밀번호 파일 사용
매번 비밀번호를 입력하는 대신 Vault 비밀번호 파일을 사용할 수 있습니다.
```sh
echo "my_secret_password" > .vault_pass
chmod 600 .vault_pass
```
이제 `--vault-password-file` 옵션을 사용하여 Playbook을 실행할 수 있습니다.
```sh
ansible-playbook -i inventory playbook.yml --vault-password-file .vault_pass
```

### 3.3. Git과 함께 사용하기
Git에 Playbook을 저장할 때 Vault를 사용하면 보안 정보가 유출되지 않도록 보호할 수 있습니다.
```sh
ansible-vault encrypt secrets.yml
```
그리고 `.gitignore`에 비밀번호 파일을 추가하여 Git에 푸시되지 않도록 합니다.
```
.vault_pass
```

## 4. troubleshooting

```yml
- name: 'ansible vault test'
  hosts: all
  vars_files:
    - password.txt

...

    - name: Create password file
      ansible.builtin.lineinfile:
        path: /tmp/test.txt
        line: "password={{ password }}"
        create: true
        mode: '0600'
```
ansible-vault playbook.yml --ask-vault-pass 

```console

~/Desktop/portfolio/ansible/ansible_quickstart git:[main]
ansible-playbook -i inventory.ini playbook.yml --ask-vault-pass
Vault password:
ERROR! variable files must contain either a dictionary of variables, or a list of dictionaries. Got: password=helloworld! (<class 'ansible.parsing.yaml.objects.AnsibleUnicode'>)
```

ERROR! 변수 파일에는 변수 사전 또는 사전 목록이 포함되어야 합니다. Got: helloworld(<클래스 'ansible.parsing.yaml.objects.AnsibleUnicode'>)

`password= helloworld!`

Ansible Vault 파일에서 변수(키)와 값을 정의할 때는 YAML 형식을 따라야 합니다.
즉, 변수명: 값 형태여야 하며, = 기호는 사용하지 않습니다.