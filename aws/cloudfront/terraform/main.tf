resource "aws_s3_bucket" "b" {
  bucket        = "shitshit1"
  force_destroy = true

}

# resource "aws_s3_bucket_acl" "b_acl" {
#   bucket = aws_s3_bucket.b.id
#   acl    = "private"
# }
# s3버킷 정책을 사용하면 acl를 삭제하라고 에러가뜸 그래서 주석처리해줌

resource "aws_s3_bucket_public_access_block" "name" {
  bucket = aws_s3_bucket.b.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
# // 퍼블릭에세스허용해줌 원래 디폴트값 테라폼 작성 안해도됨

locals {
  s3_origin_id = "shit"
}

resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "shit"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.b.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
    origin_id                = local.s3_origin_id
  }

  enabled = true
  aliases = ["image.53interlude.click"]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }


  price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US", "CA", "GB", "DE", "KR"] #한국을 안넣어주면 접속이 차단된다.
    }
  }

  viewer_certificate {
    acm_certificate_arn      = "arn:aws:acm:us-east-1:992382792232:certificate/7ce4e99a-ee16-4db4-9fdc-d4fe1e12ee40"
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1"
  }

}
# S3 버킷 정책을 업데이트해야 합니다.
# 정책 설명에서 CloudFront 원본 액세스 제어에 대한 읽기 액세스를 허용하여 배포 구성을 완료합니다. 정책을 업데이트하려면 S3 버킷 권한으로 이동하세요.

resource "aws_s3_bucket_policy" "name" {
  bucket = aws_s3_bucket.b.id
  policy = jsonencode({

    "Version" : "2008-10-17",
    "Id" : "PolicyForCloudFrontPrivateContent",
    "Statement" : [
      {
        "Sid" : "AllowCloudFrontServicePrincipal",
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "cloudfront.amazonaws.com"
        },
        "Action" : "s3:GetObject",
        "Resource" : "${aws_s3_bucket.b.arn}/*",
        "Condition" : {
          "StringEquals" : {
            "AWS:SourceArn" : "arn:aws:cloudfront::992382792232:distribution/${aws_cloudfront_distribution.s3_distribution.id}"
          }
        }
      },
      {
        "Sid" : "Statement1",
        "Effect" : "Allow",
        "Principal" : "*",
        "Action" : "s3:*",
        "Resource" : [
          "${aws_s3_bucket.b.arn}/*"

        ]
      }
    ]
  })
}


# 버킷정책
# {
#         "Version": "2008-10-17",
#         "Id": "PolicyForCloudFrontPrivateContent",
#         "Statement": [
#             {
#                 "Sid": "AllowCloudFrontServicePrincipal",
#                 "Effect": "Allow",
#                 "Principal": {
#                     "Service": "cloudfront.amazonaws.com"
#                 },
#                 "Action": "s3:GetObject",
#                 "Resource": "arn:aws:s3:::my-kr-bucket/*",
#                 "Condition": {
#                     "StringEquals": {
#                       "AWS:SourceArn": "arn:aws:cloudfront::992382792232:distribution/E1LHZJFLYBK68C"
#                     }
#                 }
#             }
#         ]
#       }

# 퍼블릭엑세스차단을 비활성화 했음에도 accessDenied가 떠서 추가한 정책
# {
#     "Version": "2008-10-17",
#     "Id": "PolicyForCloudFrontPrivateContent",
#     "Statement": [
#         {
#             "Sid": "AllowCloudFrontServicePrincipal",
#             "Effect": "Allow",
#             "Principal": {
#                 "Service": "cloudfront.amazonaws.com"
#             },
#             "Action": "s3:GetObject",
#             "Resource": "arn:aws:s3:::my-kr-bucket/*",
#             "Condition": {
#                 "StringEquals": {
#                     "AWS:SourceArn": "arn:aws:cloudfront::992382792232:distribution/E13AUYGRG2XCNJ"
#                 }
#             }
#         },
#         {
#             "Sid": "Statement1",
#             "Effect": "Allow",
#             "Principal": "*",
#             "Action": "s3:*",
#             "Resource": [
#                 "arn:aws:s3:::my-kr-bucket",
#                 "arn:aws:s3:::my-kr-bucket/*"
#             ]
#         }
#     ]
# }
