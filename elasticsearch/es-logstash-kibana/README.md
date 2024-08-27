# Elasticsearch, Logstash, Kibana (ELK) Docker-Compose 설정

Elasticsearch, Logstash, Kibana (ELK) 스택과 Filebeat 및 Nginx를 로그 수집 및 weblog.log 로그 수집 분석 시각화 구현해보기

## 구성 요소

- **Elasticsearch**: 검색 및 분석 엔진
- **Logstash**: 데이터 수집 및 변환 도구
- **Kibana**: 데이터 시각화 도구
- **Filebeat**: 로그 수집 및 전달 도구
- **Nginx**: 웹 서버 (로그 수집용)

## 버전 정보

**버전 통일**

- **Elasticsearch**: 8.6.2
- **Logstash**: 8.6.2
- **Kibana**: 8.6.2
- **Filebeat**: 8.6.2

## 서비스 구성

### Elasticsearch

- **이미지**: `docker.elastic.co/elasticsearch/elasticsearch:8.6.2`
- **포트**: 9200
- **환경 변수**:
  - `ES_SETTING_BOOTSTRAP_MEMORY__LOCK`: 메모리 잠금 활성화
  - `ES_JAVA_OPTS`: JVM 메모리 설정 (512MB)
  - `xpack.security.enabled`: 보안 비활성화
  - `node.attr.remote_cluster_client`: 원격 클러스터 클라이언트 설정
- **볼륨**: 데이터 저장용
- **노드 역할**:
  - `es01`: 마스터 노드
  - `es02`, `es03`: 데이터 및 인제스트 노드

### Logstash

- **이미지**: `docker.elastic.co/logstash/logstash:8.6.2`
- **포트**:
  - 5044 (Logstash Beats 입력)
  - 5001 (TCP 및 UDP 입력)
  - 9600 (Logstash HTTP API)
- **환경 변수**:
  - `LS_JAVA_OPTS`: JVM 메모리 설정 (512MB)
- **볼륨**:
  - `logstash.yml`: Logstash 설정 파일
  - `logstash.conf`: Logstash 파이프라인 구성 파일

### Kibana

- **이미지**: `docker.elastic.co/kibana/kibana:8.6.2`
- **포트**: 5601
- **환경 변수**:
  - `NODE_OPTIONS`: 최대 메모리 설정 (2GB)

### Filebeat

- **이미지**: `docker.elastic.co/beats/filebeat:8.6.2`
- **볼륨**:
  - `filebeat.yml`: Filebeat 설정 파일
  - `nginx/log`: Nginx 로그 파일
  - `weblog-sample.log`: 샘플 로그 파일

### Nginx

- **이미지**: `nginx`
- **포트**: 8080 (HTTP)
- **볼륨**:
  - `./nginx/log`: Nginx 로그

## 사용 방법

```bash
cd es-logstash-kibana/
docker-compose up -d
```
