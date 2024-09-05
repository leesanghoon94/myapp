### cloud trails 설정 밑 amazon athena 쿼리

aws 에서 운영시 필요한 로깅들
aws cloudtrail -> audit log
amazon vpc -> flow log
elastic load balancing -> access log

중에 cloudTrail을 사용하여 aws 계정 내에서의 api 호출을 기록
s3에 저장후 athena 쿼리 서비스로 로그 조회를 할 수 있다.

1. cloudtaril 추적 생성
2. s3에서 쿼리 위치를 설정
3. athena 테이블 생성

aws 운영시 필요한 로깅을 활성화 해보고, 로그쿼리툴을 이용하여 조회해본다

```hcl
resource "aws_cloudtrail" "example" {
  name                          = "example-trail"
  s3_bucket_name                = "my-log-bucket"
  enable_logging                = true
  include_global_service_events = true
}
```

**Amazon Athena를 통한 로그 쿼리**

S3에 저장된 로그를 Athena를 사용하여 SQL 쿼리로 분석합니다.

- S3 버킷에 저장된 로그의 위치를 Athena에 설정합니다.
- Athena에서 테이블을 생성하여 쿼리할 수 있도록 합니다.

  ```sql
  SELECT
  useridentity.arn,
  eventname,
  sourceipaddress,
  eventtime
  FROM cloudtrail_logs
  LIMIT 100;
  ```

````

### 문제해결

│ Error: creating CloudTrail Trail (example): operation error CloudTrail: CreateTrail, https response error StatusCode: 400, RequestID: d8954340-5237-4c6d-800f-e6eac830df2c, InsufficientS3BucketPolicyException: Incorrect S3 bucket policy is detected for bucket: tf-test-trail-11
│
│ with aws_cloudtrail.example,
│ on main.tf line 1, in resource "aws_cloudtrail" "example":
│ 1: resource "aws_cloudtrail" "example" {

---

S3 잘못된 버킷 정책이 연결되었다.
새로운 정책
버킷의 access control list 권한 부여
cloudTrail이 S3에 로그를 기록할수 있는 권한부여

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AWSCloudTrailAclCheck",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudtrail.amazonaws.com"
      },
      "Action": "s3:GetBucketAcl",
      "Resource": "arn:aws:s3:::버켓이름",
      "Condition": {
        "StringEquals": {
          "aws:SourceArn": "arn:aws:cloudtrail:ap-northeast-2:어카운트id:trail/example"
        }
      }
    },
    {
      "Sid": "AWSCloudTrailWrite",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudtrail.amazonaws.com"
      },
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3::버켓이름/prefix/AWSLogs/어카운트id/*",
      "Condition": {
        "StringEquals": {
          "s3:x-amz-acl": "bucket-owner-full-control",
          "aws:SourceArn": "arn:aws:cloudtrail:region:accountid:trail/example"
        }
      }
    }
  ]
}
````

### 참고자료

- [Athena 쿼리 예제 - CloudTrail 로그](https://docs.aws.amazon.com/ko_kr/athena/latest/ug/query-examples-cloudtrail-logs.html)
- [s3 버킷 정책 예제](https://docs.aws.amazon.com/ko_kr/awscloudtrail/latest/userguide/create-s3-bucket-policy-for-cloudtrail.html#troubleshooting-s3-bucket-policy)
