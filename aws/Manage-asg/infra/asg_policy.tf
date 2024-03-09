resource "aws_autoscaling_policy" "scale_down" {
  name                   = "acg_scale_down"
  autoscaling_group_name = aws_autoscaling_group.asg.name
  adjustment_type        = "ChangeInCapacity"
  scaling_adjustment     = -1
  cooldown               = 120
}

resource "aws_cloudwatch_metric_alarm" "scale_down" {
  alarm_description   = "Monitors CPU utilization for Terramino ASG"
  alarm_actions       = [aws_autoscaling_policy.scale_down.arn]
  alarm_name          = "acg_scale_down"
  comparison_operator = "LessThanOrEqualToThreshold"
  namespace           = "AWS/EC2"
  metric_name         = "CPUUtilization"
  threshold           = "10"
  evaluation_periods  = "2"
  period              = "120"
  statistic           = "Average"

  dimensions = {
    AutoScalingGroupName = aws_autoscaling_group.asg.name
  }
}

# resource "aws_autoscaling_policy" "scale_up" {
#   name = "scale_up"
#   autoscaling_group_name = aws_autoscaling_group.asg.name
#   policy_type = "TargetTrackingScaling"
  
#   target_tracking_configuration {
#     # predefined_metric_specification {
#     #   predefined_metric_type = "ASGAverageCPUUtilization"
#     # }
#     customized_metric_specification {
#       namespace = "AWS/EC2"
#       metric_name = "CPUUtilization"
#       statistic = "Maximum"  
#     }
    
#     target_value =10.0
#   }
# }

# resource "aws_cloudwatch_metric_alarm" "scale_up" {
#   alarm_description = "Monitors CPU utilization for ASG"
#   alarm_actions = [aws_autoscaling_policy.scale_up.arn]
#   alarm_name = "ACG_scale_up"
#   comparison_operator = "GreaterThanOrEqualToThreshold"
#   evaluation_periods = 2
#   metric_name = "CPUUtilization"
#   namespace = "AWS/EC2"
#   period              = 10
#   statistic           = "Maximum"
#   threshold           = 10
# }