# 소규모서비스구축

<img width="851" alt="소규모" src="https://github.com/leesanghoon94/my/assets/127801771/f744f75a-7c70-4a9c-b17d-084e7bf25b29">
142.250.206.196
간단한 WAS

jenkins app

                sudo -i
                yum update
                wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
                rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
                yum install -y jenkins

                잘설치되었는지
                rpm -qa | grep jenkins

                yum install -y git

                amazon-linux-extras install -y ansible2

                curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
                . ~/.nvm/nvm.sh
                nvm install 16

                yum install -y java

                jenkins java가 없으면 실행이 안됨

                systemctl start jenkins
                ps -ef | grep jenkins

networksetup -listallhardwareports

Hardware Port: Thunderbolt Bridge
Device: bridge0
Ethernet Address: 82:cb:2d:04:a4:01

Hardware Port: Wi-Fi
Device: en0
Ethernet Address: 8c:85:90:c5:b5:eb

Hardware Port: Thunderbolt 1
Device: en1
Ethernet Address: 82:cb:2d:04:a4:01

Hardware Port: Thunderbolt 2
Device: en2
Ethernet Address: 82:cb:2d:04:a4:00

Hardware Port: Thunderbolt 3
Device: en3
Ethernet Address: 82:cb:2d:04:a4:05

Hardware Port: Thunderbolt 4
Device: en4
Ethernet Address: 82:cb:2d:04:a4:04

# VLAN Configurations

sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
agnoster

## mysql

create database article;
use article;
CREATE TABLE articles (
\_id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(64),
body VARCHAR(64),
updatetime TIMESTAMP
);

INSERT INTO articles (title, body, updatetime) VALUES
('제목1', '내용1', CURRENT_TIMESTAMP),
('제목2', '내용2', CURRENT_TIMESTAMP),
('제목3', '내용3', CURRENT_TIMESTAMP);

alter table articles change column id \_id int;

show variables like 'validate_password%';
set global validate_password.policy=low;

여기서 validate_password_length는 최소한의 패스워드 길이를 설정하고, validate_password_policy는 패스워드 정책을 설정합니다. validate_password_policy의 값은 다음과 같습니다:

0: 패스워드 정책 비활성화
1: LOW
2: MEDIUM
3: STRONG
crate user
create user 'root'@'%' identified by '12345678';
DROP USER 'root'@'localhost';

grant all privileges on _._ to '계정명'@'%';

flush privileges;
