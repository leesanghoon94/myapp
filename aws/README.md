# AWS 소규모서비스구축

### 아키텍처

<img width="626" alt="스크린샷 2024-03-01 오후 7 11 39" src="https://github.com/leesanghoon94/my/assets/127801771/52f21cbf-7ee9-4a64-8a60-10e1e71dc75f">

### prerequisite

---

- 테라폼을 활용하여 인프라를 생성합니다. (AWS VPC, EC2, RDS, Security Groups)

```zsh
cd tf/
terraform init
terraform plan
terraform apply
```

### 개요

---

이 프로젝트는 Node.js 기반의 웹 어플리케이션을 AWS 환경에 배포하고 있습니다.

1.  프론트엔드 :
    React와 Nginx를 사용한 프론트엔드 배포.
1.  백엔드 :
    rds와 노드 익스프레스 서버를 통해 백엔드 구동.

### 결과

---

- 테라폼을 활용하여 리팩토링이 쉽다.
- ELB를 사용하여 트래픽을 분산하고, Route 53과 ACM를 활용하여 SSL 인증서를 관리하여 보안성을 강화합니다.
- RDS를 활용하여 데이터베이스 관리의 편의성과 성능을 동시에 보장합니다.
- Private 서브넷에 위치하여 외부에서 직접 접근이 불가능하도록 보안을 강화합니다.
