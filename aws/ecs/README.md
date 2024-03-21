# ecs

### 아키텍처

![alt text](image.png)

### 개요

AWS CLI를 사용하여 Systems Manager의 인스턴스 프로파일 관리
AWS CLI를 사용하여, 수신하지 않는 EC2 환경을 생성할 수도 있습니다. create-environment-ec2를 호출할 때 --connection-type 옵션을 CONNECT_SSM으로 설정합니다.

이 옵션을 사용하면 AWSCloud9SSMAccessRole 서비스 역할 및 AWSCloud9SSMInstanceProfile이 자동으로 생성되지 않습니다. 따라서 다음 중 하나를 수행하여 필요한 서비스 프로파일과 인스턴스 프로파일을 생성합니다.

이후 AWSCloud9SSMAccessRole 서비스 역할과 AWSCloud9SSMInstanceProfile이 자동으로 생성되고 나면 콘솔을 사용하여 EC2 환경을 생성합니다. 생성된 서비스 역할 및 인스턴스 프로파일은 AWS CLI를 사용하여 생성한 모든 추가 EC2 환경에 사용할 수 있습니다.

다음 AWS CLI 명령을 실행하여 서비스 역할 및 인스턴스 프로파일을 생성합니다.

```aws iam create-role --role-name AWSCloud9SSMAccessRole --path /service-role/ --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{"Effect": "Allow","Principal": {"Service": ["ec2.amazonaws.com","cloud9.amazonaws.com"]      },"Action": "sts:AssumeRole"}]}'
aws iam attach-role-policy --role-name AWSCloud9SSMAccessRole --policy-arn arn:aws:iam::aws:policy/AWSCloud9SSMInstanceProfile
aws iam create-instance-profile --instance-profile-name AWSCloud9SSMInstanceProfile --path /cloud9/
aws iam add-role-to-instance-profile --instance-profile-name AWSCloud9SSMInstanceProfile --role-name AWSCloud9SSMAccessRole
```

- 5분 메이븐
  - https

---

ecs cluster
cluster {
cluster name
default namespace

}

infra {
amazon ec2 instance
auto scaling group
provisioning model {
on-demand
os amazon linux2 (kernel 5.10)
instance type = c5.large
desired capacity = {
minimum = 0
maximum = 2
}
ssh key pair
root ebs volume size = 30
}
monitoring {
use container insights = disable
}
}

---

task definition configuration {
task definition family = ""
infrastructure requirements {
launch type = [aws fargate, ec2 instance]
operating system/architecture = linux/x86_64
network mode = [awsvpc, bridge, default, host, none]
task size {
cpu = 1vcpu
memory = 3gb
}
}
}

service:
compute configuration:
compute options:
capacity provider startegy:
capacity provider startegy:
use default:
capacity provider:
deployment configuration:
application type:
service:
task definition:
family: asdf
revision: latest
service type:
replica:
daemon:
desired tasks: 1
deployment failure detection:
use the amazon ecs deployment circuit breaker
rollback on failures

//
elb inbound 80, 3333
rds port
