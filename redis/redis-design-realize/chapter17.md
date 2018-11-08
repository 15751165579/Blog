# 发布订阅

### 一

  服务器状态在pubsub_channels字典中存储所有频道的订阅关系，通过SUBSCRIBE和UNSUBSCRIBE命令完成订阅和退订的功能。

  服务器状态在pubsub_patterns链表中保存所有模式的订阅，PSUBSCRIBE和PUNSUBSCRIBE名称完成模式的订阅和退订的功能。

### 二

  PUBLISH命令实际上就是扫描pubsub_channels和pubsub_patterns来完成所有订阅频道的消息发送。