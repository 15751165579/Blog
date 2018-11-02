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