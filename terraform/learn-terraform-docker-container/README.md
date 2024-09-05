# learn-terraform-docker-container

### 사용법

```sh
terraform init
terraform plan
terraform apply -auto-approve
terraform destroy -auto-approve
```

브라우저를 열고 `http://localhost:8000`으로 접속하여 NGINX 웹 서버가 정상적으로 실행되는지 확인합니다.

사용이 끝난 후 Terraform을 사용하여 리소스를 정리합니다.

## 예제 코드

### `main.tf`

```hcl
terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

resource "docker_image" "nginx" {
  name         = "nginx"
  keep_locally = false
}

resource "docker_container" "nginx" {
  image = docker_image.nginx.image_id
  name  = "nginx-terraform"

  ports {
    internal = 80
    external = 8000
  }
}
```

## 참고 자료

- [Terraform 공식 문서](https://www.terraform.io/docs)
- [Docker 공식 문서](https://docs.docker.com/)
  > https://developer.hashicorp.com/terraform/tutorials/docker-get-started/docker-build
