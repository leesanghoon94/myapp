# 개요
error handling in playbooks  
Ansible이 명령에서 0이 아닌 반환 코드를 받거나 모듈에서 실패하면 기본적으로 해당 호스트에서 실행을 중지하고 다른 호스트에서 계속됩니다. 
그러나, 어떤 상황에서는, 당신은 다른 행동을 원할 수 있습니다. 
때로는 0이 아닌 반환 코드가 성공을 나타냅니다. 
때로는 한 호스트의 실패가 모든 호스트의 실행을 중지하기를 원합니다.
Ansible은 이러한 상황을 처리하고 원하는 행동, 출력 및 보고를 얻을 수 있도록 도구와 설정을 제공합니다.


# 사용법

`ignore_errors`:  
기본적으로 Ansible은 해당 호스트에서 작업이 실패하면 호스트에서 작업 실행을 중지합니다. 
에러를 무시하고싶을때 쓰면 된다

```yaml
- name: Do not count this as a failure
  ansible.builtin.command: /bin/false
  ignore_errors: true  <-----------
```

`failed_when`:

Ansible을 사용하면 failed_when 조건부를 사용하여 각 작업에서 "실패"가 무엇을 의미하는지 정의할 수 있습니다. 
Ansible의 모든 조건과 마찬가지로, 여러 failed_when 조건의 목록이 암시적으로 결합되어 모든 조건이 충족될 때만 작업이 실패한다는 것을 의미합니다.
조건 중 하나라도 충족될 때 실패를 트리거하려면 명시적 또는 연산자로 문자열에 조건을 정의해야 합니다.

```yml
    - name: failed_when
      ansible.builtin.command: cat /var/log/app.log
      register: log_output
      failed_when: log_output.rc ==0
```

! ansible에서 task 의 실행 결과를 변수에 저장할때 쓰는 `register`
특정 task 의 실행결과(출력값, 상태코드 등)를 저장.
저장한 값을 이후 task 에서 when 조건문, until 반복문, debug 디버깅 등에 활용 가능.


test.yaml 마지막 task 실행후 실행결과를 보면 일부러 파일이 존재하면 실패하도록 만들었다.  
rc: 1 이라고 되어있다. return code의 약자.
app.log 파일이 존재하지 않기 때문에 1 실패코드가 뜬다. 0이면 성공, 1이면 실패  
register: result
failed_when: result.rc == 0
register에 result로 변수를 저장했기때문에 result.rc ==0 로 조건을 걸어준다.  
```console
changed: [localhost] => {
    "changed": true,
    "cmd": [
        "cat",
        "/var/log/app.log"
    ],
    "delta": "0:00:00.006238",
    "end": "2025-02-08 02:20:49.751367",
    "failed_when_result": false,
    "invocation": {
        "module_args": {
            "_raw_params": "cat /var/log/app.log",
            "_uses_shell": false,
            "argv": null,
            "chdir": null,
            "creates": null,
            "executable": null,
            "removes": null,
            "stdin": null,
            "stdin_add_newline": true,
            "strip_empty_ends": true
        }
    },
    "msg": "non-zero return code",
    "rc": 1,
    "start": "2025-02-08 02:20:49.745129",
    "stderr": "cat: /var/log/app.log: No such file or directory",
    "stderr_lines": [
        "cat: /var/log/app.log: No such file or directory"
    ],
    "stdout": "",
    "stdout_lines": []
}

```

