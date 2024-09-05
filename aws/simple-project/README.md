# simple-project (AWS 소규모서비스)

### 아키텍처

<img width="626" alt="스크린샷 2024-03-01 오후 7 11 39" src="https://github.com/leesanghoon94/my/assets/127801771/52f21cbf-7ee9-4a64-8a60-10e1e71dc75f">

### 사용법

테라폼을 활용하여 인프라를 생성합니다. (AWS VPC, EC2, RDS, Security Groups)

```zsh
terraform init
terraform plan
terraform apply
```

### 개요

이 프로젝트는 Node.js 기반의 웹 어플리케이션을 AWS 환경에 배포하고 있습니다.

- ami = "ami-04599ab1182cd7961"
- instance_type = "t2.micro"
  > 비용이 나오기때문에 프리티어 활용

프론트엔드 :  
 React와 Nginx를 사용한 프론트엔드 구현.  
 백엔드 :  
 rds와 노드 익스프레스 서버를 통해 백엔드 구현.

테라폼을 이용해 인프라를 코드로 문서화 관리하여 일관성, 배포 자동화.  
ELB를 사용하여 트래픽을 분산하고, Route 53과 ACM를 활용하여 SSL 인증서를 관리하여 보안성을 강화합니다.  
RDS를 활용하여 데이터베이스 관리의 편의성과 성능을 동시에 보장합니다.  
Private 서브넷에 위치하여 외부에서 직접 접근이 불가능하도록 보안을 강화합니다.  
openVpn이미지를 통해서 로컬에서 프라이빗 서브넷 접근을 편리하게 구현.  
route53으로 도메인을 만들어주어 유저에게 쉬운 접근을 만듬.

### 추가하면 좋은 aws리소스

cloudFront는 비용때문에 구현하지 않았지만 로드밸런서를 통해 ssl/tls 인증을 https통신 구현했지만

- 글로벌 배포: CloudFront는 전 세계적으로 분산된 엣지 로케이션을 통해 콘텐츠를 사용자에게 빠르게 전달할 수 있어 지연 시간이 짧아집니다.

- 보안 기능: CloudFront는 AWS WAF와 통합되어, DDoS 공격 방어 및 웹 애플리케이션 방화벽을 통한 추가 보안을 제공합니다.

- TLS/SSL 지원: CloudFront는 HTTPS를 통해 암호화된 연결을 제공하며, SSL 인증서 관리도 지원합니다.

고려하면 좋을 것 같다.
