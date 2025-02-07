# 개요
Ansible의 Idempotent(멱등성) 개념

**Idempotent(멱등성)** 이란 같은 작업을 여러 번 실행해도 결과가 변하지 않는 성질을 말한다.
Ansible에서 멱등성을 유지하는 작업을 만들면, 불필요한 변경 없이 필요한 경우에만 실행되도록 할 수 있다.

```yml
- name: Example
  hosts: all


  tasks:
    - name: Install curl (non-idempotent)
      ansible.builtin.command: apt install -y curl

    - name: Ensure curl is installed
      ansible.builtin.apt:
        name: curl
        state: present

```
command 모듈 멱등성이 보장이안되서 실행할때 마다 `changed` 상태
apt 모듈 이미 파일이있어서 변경되지 않고 `ok` 상태가 된다.

# 정리
멱등성을 보장해주는 모듈을 쓰는것이 좋다.
멱등성( Idempotent)
같은 플레이북을 여러 번 실행해도 불필요한 변경이 발생하지 않음.  
예: copy, file, apt, yum, service, user 같은 모듈들은 기본적으로 멱등성을 보장함.
비멱등성(Non-Idempotent)
실행할 때마다 변경이 발생하는 작업.
예: shell, command 모듈을 사용한 동적 명령어 실행.
