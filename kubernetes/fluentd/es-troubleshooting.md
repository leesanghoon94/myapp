[2024-08-09T09:21:13,854][WARN ][o.e.h.n.Netty4HttpServerTransport] [localhost.localdomain] received plaintext http traffic on an https channel, closing connection Netty4HttpChannel{localAddress=/[0:0:0:0:0:0:0:1]:9200, remoteAddress=/[0:0:0:0:0:0:0:1]:39604}

이 오류는 Elasticsearch가 보안 기능이 활성화되어 있어서 요청에 대한 인증 자격 증명이 필요하다는 것을 의미합니다. 현재 클러스터 상태 정보를 가져오려는 요청이 인증 없이 시도되었기 때문에 401 Unauthorized 응답이 반환되었습니다.

### 해결 방법:

인증을 통해 Elasticsearch에 접근해야 합니다. 이를 위해 기본 인증, API 키, 또는 Bearer 토큰을 사용할 수 있습니다.ㄴ

#### 1. **기본 인증을 통한 접근**:

- `elastic` 사용자가 생성되었다면, 해당 사용자의 비밀번호를 사용하여 접근할 수 있습니다.
- 명령어 예시:
  ```bash
  curl --cacert ./config/certs/http_ca.crt -u elastic:your_password_here -X GET "https://localhost:9200/_cluster/health?pretty"
  ```
  여기서 `your_password_here`는 `elastic` 사용자에 대한 실제 비밀번호로 교체해야 합니다.

#### 2. **API 키를 사용한 접근**:

- Elasticsearch에서 API 키를 생성한 후, 해당 키를 사용해 인증할 수도 있습니다.
- 명령어 예시:
  ```bash
  curl --cacert ./config/certs/http_ca.crt -H "Authorization: ApiKey YOUR_API_KEY" -X GET "https://localhost:9200/_cluster/health?pretty"
  ```
  여기서 `YOUR_API_KEY`는 생성된 API 키로 교체해야 합니다.

---

### 추가 참고 사항:

- Elasticsearch에서 `elastic` 사용자에 대한 비밀번호가 설정되지 않았거나 잊어버렸다면, 새로운 비밀번호를 설정하거나 다른 인증 방식을 사용할 수 있습니다.
- 인증 설정이 없거나 비활성화된 경우(보안이 필요한 테스트 환경 등), `xpack.security.enabled` 옵션을 `false`로 설정하여 보안을 비활성화할 수 있습니다. 하지만 이는 보안 위험이 있으므로 신중하게 선택해야 합니다.
  Elasticsearch에서 특정 보안 검사를 비활성화하려면, 관련 설정을 `false`로 변경하거나 필요한 경우 비활성화할 수 있습니다. 각 기능에 대한 설정을 아래와 같이 설명하겠습니다.

### 1. **HTTP API 연결의 SSL 암호화 비활성화**

- SSL 암호화를 사용하지 않으려면, `xpack.security.http.ssl.enabled`를 `false`로 설정합니다.
- 설정:
  ```yaml
  xpack.security.http.ssl.enabled: false
  ```

### 2. **클러스터 노드 간 SSL 암호화 비활성화**

- 노드 간 통신에서 SSL 암호화를 비활성화하려면, `xpack.security.transport.ssl.enabled`를 `false`로 설정합니다.
- 설정:
  ```yaml
  xpack.security.transport.ssl.enabled: false
  ```

### 3. **보안 기능 전체 비활성화**

- Elasticsearch의 모든 보안 기능을 비활성화하려면, `xpack.security.enabled`를 `false`로 설정합니다.
- 설정:
  ```yaml
  xpack.security.enabled: false
  ```

### 4. **인증서 검증 비활성화**

- 노드 간 인증서 검증을 비활성화하려면 `verification_mode`를 `none`으로 설정할 수 있습니다.
- 설정:
  ```yaml
  xpack.security.transport.ssl.verification_mode: none
  ```

### 적용 후 작업

이러한 설정 변경 후에는 Elasticsearch를 재시작해야 변경 사항이 적용됩니다. 하지만 보안 기능을 비활성화하면 시스템이 보안 취약점에 노출될 수 있으므로 주의가 필요합니다. 이 설정들은 테스트 환경에서만 사용하는 것이 좋으며, 운영 환경에서는 신중히 검토 후 사용해야 합니다.

analyze token

```[lee@localhost elasticsearch-8.15.0]$ curl --cacert ./config/certs/http_ca.crt -u elastic:$ELASTIC_PASSWORD -X POST "https://localhost:9200/_analyze?pretty" -H 'Content-Type: application/json' -d'
{
  "analyzer": "whitespace",
  "text":     "The quick brown fox."
}
'
{
  "tokens" : [
    {
      "token" : "The",
      "start_offset" : 0,
      "end_offset" : 3,
      "type" : "word",
      "position" : 0
    },
    {
      "token" : "quick",
      "start_offset" : 4,
      "end_offset" : 9,
      "type" : "word",
      "position" : 1
    },
    {
      "token" : "brown",
      "start_offset" : 10,
      "end_offset" : 15,
      "type" : "word",
      "position" : 2
    },
    {
      "token" : "fox.",
      "start_offset" : 16,
      "end_offset" : 20,
      "type" : "word",
      "position" : 3
    }
  ]
}

curl --cacert ./config/certs/http_ca.crt -u elastic:$ELASTIC_PASSWORD -X POST "https://localhost:9200/_analyze?pretty" -H 'Content-Type: application/json' -d'
{
  "tokenizer": "standard",
  "filter":  [ "lowercase", "asciifolding" ],
  "text":      "Is this déja vu?"
}
'

curl --cacert ./config/certs/http_ca.crt -u elastic:$ELASTIC_PASSWORD -X PUT "https://localhost:9200/my-index-000001?pretty" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "analysis": {
      "analyzer": {
        "std_folded": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "asciifolding"
          ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "my_text": {
        "type": "text",
        "analyzer": "std_folded"
      }
    }
  }
}
'
curl --cacert ./config/certs/http_ca.crt -u elastic:$ELASTIC_PASSWORD -X GET "https://localhost:9200/my-index-000001/_analyze?pretty" -H 'Content-Type: application/json' -d'
{
  "analyzer": "std_folded",
  "text":     "Is this déjà vu?"
}
'
curl --cacert ./config/certs/http_ca.crt -u elastic:$ELASTIC_PASSWORD -X GET "https://localhost:9200/my-index-000001/_analyze?pretty" -H 'Content-Type: application/json' -d'
{
  "field": "my_text",
  "text":  "Is this déjà vu?"
}
'
```
