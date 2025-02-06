for_each

값이 map,set 으로 구성된 argument 에 대한 처리가 필요한 경우에 사용

```hcl
resource "aws_iam_user" "accounts" {
  for_each = toset( ["one","two","three"] )
  name = each.key
}
```
