# 哨兵（Sentinel）

### Sentinel的创建

  和Redis服务器一样，Sentinel也有自己的配置文件，可以通过以下两种方式启动：

```s
  redis-sentinel <sentinel.conf pathname>

  redis-server <sentinel.conf pathname> --sentinel
```

  启动sentinel的过程：

  - 1）初始化服务器
  - 2）将普通的Redis服务器的命令集换成sentinel专属集（sentinel本质上和普通的Redis服务器一样）
  - 3）初始化Sentinel
  - 4）根据配置文件设置Sentinel中的masters
  - 5）创建连向主服务器的网络连接

### 连接主服务器的网络连接

  当Sentinel会创建两个网络连接：

  - 命令连接：向主服务器发送命令，并接收命令的回复。
  - 订阅连接：这个连接专门用来订阅__sentinel__:hello频道。

  在Redis的发布和订阅功能中，被发送的消息是不会被保存在Redis服务器中的，为了不丢失信息，必须用一个订阅连接接收改频道的消息。

### 获取主从服务器信息

  Sentinel默认没10秒执行一次INFO命令，获取主服务器的信息。

  也正是由此可以获取从服务器的信息，更新Sentinel中的slaves字段。

  其中Sentinel中从服务器实例的name属性是由ip地址和端口设置的，而主服务器实例的名称则可以通过配置文件中设置。

### 客观下线和主观下线

  在默认的情况下。Sentinel会每秒钟向所有创建命令连接的实例（主服务器，从服务器和其它的Sentinel）发送PING命令，从而判断是否下线。

```s
  sentinel down-after-milliseconds master 50000
```

  这里的500000毫秒就是Sentinel判断master主观下线的标准。

  前面说到多个Sentinel可以保护一个主服务器，那么它们对于该属性的设置不一致，那么到底采用谁的主观下线呢？

  这里就要引出一个客观下线的概念，当一个Sentinel判断主观下线之后，需要不断询问其它的Sentinel的状态，如果有足够数量的Sentinel判断该主服务器主观下线，那么就进行故障转移操作。

  通过这个quorum参数设置一个足够的数量：

```s
  sentinel monitor master 127.0.0.1 6379 2
```

  上述就设置了该Sentinel如果再发现了个Sentinel判断主观下线，那么客观下线的条件就满足了。

  当然都个Sentinel对于该属性的设置也可能不一致，那么就需要选举一个领头Sentinel来执行故障转移操作。


### 故障转移

  进行故障转移的步骤：

  - 1）在众多的从服务器中选出一个作为新的主服务器，向该服务器发送slave no one
  - 2）让其它的从服务器重新从属于该主服务器
  - 3）当之前的主服务器重新上线之后，会变成新的从服务器

