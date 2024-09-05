# my

## change!!!!!!!!!!!!!!!!!!!!!!

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

                export NVM_DIR="$HOME/.nvm"
                [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
                [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
                nvm install 16

                yum install -y java

                jenkins java가 없으면 실행이 안됨

                systemctl start jenkins
                ps -ef | grep jenkins

sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
agnoster

npm i -g ngrok

generic-webhook-trigger
var expression
user $.pusher.name
optional filter

^((?!build)) $user
