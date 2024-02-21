resource "aws_db_instance" "mydb" {
  allocated_storage = 10
  db_name = "mydb"
  engine = "mysql"
  engine_version = "8.0"
  instance_class = "db.t3.micro"
  username = "root"
  password = "12345678"
  parameter_group_name = "rds-pg"
  skip_final_snapshot = true
}

resource "aws_db_parameter_group" "default" {
  name = "rds-pg"
  family = "mysql8.0"
  parameter {
    name = "character_set_server"
    value = "utf8"
  }
  parameter {
    name = "character_set_client"
    value = "utf8"
  }
}