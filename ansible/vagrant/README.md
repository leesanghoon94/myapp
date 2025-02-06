Ansible 소개
여러개의 서버를 관리하기 위한 환경 구성 자동화 도구
2013년에 버전 1 출시 이후 redhat 에 인수됨
Chef, puppet 과 같은 구성 관리 도구의 일종이지만 사용성/확장성이 매우뛰어남
기본적으로 데이터 전송을 위해 openssh 를 사용
Agent 없이 서버 관리 가능
Yaml 언어 사용 포맷이쉬움

nginx config
package install
linux user create/delete
sudo user group manage
server 종료/재부팅
파일 권한 변경

ansible 기본개념
control node ansible 이 실행되는 노드
managed node ansible 로 관리하는 서버
inventory managed node list
module ansible 이 실행하는 코드 단위
task ansible 작업단위 module 의 모음
playbook variable, task 가 포함된 yaml 파일 host 와 task 를 연결

| 장점                                  | 단점                                  |
|-------------------------------------|-------------------------------------|
| 사용하기 편리함 yaml,ssh                   | 자체적인 기능이 다른 tool 에 비하면 적음           |
| downtime 없는 rolling update 지원       | 자동완성이나 정적분석의 어려움                    |
| ssh 사용 agentless                    | 변수사용으로 복잡성 증가 변수 값 확인이 어려움          |
| kerberos/ldap 와 같은 인증 관리 시스템과 연동 가능 | input,output,config 파일간의 형식 일관성이 없음 | 
| 변수 기능 사용으로 재사용성 높음                  | 가끔씩 성능 저하 발생                        |
| 다양한 플랫폼 지원 ssh                      |                                     |
| idempotency 멱등성                     |                                     |


inventory
작업 대상 서버와 변수 정보를 저장
ini, yaml 파일로설정

all
모든 호스트 정보
children
- 그룹별 호스트 정보
- 일반적으로 작업 단위 별로 설정
api.example.com[1:10]
- 1~10번 까지의 호스트 설정
- 10.0.0.5
- ip직접 설정 가능

---
ad-hoc command
playbook을 작성하지 않고 직접 ansible module을 호출해서 실행하는 방식
재사용이 필요없는 명령어를 여러 호스트에서 실행 가능
침수로 인한 모든 장비의 전원을 끌 때

playbook
host 와 task 를 연결하는 역할 
playbook 에서 Task 를 지정해서 작업 진행 가능

Role
task 를 묶어서  role 로 만들어서 반복 사용 가능
roles 폴더 내부에 정의해두면 자동으로 읽어옴
task: 작업 내용
handlers: 핸들러
templates: 롤템플릿
files: 정적파일
vars: 변수
defaults: 기본 변수이며 vars에게 overwrited 될수 있는 변수
meta: 작성자, 라이센스 같은 메타 정보, validation
library: custom module

module 
단일 명령어나 수행할 작업 : cp,cat,
기본 built-in module 도 제공
윈도우는 별도 모듈을 사용

handler 
ansible 이 지원하는 조건부 형식
조건에 맞을때 handler를 실행
task에서 notify를 이용하여 handler의 name을 매개변수로 전달하여 사용
일반적으로 모든 task 가 실행되고 handler가 실행됨
notify를 여러번 받아도 handler 는 1번만 실행됨
playbook


variable
변수종류
로컬변수
그룹변수
글로벌변수
vars_files
변수가 설정된 파일

반복문 loop
with_items:
  - 1
  - [2,3]
  - 4
loop:

facts
ansible 에서 호스트에서 검색/수집한 변수
호스트 정보(os,ip)
prefix: ansible_

ansible 실습 내용 설명
terraform 으로 ec2 생성
ec2와 ssh 설정 확인
nginx 설치 후 설정 변경 해보기
inventory.yaml
playbook.yaml

---
troubleshooting

```console
~/Desktop/portfolio/ansible/무제 폴더 git:[main]
vagrant up
Bringing machine 'master' up with 'vmware_fusion' provider...
Bringing machine 'node1' up with 'vmware_fusion' provider...
Bringing machine 'node2' up with 'vmware_fusion' provider...
==> master: Cloning VMware VM: 'bento/ubuntu-22.04'. This can take some time...
==> master: Checking if box 'bento/ubuntu-22.04' version '202401.31.0' is up to date...
==> master: Verifying vmnet devices are healthy...
==> master: Preparing network adapters...
==> master: Starting the VMware VM...
==> master: Waiting for the VM to receive an address...
==> master: Deleting the VM...
/opt/vagrant/embedded/gems/gems/i18n-1.14.1/lib/i18n/interpolate/ruby.rb:33:in `gsub': incompatible character encodings: UTF-8 and ASCII-8BIT (Encoding::CompatibilityError)
        from /opt/vagrant/embedded/gems/gems/i18n-1.14.1/lib/i18n/interpolate/ruby.rb:33:in `interpolate_hash'
        from /opt/vagrant/embedded/gems/gems/i18n-1.14.1/lib/i18n/interpolate/ruby.rb:26:in `interpolate'
        from /opt/vagrant/embedded/gems/gems/i18n-1.14.1/lib/i18n/backend/base.rb:195:in `interpolate'
        from /opt/vagrant/embedded/gems/gems/i18n-1.14.1/lib/i18n/backend/base.rb:62:in `translate'
        from /opt/vagrant/embedded/gems/gems/i18n-1.14.1/lib/i18n.rb:363:in `block in translate_key'
        from /opt/vagrant/embedded/gems/gems/i18n-1.14.1/lib/i18n.rb:362:in `catch'
        from /opt/vagrant/embedded/gems/gems/i18n-1.14.1/lib/i18n.rb:362:in `translate_key'
        from /opt/vagrant/embedded/gems/gems/i18n-1.14.1/lib/i18n.rb:222:in `translate'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/errors.rb:106:in `translate_error'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/errors.rb:75:in `initialize'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/errors.rb:18:in `initialize'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/driver/base.rb:1274:in `exception'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/driver/base.rb:1274:in `raise'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/driver/base.rb:1274:in `block (2 levels) in vmexec'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/util/retryable.rb:20:in `retryable'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/driver/base.rb:1267:in `block in vmexec'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/util/busy.rb:22:in `busy'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/driver/base.rb:1266:in `vmexec'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/driver/base.rb:1294:in `vmrun'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/driver/base.rb:637:in `read_ip'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/wait_for_address.rb:22:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/boot.rb:24:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builtin/handle_forwarded_port_collisions.rb:55:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/prepare_forwarded_port_collision_params.rb:26:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/vmx_modify.rb:37:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builtin/set_hostname.rb:20:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/base_mac_to_ip.rb:33:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/network.rb:120:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/prepare_nfs_settings.rb:16:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builtin/synced_folders.rb:90:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builtin/delayed.rb:22:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builtin/synced_folder_cleanup.rb:31:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/plugins/synced_folders/nfs/action_cleanup.rb:28:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/prepare_synced_folder_cleanup.rb:17:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builtin/provision.rb:83:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:117:in `block in finalize_action'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builder.rb:183:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/runner.rb:104:in `block in run'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/util/busy.rb:22:in `busy'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/runner.rb:104:in `run'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builtin/call.rb:56:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/prune_forwarded_ports.rb:28:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/check_existing_network.rb:33:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:117:in `block in finalize_action'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builder.rb:183:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/runner.rb:104:in `block in run'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/util/busy.rb:22:in `busy'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/runner.rb:104:in `run'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builtin/call.rb:56:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builtin/box_check_outdated.rb:98:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/fix_old_machine_id.rb:27:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/compatibility.rb:17:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/set_display_name.rb:35:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/import.rb:108:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builtin/prepare_clone.rb:18:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builtin/handle_box.rb:59:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:117:in `block in finalize_action'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builder.rb:183:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/runner.rb:104:in `block in run'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/util/busy.rb:22:in `busy'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/runner.rb:104:in `run'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builtin/call.rb:56:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/check_vmware.rb:26:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/fix_old_machine_id.rb:27:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builtin/config_validate.rb:28:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /Users/lee/.vagrant.d/gems/3.1.4/gems/vagrant-vmware-desktop-3.0.3/lib/vagrant-vmware-desktop/action/compatibility.rb:34:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/warden.rb:38:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/builder.rb:183:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/runner.rb:104:in `block in run'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/util/busy.rb:22:in `busy'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/action/runner.rb:104:in `run'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/machine.rb:247:in `action_raw'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/machine.rb:216:in `block in action'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/environment.rb:649:in `lock'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/machine.rb:202:in `call'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/machine.rb:202:in `action'
        from /opt/vagrant/embedded/gems/gems/vagrant-2.4.1/lib/vagrant/batch_action.rb:89:in `block (2 levels) in run'
```
vagrant plugin update 
```console
~/Desktop/portfolio/ansible/무제 폴더 git:[main]
vagrant plugin update
Updating installed plugins...
Fetching vagrant-vmware-desktop-3.0.4.gem
Successfully uninstalled vagrant-vmware-desktop-3.0.3
Updated 'vagrant-vmware-desktop' to version '3.0.4'!
```

---
# troubleshooting

```console
~/Desktop/portfolio/ansible/vagrant git:[main]
vagrant up --provider=docker
Bringing machine 'default' up with 'docker' provider...
Vagrant could not detect VirtualBox! Make sure VirtualBox is properly installed.
Vagrant uses the `VBoxManage` binary that ships with VirtualBox, and requires
this to be available on the PATH. If VirtualBox is installed, please find the
`VBoxManage` binary and add it to the PATH environmental variable.
```
vagrant를 도커로 프로비저닝하려는데 virtualbox 감지할수없다는 에러발생

--provider=docker
export $VAGRANT_DEFUALT_PROVIDER="docker"





### 기본 프로바이더 (Default Provider)

위에서 언급한 것처럼, 일반적으로 `--provider`를 명시할 필요는 없습니다. Vagrant는 특정 환경에 적합한 프로바이더를 자동으로 감지할 만큼 충분히 스마트하게 설계되어 있습니다.

Vagrant는 다음과 같은 순서로 기본 프로바이더를 찾습니다:

1. **`--provider` 플래그**  
   `vagrant up` 명령에 `--provider` 플래그가 있으면, 다른 설정보다 우선적으로 해당 플래그가 지정한 프로바이더를 사용합니다.

2. **`VAGRANT_DEFAULT_PROVIDER` 환경 변수**  
   `VAGRANT_DEFAULT_PROVIDER` 환경 변수가 설정되어 있다면, 두 번째로 우선순위가 높으며 해당 프로바이더가 선택됩니다.

3. **`Vagrantfile`에 정의된 `config.vm.provider` 설정**  
   Vagrant는 `Vagrantfile`에 정의된 모든 `config.vm.provider` 설정을 순서대로 확인하며, 사용 가능한 첫 번째 프로바이더를 선택합니다. 예를 들어, Hyper-V가 설정되어 있어도 Mac에서는 선택되지 않습니다. 프로바이더가 **설정되어 있어야 하며 사용 가능**해야 선택됩니다.

4. **설치된 모든 프로바이더 플러그인 검사**  
   Vagrant는 설치된 모든 프로바이더 플러그인을 확인하고, 사용 가능하다고 보고된 첫 번째 플러그인을 선택합니다. 여기에는 우선순위 시스템이 존재합니다. 예를 들어, VMware 프로바이더가 설치되어 있으면 VirtualBox보다 항상 우선적으로 선택됩니다.

5. **사용 가능한 프로바이더가 없을 경우**  
   만약 위 과정을 통해 사용 가능한 프로바이더를 찾지 못하면, Vagrant는 에러를 발생시킵니다.

---

이 방법을 통해 Vagrant는 대부분의 경우 올바른 프로바이더를 자동으로 선택할 수 있습니다. 또한, 각 `Vagrantfile`은 지원하려는 프로바이더의 우선순위를 정의할 수 있습니다.

---

### 프로바이더 우선순위 설정 트릭

`Vagrantfile` 상단에 별도의 설정 없이 `config.vm.provider`를 사용하면 선호하는 프로바이더의 우선순위를 정의할 수 있습니다. 예를 들어:

```ruby
Vagrant.configure("2") do |config|
  # 다른 설정 내용...

  # VMware Fusion을 VirtualBox보다 우선시
  config.vm.provider "vmware_fusion"
  config.vm.provider "virtualbox"
end
```

위 설정은 VMware Fusion을 우선적으로 시도하고, 사용할 수 없는 경우 VirtualBox를 선택하도록 구성합니다.