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