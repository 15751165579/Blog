# 了解跳跃表

### Reids中哪里用到了跳跃表

  - zset有序集合的底层实现
  - 集群节点内部数据结构的实现

### 跳跃表的实现

  Redis中跳跃表主要由

  - zskiplist用于保存跳跃表信息，比如：表头节点，表尾节点，长度。
  - zskiplistNode用于表示跳跃表节点。

  每个跳跃节点的层高都是1到32之间的随机数。

  同一个跳跃表中，多个节点可以是相同的分值，但是每个节点的成员对象必须是为唯一，但是分值相同时，会比较成员对象的大小。