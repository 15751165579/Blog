# CentOS7下安装mysql

### 下载mysql

```s
  wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
  sudo rpm -ivh mysql-community-release-el7-5.noarch.rpm
```

### 安装mysql-server

```s
  sudo yum install mysql-server
```

### mysql的命令使用

```s
  # 启动mysql
  sudo systemctl satrt mysqld

  # 关闭mysql
  sudo systemctl stop mysqld

  # 重启mysql
  sudo systemctl restart mysqld

  # 查看mysql是不是在运行
  ps aux | grep mysql
```

### 遇到的问题

  在安装的过程中，发现默认安装完毕之后，数据库默认的不是UTF8，这则会导致中文乱码，我们需要修改配置：

```s
  # 打开配置文件
  vi /etc/my.cnf

  # 文件中需要添加的内容
  [client]
  default-character-set = utf8
  [mysqld]
  user=mysql
  character-set-server=utf8
  init_connect='SET NAMES utf8'
  [mysql]
  no-auto-rehash
  default-character-set=utf8
```

  然后重启mysql服务之后，再创建数据库时，并会默认UTF8格式，这时你可以查看数据库的默认格式：

```s
  mysql -u root -p

  # 显示数据库默认的格式
  mysql > show variables like 'character%'
```

  同时你可以删除之前创建的数据库:

```s
  mysql > drop database <databasename>
```