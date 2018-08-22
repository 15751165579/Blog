# PubSub

  常用的发布订阅模式。

### 消息的多播

  为了支持消息的多播，Redis不能再依赖那5种基本数据类型。

```s
  # 返回的数据结构
  pattern type channel data
```

  采用subscribe和publish命令。

  它的缺点很明显，当有订阅者断线重连是接收不到之前数据的，并且不能够持久化。

  Redis5.0要新增Stream数据结构，基本上这个没有什么作用了。