output "buket_id" {
  value = aws_s3_bucket.b.id
}

output "bucket_arn" {
  value = aws_s3_bucket.b.arn
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.s3_distribution.cloudfront_url
}


