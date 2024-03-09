resource "aws_ecs_cluster" "name" {
  name = "ecs"
  
  depends_on = [aws_iam_role_policy.ecs_service_role_policy]
  
  setting {
    name  = "containerInsights"
    value = "disabled"
  }
  
  lifecycle {
    create_before_destroy = true
  }

  tags = {
    "Name" = "ecs_cluster"
  }
}

resource "aws_launch_template" "name" {
  name_prefix = "ecs_container"
  image_id = data.aws_ami.amazon_linux_2.id
  instance_type = "t2.micro"
  user_data = base64encode(<<-EOF
      #!/bin/bash
      echo ECS_CLUSTER=${aws_ecs_cluster.name.name} >> /etc/ecs/ecs.config;
    EOF
  )
  vpc_security_group_ids = [aws_security_group.ecs_sg.id]

  iam_instance_profile {
    arn = aws_iam_instance_profile.ec2_instance_role_profile.arn
  }
  monitoring {
    enabled = true
  }
  
  tags = {
    "Name" = "ecs_container"
  }
}

resource "aws_autoscaling_group" "name" {
  name = "ecs_asg"
  max_size = 2
  min_size = 1
  vpc_zone_identifier = aws_subnet.private_app.*.id 
  health_check_type = "EC2"
  protect_from_scale_in = true
  
  enabled_metrics = [ 
    "GroupMinSize",
    "GroupMaxSize",
    "GroupDesiredCapacity",
    "GroupInServiceInstances",
    "GroupPendingInstances",
    "GroupStandbyInstances",
    "GroupTerminatingInstances",
    "GroupTotalInstances"
   ]
  
  launch_template {
    id = aws_launch_template.name.id 
  }

  instance_refresh {
    strategy = "Rolling"
  }
  
  lifecycle {
    create_before_destroy = true
  }
  
  tag {
  key                 = "AmazonECSManaged"
  value               = true
  propagate_at_launch = true
  }
}

resource "aws_ecs_cluster_capacity_providers" "name" {
  cluster_name = aws_ecs_cluster.name.name
  capacity_providers = [aws_ecs_capacity_provider.name.name]
  
}

resource "aws_ecs_capacity_provider" "name" {
  name = "my_ecs"
  
  auto_scaling_group_provider {
    auto_scaling_group_arn = aws_autoscaling_group.name.arn
    managed_termination_protection = "ENABLED"
    
    managed_scaling {
      maximum_scaling_step_size = 5
      minimum_scaling_step_size = 1
      status = "ENABLED"
      target_capacity = 100  
    }
  }
}

resource "aws_ecs_service" "name" {
  name = "frontend-svc"
  iam_role = aws_iam_role.ecs_service_role.arn
  depends_on = [ aws_iam_role.ecs_service_role ]
  cluster = aws_ecs_cluster.name.id
  task_definition = aws_ecs_task_definition.front.arn
  desired_count = 2
  deployment_minimum_healthy_percent = "50"
  deployment_maximum_percent = "100"

  ordered_placement_strategy {
    type = "spread"
    field = "attribute:ecs.availability-zone"
  }
  
  ordered_placement_strategy {
    type = "binpack"
    field = "memory"
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.front.arn
    container_name = "front"
    container_port = "80"
  }

  lifecycle {
    ignore_changes = [ desired_count ]
  }
  
}

resource "aws_ecs_task_definition" "front" {
  family = "front_task_definition"
  task_role_arn = aws_iam_role.ecs_task_iam_role.arn
  execution_role_arn = aws_iam_role.ecs_task_iam_role.arn
  
  container_definitions = jsonencode([
    {
      name = "front"
      image = "992382792232.dkr.ecr.ap-northeast-2.amazonaws.com/front:latest"
      cpu = 100
      memory = 256
      essential = true
      portMappings = [
        {
          containerPort = 80
          hostPort      = 0
          protocol      = "tcp"
        }
      ]
    }
  ])

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture = "X86_64"
  }
}

resource "aws_appautoscaling_target" "ecs_target" {
  max_capacity       = 10 
  min_capacity       = 2
  resource_id        = "service/${aws_ecs_cluster.name.name}/${aws_ecs_service.name.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "ecs_cpu_policy" {
  name               = "CPUTargetTrackingScaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_target.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_target.service_namespace

  target_tracking_scaling_policy_configuration {
    target_value = 70

    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
  }
}

resource "aws_appautoscaling_policy" "ecs_memory_policy" {
  name = "MemoryTargetTrackingScaling"
  policy_type = "TargetTrackingScaling"
  resource_id = aws_appautoscaling_target.ecs_target.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
  service_namespace = aws_appautoscaling_target.ecs_target.service_namespace
  target_tracking_scaling_policy_configuration {
    target_value = 80
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }
  }
}