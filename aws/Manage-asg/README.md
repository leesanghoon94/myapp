# Manage AWS Auto Scaling Groups

### Prerequisites

- terraform v1.1+ installed
- aws 계정 && awscliv2

### 개요

- Terraform을 사용하여 Auto Scaling 그룹을 프로비저닝 및 관리
- 조정 정책을 정의
- ASG의 원치 않는 확장을 방지하기 위해 수명 주기 인수를 사용하는 방법

### 수명주기규칙설정

Terraform이 구성의 다른 측면을 변경할 때 인스턴스가 확장,축소되지 않도록 하려면 수명 주기 인수를 사용하여 원하는 용량 및 대상 그룹에 대한 변경 사항을 무시하세요.  
예를들어

```console

Terraform will perform the following actions:

  # aws_autoscaling_group.asg will be updated in-place
  ~ resource "aws_autoscaling_group" "asg" {
      ~ desired_capacity                 = 2 -> 1
        id                               = "asg"
        name                             = "asg"
        # (25 unchanged attributes hidden)

        # (3 unchanged blocks hidden)
    }

Plan: 0 to add, 1 to change, 0 to destroy.
```

Terraform plan 에서 인스턴스를 다시 1로 축소할 것을 제안합니다  
Terraform이 구성의 다른 측면을 변경할 때 인스턴스가 확장되지 않도록 하려면 수명 주기 인수를 사용하여 원하는 용량 및 대상 그룹에 대한 변경 사항을 무시하세요.

```hcl
resource "aws_autoscaling_group" "asg" {
  name = "asg"
  min_size = 1
  max_size = 3
  desired_capacity = 1
  launch_template {
    id = aws_launch_template.name.id
    version = "$Latest"
  }
  vpc_zone_identifier = [module.vpc.private_subnets[0], module.vpc.private_subnets[1]]
  health_check_grace_period = 10
  health_check_type = "ELB"


리소스 블록 에 다음 코드를 추가합니다

  lifecycle {
      ignore_changes = [desired_capacity, target_group_arns]
    }
}
```

### 확장 정책 추가

ASG의 인스턴스 수를 수동으로 확장 할 수 있지만 cloudwatch 지표 경보에 따라 자동 조정할 수 있습니다.

    aws autoscaling set-desired-capacity --auto-scaling-group-name $(terraform output -raw asg_name) --desired-capacity 2

자동 조정 정책 및 Cloud Watch 지표 경보에 대한 다음 구성

**단순 크기 조정**

```hcl
resource "aws_autoscaling_policy" "scale_down" {
  name                   = "terramino_scale_down"
  autoscaling_group_name = aws_autoscaling_group.terramino.name
  adjustment_type        = "ChangeInCapacity"
  scaling_adjustment     = -1
  cooldown               = 120
}

resource "aws_cloudwatch_metric_alarm" "scale_down" {
  alarm_description   = "Monitors CPU utilization for Terramino ASG"
  alarm_actions       = [aws_autoscaling_policy.scale_down.arn]
  alarm_name          = "terramino_scale_down"
  comparison_operator = "LessThanOrEqualToThreshold"
  namespace           = "AWS/EC2"
  metric_name         = "CPUUtilization"
  threshold           = "10"
  evaluation_periods  = "2"
  period              = "120"
  statistic           = "Average"

  dimensions = {
    AutoScalingGroupName = aws_autoscaling_group.terramino.name
  }
}
```

이 정책은 그룹의 EC2 인스턴스가 2분의 2회 연속 평가 기간 동안 10% 미만의 CPU를 사용하는 경우 ASG 멤버를 삭제하도록 Auto Scaling 그룹을 구성합니다. 이러한 유형의 정책을 사용하면 비용을 최적화할 수 있습니다.

---

**대상 추적 크기 조정**

```hcl
resource "aws_autoscaling_policy" "scale_up" {
   name = "scale_up"
   autoscaling_group_name = aws_autoscaling_group.asg.name
   policy_type = "TargetTrackingScaling"

   target_tracking_configuration {
      predefined_metric_specification {
        predefined_metric_type = "ASGAverageCPUUtilization"
      }
     customized_metric_specification {
       namespace = "AWS/EC2"
       metric_name = "CPUUtilization"
       statistic = "Average"
     }

     target_value =10.0
   }
 }

 resource "aws_cloudwatch_metric_alarm" "scale_up" {
   alarm_description = "Monitors CPU utilization for ASG"
   alarm_actions = [aws_autoscaling_policy.scale_up.arn]
   alarm_name = "ACG_scale_up"
   comparison_operator = "GreaterThanOrEqualToThreshold"
   evaluation_periods = 2
   metric_name = "CPUUtilization"
   namespace = "AWS/EC2"
   period              = 10
   statistic           = "Average"
   threshold           = 10
 }
```

이 정책은 Auto Scaling 그룹의 EC2 인스턴스가 2분의 2회 연속 평가 기간 동안 CPU 사용률이 10% 미만이면 Auto Scaling 그룹에서 멤버를 삭제하고, 10%를 초과하면 자동으로 확장하는 대상 추적 크기 조정 정책이다.
