# Elasticsearch 및 Kibana Docker Compose 설정

Elasticsearch 클러스터와 Kibana를 실행하기 위한 Docker Compose 구성.

## 버전 정보

같은 버전으로 맞춰야함

- **Elasticsearch 버전:** 8.6.2
- **Kibana 버전:** 8.6.2

---

## 구성

- **Elasticsearch 노드 3개** (`es01`, `es02`, `es03`):
  - `es01`은 마스터 노드로 설정되어 있습니다.
  - `es02`와 `es03`은 데이터 및 인제스트 노드로 설정되어 있습니다.
- **Kibana** Elasticsearch와 연결을위해 kibana.yml 작성.

### Elasticsearch

- **이미지:** `docker.elastic.co/elasticsearch/elasticsearch:8.6.2`
- **노드:**
  - `es01` (마스터 노드)
  - `es02` (데이터 및 인제스트 노드)
  - `es03` (데이터 및 인제스트 노드)
- **클러스터 이름:** `es-cluster`
- **보안:** 비활성화 (`xpack.security.enabled: "false"`)

### Kibana

- **이미지:** `docker.elastic.co/kibana/kibana:8.6.2`
- **포트:** 5601
- **설정 파일:** `./kibana.yml`를 `/usr/share/kibana/config/kibana.yml`로 매핑
- **환경 변수:** `NODE_OPTIONS: "--max-old-space-size=2048"`
- NODE_OPTIONS: 이 환경 변수는 Node.js 프로세스가 시작될 때 전달될 수 있는 기본적인 명령줄 옵션을 지정하는 데 사용됩니다. Kibana는 Node.js 기반 애플리케이션이기 때문에 이 변수로 JavaScript 런타임의 옵션을 조정할 수 있습니다.

- --max-old-space-size: 이 옵션은 Node.js의 V8 JavaScript 엔진에서 사용할 수 있는 최대 힙 메모리 크기를 메가바이트 단위로 설정합니다. 이 값을 설정하면, Node.js 애플리케이션이 사용하는 메모리의 상한을 조절할 수 있습니다.

2048은 2GB를 의미합니다. 즉, Kibana는 최대 2GB의 메모리를 사용할 수 있습니다.

**다음 명령어로 컨테이너를 시작:**

```bash
docker-compose up -ㅇ
```
