# Info

  info指令帮助我们诊断Redis运行的状态。

### 使用

```s
  # 获取所有信息
  info

  # 获取内存相关的信息
  info memory

  # 从节点相关信息
  info replication
```

  Redis每秒执行的指令：

```s
  redis-cli info stats | grep ops
```

  Redis当前连接了多少个客户端：

```s
  redis-cli info clients
```

  查看被拒绝连接的客户端，这也是一个非常重要的指标，意味着我们需要调整maxclients来调整:

```s
  redis-cli info stats | grep reject
```

  通过info指令我们可以对内存的大小很好的管理，例如主从复制中复制积压缓冲区大小非常的重要，它影响了主从复制的效率

```s
  redis-cli info replication | grep backlog
```

  前面我们知道增量同步时一个环形的buffer数组，如果在网络分区时间过长的情况下，可能导致增量同步失败，这时就需要进行快照同步，所以这里的复制积压缓冲区的大小影响很大。

  通过以下指令可以发现主从在增量同步的情况：

```s
  redis-cli info stats | grep sync
```