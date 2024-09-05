# 파일을 무효화하여 콘텐츠 제거

cloud front s3을 오리진 도메인으로 배포하고 route 53 레코드 등록후
s3버킷에 올린 이미지를 캐시 상태로 만들고 이미지를 무효화 시키고 새로운 이미지를 받아볼수있도록 해보기
s3만들때

> 모든 퍼블릭 엑세스 차단 해제
> 모든 퍼블릭 엑세스 차단을 비활성화하면 이 버킷과 그 안에 포함된 객체가 퍼블릭 상태가 될 수 있습니다.
> 정적 웹사이트 호스팅과 같은 구체적으로 확인된 사용 사례에서 퍼블릭 엑세스가 필요한 경우가 아니면 모든 퍼블릭 엑세스 차단을 활성화하는 것이 좋습니다.
> 현재 설정으로 인해 이 버킷과 그 안에 포함딘 객체가 퍼블릭 상태가 될 수 있음을 알고 있습니다.

![이미지1](./image/스크린샷%202024-09-04%20오후%207.22.52.png)
![이미지2](./image/스크린샷%202024-09-04%20오후%207.23.22.png)
s3에 이미지를 없로드하고 hit from cloudfront된걸확인후 이미지 삭제해준다
![](./image/스크린샷%202024-09-04%20오후%207.24.29.png)
다시 이미지를 올려줘도 캐시된 이미지를 보여줄때
유저가 웹브라우저로 url 요청시 캐시된 기존 contents 캐시 무효화하고 갱신된 contents를 받아볼수있도록 해보기

![](./image/스크린샷%202024-09-04%20오후%207.25.44.png)
다시업로드한 사진을 받아오는걸확인

cloudFront에 whitelist 만들어보기

```hcl
restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US", "CA", "GB", "DE", "KR"] #한국을 안넣어주면 접속이 차단된다.
    }
  }
```

지역제한을 걸어버리면 지역이 포함되지않으면 블랙리스트가되어 접속이안됨
![](./image/스크린샷%202024-09-05%20오전%2012.45.16.png)
"KR" 넣어주면 문제 해결

> 참고
>
> [퍼블릭에세스허용에도 엑세스디나이날때](https://dev.classmethod.jp/articles/if-access-denied-appears-even-though-you-disabled-public-access-blocking-on-amazon-s3-what-is-the-workaround/)
>
> [aws cloudfront doc](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html)

```

```
