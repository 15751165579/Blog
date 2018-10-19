# 日志管理

### 一、错误日志

  错误日志是默认开启的，它不仅仅记录错误信息，还记录一些事件：

  - 服务器启动和关闭过程中的信息
  - 事件调度器运行一个事件产生的信息
  - （从服务器）启动从服务器进程时产生的信息

  查看错误日志路径:

```s
  show variables like 'log_error%'
```

  也可以在配置文件中设置：

```s
  # 错误日志文件名设置
  log-error='custom-error-filenamee.log'
```

### 二、查询日志

  查询日志默认是关闭的，它的开启会增加磁盘的IO，建议只在开发环境下开启。

  查询日志路径：

```s
  show variables like 'general_log%'
```

  控制台开启操作：

```s
  set global_log=on
```

  配置文件修改：

```s
  log-output=FILE
  general-log=1
  general_log_file="custon-general.log"
```

### 三、慢查询日志

  慢查询是指执行时长（包括CPU、IO）超过long_query_time这个变量定义的时长的查询, 开销相对较小，建议开启

  查看慢查询日志路径：

```s
  show variables like 'slow_query_log%'
```

  配置文件:

```s
  log-output=FILE
  slow_query_log=1 
  slow_query_log_file="custom-slow.log"
  long_query_time=0.010 # 单位秒
```

### 四、二进制日志

  记录数据库中所有的更新操作(DDL DML),不含查询语句

  查看相关参数

```s  
  show variables like 'log_bin%'
```

  配置文件更改：

```s
  # 指定集群的唯一编号
  server-id=123454
  log-bin="custom-bin"
```

### 五、事务日志

  事务处理，不需要手动干扰。

### 六、中继日志

  服务器主从处理。
