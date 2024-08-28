# learn-terraform-docker-container

- `docker_image`: Docker 이미지를 정의합니다.
- `docker_container`: Docker 컨테이너를 정의하고, 이미지를 기반으로 컨테이너를 실행합니다.

## 요구 사항

- [Terraform](https://www.terraform.io/downloads.html) 설치
- [Docker](https://docs.docker.com/get-docker/) 설치

## 설치 및 사용 방법

1. **프로젝트 클론**

   ```sh
   git clone https://github.com/yourusername/terraform-docker-example.git
   cd terraform-docker-example
   ```

2. **Terraform 초기화**

   Terraform의 프로바이더와 모듈을 다운로드하고 초기화합니다.

   ```sh
   terraform init
   ```

3. **계획 확인**

   Terraform이 수행할 작업을 확인합니다.

   ```sh
   terraform plan
   ```

4. **적용**

   Terraform을 사용하여 정의된 인프라를 배포합니다.

   ```sh
   terraform apply
   ```

   프롬프트가 나타나면 `yes`를 입력하여 변경 사항을 적용합니다.

5. **확인**

   브라우저를 열고 `http://localhost:8000`으로 접속하여 NGINX 웹 서버가 정상적으로 실행되는지 확인합니다.

6. **정리**

   사용이 끝난 후 Terraform을 사용하여 리소스를 정리합니다.

   ```sh
   terraform destroy
   ```

   프롬프트가 나타나면 `yes`를 입력하여 리소스를 삭제합니다.

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

## 라이센스

이 프로젝트는 [MIT 라이센스](LICENSE) 하에 배포됩니다.

```

이 README 파일을 사용하여 Terraform과 Docker를 연습하는 프로젝트를 포트폴리오에 추가할 수 있습니다. 필요에 따라 설명을 추가하거나 조정하시면 좋겠습니다!
```
