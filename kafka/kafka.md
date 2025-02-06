a brief intro to kafka
Kafka 시스템 간에 데이터를 안전하게 이동하는 메시징 시스템입니다. 각 구성 요소가 어떻게 구성되는지에 따라 실시간 이벤트 추적을 위한 전송 또는 복제된 분산 데이터베이스로 작동할 수 있습니다. 일반적으로 대기열이라고 불리지만, 두 가지 유형의 시스템의 속성과 절충안이 있는 대기열과 데이터베이스 사이에 있다고 말하는 것이 더 정확합니다.
이 문서는 **KafkaJS**라는 라이브러리의 공식 문서 일부로, Kafka 대한 기본 개념과 KafkaJSSC 메시지를 생성하고 소비하는 방법을 설명하고 있습니다. 아래는 주요 내용을 한국어로 해석한 것입니다.

---

### Kafka 간단한 소개
Kafka 데이터를 시스템 간에 안전하게 이동시키는 메시징 시스템입니다. 설정 방법에 따라 실시간 이벤트 추적을 위한 데이터 전송 수단으로 작동하거나 복제된 분산 데이터베이스로 작동할 수 있습니다. 흔히 "큐(queue)"로 불리지만, 실제로는 큐와 데이터베이스의 중간 형태로, 두 시스템의 속성과 절충점을 가지고 있습니다.

---

### 용어집 (Glossary)
- **클러스터(Cluster)**: Kafka 실행되는 머신들의 집합.
- **브로커(Broker)**: 단일 Kafka 인스턴스.
- **토픽(Topic)**: 데이터를 구성하는 단위. 특정 토픽에서만 데이터를 읽거나 씁니다.
- **파티션(Partition)**: 토픽 내 데이터는 여러 파티션으로 분산됩니다. 각 파티션은 시간 순으로 정렬된 로그 파일처럼 동작합니다. 데이터 순서를 보장하려면 한 번에 하나의 소비자만 특정 파티션에서 읽을 수 있습니다.
- **프로듀서(Producer)**: 하나 이상의 Kafka 토픽에 데이터를 쓰는 클라이언트.
- **컨슈머(Consumer)**: 하나 이상의 Kafka 토픽에서 데이터를 읽는 클라이언트.
- **복제본(Replica)**: 파티션은 데이터 손실을 방지하기 위해 하나 이상의 브로커에 복제됩니다.
- **리더(Leader)**: 파티션이 여러 브로커에 복제되었더라도, 특정 브로커가 리더로 선출됩니다. 리더만 해당 파티션에 데이터를 읽고 쓸 수 있습니다.
- **컨슈머 그룹(Consumer Group)**: 그룹 ID로 식별되는 컨슈머 인스턴스들의 집합.
- **오프셋(Offset)**: 파티션 로그에서 특정 지점을 나타냅니다. 컨슈머가 메시지를 소비하면, 해당 오프셋을 "커밋"하여 클러스터에 해당 메시지가 소비되었음을 알립니다.
- **리밸런스(Rebalanced)**: 컨슈머가 그룹에 가입하거나 떠날 때 파티션을 재할당하는 과정.
- **하트비트(Heartbeat)**: 클러스터가 컨슈머의 생존 여부를 확인하는 메커니즘.

---

### 메시지 형식
Kafka 데이터를 "메시지"로 표현하지만, 메시지에는 정해진 형식이 없습니다. Kafka 관점에서 메시지는 단순히 키-값 쌍(key-value pair)이며, 키와 값은 모두 바이트(byte)의 연속입니다. 프로듀서와 컨슈머가 메시지 형식을 정의하고 합의해야 합니다.

#### 1. **Plain-Text JSON**
- JSON은 읽고 쓰기 쉬운 단순한 텍스트 형식입니다.
- 예시 코드:
  ```javascript
  await producer.send({
    topic: 'test-topic',
    messages: [{
      key: 'my-key',
      value: JSON.stringify({ some: 'data' }),
    }]
  });
  ```
- 컨슈머에서 JSON 메시지를 읽는 방법:
  ```javascript
  const eachMessage = async ({ message }) => {
    console.log({
      key: message.key.toString(),
      value: JSON.parse(message.value.toString()),
    });
  };
  ```
- **단점**: JSON은 스키마(schema)를 강제하지 않으므로 데이터 형식이나 필드가 변경될 가능성이 있어 작업이 복잡하고 오류 발생 가능성이 큽니다.

#### 2. **AVRO**
- AVRO 정의된 스키마에 따라 메시지를 이진(binary) 형식으로 직렬화하는 데이터 형식입니다.
- 프로듀서와 컨슈머는 올바른 스키마에 접근해야 하며, 메시지에는 스키마 ID가 포함됩니다.
- Node.js에서는 `confluent-schema-registry` 라이브러리를 자주 사용합니다.

---

KafkaJS는 Kafka 상호작용하기 위한 JavaScript 라이브러리로, 메시지 생성, 소비, 관리 작업을 지원합니다. 이 문서는 Kafka 기본 개념과 KafkaJS에서 데이터를 처리하는 방법을 명확히 설명합니다.

---

client configuration

client 는 적어도 하나의 broker 를 구성되어야만 한다.
brokers 간주된다 seed brokers 그리고 bootstrap client 와 최초의 metadata 불러온다
클라이언트는 적어도 한 명의 브로커로 구성되어야 합니다. 목록의 브로커는 시드 브로커로 간주되며 클라이언트를 부트스트랩하고 초기 메타데이터를 로드하는 데만 사용됩니다.


glossary

Client Id
application 의 논리적 식별자.
애플리케이션의 논리적 식별자. 브로커가 특정 애플리케이션에 할당량을 적용하거나 요청을 추적하는 데 사용할 수 있습니다. 
예: my-client-id.

Kafka 문서는 clientId를 다음과 같이 설명합니다:

클라이언트-id는 클라이언트 애플리케이션이 선택한 의미 있는 이름을 가진 클라이언트의 논리적 그룹화입니다. 튜플(사용자, 클라이언트-id)은 사용자 주체와 클라이언트-id를 모두 공유하는 클라이언트의 안전한 논리 그룹을 정의합니다. 할당량은 (사용자, 클라이언트 아이디), 사용자 또는 클라이언트 아이디 그룹에 적용될 수 있습니다.

그것은 또한 말한다:

Client.id

요청을 할 때 서버에 전달할 ID 문자열. 이것의 목적은 논리적 애플리케이션 이름이 서버 측 요청 로깅에 포함될 수 있도록 함으로써 ip/port 이상의 요청 소스를 추적할 수 있도록 하는 것입니다.

따라서 clientId는 클러스터 또는 수평 스케일링 애플리케이션의 여러 인스턴스에 걸쳐 공유되어야 하지만 각 애플리케이션마다 다릅니다.

Broker discovery

일반적으로 KafkaJS는 브로커 클러스터 토폴로지 변경을 자동으로 알아차리고 반응하지만, 어떤 상황에서는 정적으로 구성된 목록을 사용하는 대신 시드 브로커를 동적으로 가져올 수 있기를 원할 수 있습니다. 이 경우 브로커는 브로커 배열로 해결되는 비동기 함수로 설정할 수 있습니다.

```javascript
const kafka = new Kafka({
  clientId:'my-app',
  brokers: async () => {
      const clusterResponse = await fetch('https://kafka-rest:8082/v3/clusters', {
          headers; 'application/cnd.api-json',
      }).then( response => response.json() )
    const clusterUrl =clusterResponse.data[0].links.self
    
    const brokerResponse = await fetch('${clusterUrl}/brokers', {
        headers: 'application/vnd.api+json',
    }).then(response => response.json())
    
    const brokers = brokersResponse.data.map(broker => {
        const {host,port} = broker.attributesreturn `${host}:${port}`
      return brokers
    })
  }
})
```

이 발견 메커니즘은 초기 브로커 세트(즉, 시드 브로커)를 얻는 데만 사용된다는 점에 유의하십시오. 이 목록의 브로커에 성공적으로 연결한 후, Kafka는 나머지 클러스터를 발견하는 자체 메커니즘을 가지고 있습니다.


---

Kafka 연결 설정
==================  

Kafka를 Docker에서 실행할 때 네트워킹을 설정하는 데 많은 질문과 문제가 발생합니다. 이는 Kafka의 요구사항을 잘 이해하지 못하거나 Docker 네트워킹을 잘 이해하지 못해서 생기는 경우가 많습니다.

이 페이지는 Kafka 네트워킹 설정에 대한 기본 요구사항을 설명하여 초기 문제를 해결하는 데 도움을 주고자 합니다. 이 문서는 Kafka와 Docker 설정에 대한 완전한 가이드는 아닙니다.

Kafka의 요구사항
------------------  

Kafka 네트워킹을 설정하려면 세 가지 주요 요구사항이 있습니다.

1. **각 브로커는 Zookeeper와 통신할 수 있어야 합니다** - 리더 선출 등을 위해 필요합니다.
2. **각 브로커는 다른 모든 브로커와 통신할 수 있어야 합니다** - 복제를 위해 필요합니다.
3. **각 소비자(Consumer)와 프로듀서(Producer)는 모든 브로커와 통신할 수 있어야 합니다** - 데이터를 읽고 쓰기 위해 필요합니다.

다음 다이어그램은 통신 경로를 나타냅니다:

![Kafka communication paths](kafka-communication.png)

즉, 완전한 Kafka 설정을 위해 모든 구성요소는 서로 간에 라우팅이 가능해야 하며, 접근 가능한 포트를 가져야 합니다.

### Docker에서의 Kafka
#### 단일 Kafka 브로커 실행

아래는 단일 Kafka 브로커를 실행하는 가장 간단한 사용 사례입니다.

```yaml
# KAFKA_ADVERTISED_HOST_NAME: localhost
# ZOOKEEPER_CONNECT: zookeeper:2181
docker-compose -f docker-compose-single-broker.yml up -d
```

![Single Kafka Broker](kafka-single-broker.png)

두 개의 컨테이너가 생성되며, 이들은 Docker-Compose가 만든 `kafkadocker_default`라는 브리지 네트워크를 공유합니다. 두 컨테이너의 포트(2181, 9092)는 호스트의 네트워크 인터페이스에 직접 매핑됩니다.

**참고:** Docker-Compose를 사용할 때 모든 컨테이너는 일반적으로 동일한 네트워킹 네임스페이스에서 시작됩니다. 단, 여러 네트워크를 구성할 수도 있지만, 여기서는 간단한 사용 사례만 다룹니다.

이 설정에서는 모든 Kafka 요구사항이 충족됩니다:

1. Kafka 컨테이너는 `kafkadocker_default` 네트워크의 `zookeeper` DNS 엔트리를 통해 Zookeeper와 통신할 수 있습니다.
2. Kafka 컨테이너는 컨테이너의 네트워킹 네임스페이스 내에서 `localhost:9092`를 통해 자신과 통신할 수 있습니다.
3. 소비자와 프로듀서는 `localhost:9092` 주소를 사용하여 Kafka 브로커와 통신할 수 있습니다. 이는 Docker가 포트를 모든 인터페이스(0.0.0.0)에 기본적으로 바인딩하기 때문입니다.

```bash
$ docker ps
CONTAINER ID        IMAGE                      PORTS                                                NAMES
1bf0d78a352c        wurstmeister/zookeeper     22/tcp, 2888/tcp, 3888/tcp, 0.0.0.0:2181->2181/tcp   kafkadocker_zookeeper_1
d0c932301db5        kafkadocker_kafka          0.0.0.0:9092->9092/tcp                               kafkadocker_kafka_1
```

#### 다중 Kafka 브로커 실행

다음은 일반적인 사용 사례인 여러 Kafka 브로커 실행입니다.

```yaml
# KAFKA_ADVERTISED_HOST_NAME: 192.168.1.2
# ZOOKEEPER_CONNECT: zookeeper:2181
docker-compose up -d zookeeper
docker-compose scale kafka=2
```

![Multiple Kafka Brokers](kafka-multi-broker.png)

여기서 중요한 차이점은 `docker-compose.yml` 파일의 `ports`와 `KAFKA_ADVERTISED_HOST_NAME` 환경 변수를 사용하는 것입니다.

```yaml
ports:
  - "9092"
```

이 설정은 Docker가 호스트 인터페이스에 임시 포트를 바인딩하여 컨테이너 포트에 연결합니다.

```bash
$ docker ps
CONTAINER ID        IMAGE                      PORTS                                                NAMES
2c3fe5e651bf        kafkadocker_kafka          0.0.0.0:32000->9092/tcp                              kafkadocker_kafka_2
4e22d3d715ec        kafkadocker_kafka          0.0.0.0:32001->9092/tcp                              kafkadocker_kafka_1
```

#### Kafka 소비자/프로듀서 연결

소비자와 프로듀서는 호스트 인터페이스를 통해 Kafka 컨테이너와 통신합니다. 예:
```bash
kafkacat -b 192.168.1.2:32000,192.168.1.2:32001 -P -t test
kafkacat -b 192.168.1.2:32000,192.168.1.2:32001 -C -t test
```

추가적인 리스너 정보
--------------------  

Kafka는 "내부" 주소와 "광고된" 주소를 구분합니다. 예:

Kafka에는 'advertised(광고된)' 호스트와 포트라는 개념이 있습니다. 이 메커니즘은 노드의 외부(public) 주소(예: DNS 레코드)가 내부 주소와 다를 수 있도록 설계되었습니다. 이는 특히 IP 주소를 미리 알 수 없는 탄력적인 컴퓨팅 환경에서 유용합니다.

### Zookeeper와의 통신
브로커는 시작 시 자신의 설정 정보를 Zookeeper에 등록합니다. 등록된 정보는 다음과 비슷한 형태를 가집니다:

```json
{
  "listener_security_protocol_map": {
    "PLAINTEXT": "PLAINTEXT"
  },
  "endpoints": [
    "PLAINTEXT://one.prod.com:9092"
  ],
  "jmx_port": -1,
  "host": "one.prod.com",
  "timestamp": "1520972878198",
  "port": 9092,
  "version": 4
}
```

### 클라이언트 부트스트랩 프로세스
클라이언트(소비자 또는 프로듀서)가 부트스트랩 과정을 진행할 때, Zookeeper 또는 Kafka(버전과 구현 방식에 따라 다름)에 연결하여 메타데이터 목록을 수신합니다.

이 메타데이터에는 주제(topic) 정보와, 특정 파티션을 담당하는 브로커에 대한 정보가 포함되어 있습니다. 브로커 정보는 `advertised.host.name`과 `advertised.port` 설정에 따라 반환됩니다(해당 설정이 지정된 경우).

#### 메타데이터 예시
아래는 메타데이터의 축약된 예입니다:

```json
{
  "brokers": [ { "id": 1001, "host": "one.prod.com", "port": 9092 } ],
  "topics": {
    "test": [
      { "partition": 0, "leader": 1001, "replicas": [1001, 1002], "isrs": [1001, 1002] },
      { "partition": 1, "leader": 1002, "replicas": [1002, 1003], "isrs": [1002, 1003] },
      { "partition": 2, "leader": 1003, "replicas": [1003, 1001], "isrs": [1003, 1002] }
    ]
  }
}
```

### 다중 포트 지원
Kafka 0.9.0 이후로, 다중 프로토콜(예: PLAINTEXT, SASL, SSL 등)을 지원하고 내부 트래픽과 외부 트래픽을 분리하기 위해 여러 포트를 지정할 수 있게 되었습니다.  
이 변경으로 인해 기존의 `host.name`과 `port` 설정이 `listeners`로 대체되었고, `advertised.host.name`과 `advertised.port` 설정은 `advertised.listeners`로 대체되었습니다.

### 설정 형식 비교
#### 이전(Deprecated) 방식:
```bash
KAFKA_HOST:
KAFKA_PORT: 9092
KAFKA_ADVERTISED_HOST_NAME: one.prod.com
KAFKA_ADVERTISED_PORT: 9092
```

#### 현재(Current) 방식:
```bash
KAFKA_LISTENERS: PLAINTEXT://:9092
KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://one.prod.com:9092
```

### 요약
이전 방식은 `host.name`과 `port`를 개별적으로 지정했지만, 현재는 `listeners`와 `advertised.listeners`를 사용하여 프로토콜과 호스트/포트를 통합적으로 설정합니다. 이를 통해 내부와 외부 트래픽을 더 유연하게 관리할 수 있습니다.