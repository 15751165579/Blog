# RedisCluster

  RedisCluster是Redis作者提供的集群解决方案。

### 与Codis的异处

  - 它是去中心化的，每个节点都负责整个集群的一部分数据。
  - 相比较Coids，RedisCluster对于槽位的划分更加精确，分为16384个槽位，每个节点负责其中一部分的槽位，并且槽位的信息存储在节点内部，这样就不需要分布式存储槽位的信息。
  - Coids是通过代理来定位节点，而RedisCluster是直接定位节点。
  - RedisCluster的每个节点都会将集群的配置信息持久化到配置文件中。

### 槽位定位算法

  这个和Codis还是很相似的，少许不同：

  - 采用CRC16检错算法
  - 可以强制某个Key挂载在具体的槽位上

  当客户端发送了一个错误节点的操作命令，则会返回一条携带正确地址的错误信息。

### 迁移

  RedisCluster提供了redis-trib手动调整槽位的分配，当一个槽位正在迁移，那么状态就为Migrating, 处理迁移中则是importing。