### Sentinel

  前面说了Redis的主从同步，那么问题来了，如果主节点挂了怎么办？傻傻的等待运维换一个节点，然后程序才改为新的节点？

  接下来就是Sentinel表现的机会了。

### 简介

  Sentinel是集群的心脏，当主节点挂掉之后，会寻找一个可用的从节点作为主节点。从而保证系统高可用性。

  但是Sentinel无法保证数据不丢失，因为当主节点挂掉之后，可能从节点还没来得及同步数据，如果主节点延迟很高，那么丢失的数据就越多，所以这里我们可以限制主节点的延迟过高：

```s
  # 这个参数表示主节点必须至少有一个从节点进行正常的复制，否则停止服务。
  min-slaves-to-wrrite 1
  # 如果10s 没有收到从节点的反馈，则为异常复制
  min-slaves-max-log 10
```

### 主从设置

  需要配置Redis配置文件

```s
  slaveof 127.0.0.1 3010 # 在从节点中设置一个主节点
```

  实际上这里已经开始读写分离，从节点负责读，主节点负责写。

  查看从属关系
```s
  redis-cli -p 3010 INFO replication
```

### 配置sentinel

  实际上就是每一个节点都通过一个sentinel来监察。查看当前监察的节点：

```s
  redis-cli -p 26379 INFO sentinel
```

### 实践

  这里我们采用一个主Redis和两个从Redis，那么我们需要三个Sentinel监听这三个Redis。

```s
  # 其中一个Sentinel的配置
  protected-mode no
  logfile "/usr/local/etc/sentinel-26379.log"
  port 26379
  sentinel myid c573094e9c7b046037028643795dd25de7f4a325
  sentinel monitor mymaster 127.0.0.1 3010 2 # 3010则是我们主Redis 判断失效至少需要两个sentinel的确认
  sentinel parallel-syncs mymaster 1 # 执行故障转移时，最多可以有多少个Redis实例同步新的实例 在从Redis实例较多的情况下，数字越小那么同步的时间越长，完成故障转移所需的时间就越长
  sentinel down-after-milliseconds mymaster 5000 # 该选项指定Sentinel认为Redis实例失效所需要的毫秒数
```

  对于Redis实例失效分为主观下线和客观下线：

  - 主观下线，单个Sentinel判断Redis下线
  - 客观下线，多个Sentinel判断Redis下线