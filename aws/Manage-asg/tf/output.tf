output "lb_endpoint" {
  value = "http://${aws_lb.name.dns_name}"
}   

output "application_endpoint" {
  value = "http://${aws_lb.name.dns_name}/index.php"
}

output "asg_name" {
  value = aws_autoscaling_group.asg.name
}