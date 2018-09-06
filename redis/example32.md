# 快速列表

  Redis早起版本中对于列表结构的存储采用如下策略：

  - 元素较少的时候采用ziplist
  - 元素过多时采用linkedlist

  后来考虑到链表附加空间相对太大（prev和next指针的存储，节点内存单独分配，容易造成内存碎片化，影响内存管理效率。），最后改造出quicklist代替ziplist和linkedlist

### quicklist

  quicklist将原先的linkedlist拆分成一小段一小段，这些小的部分采用ziplist存储，然后再通过双向指针连接这些ziplist。为了极致优化，Redis还对ziplist采用LZF算法压缩。

  quicklist默认每个ziplist长度为8K字节，超过这个字节会重新创建一个ziplist，当然这个值是可以配置的:

```s
  # -5: max size: 64 Kb  <-- not recommended for normal workloads
  # -4: max size: 32 Kb  <-- not recommended
  # -3: max size: 16 Kb  <-- probably not recommended
  # -2: max size: 8 Kb   <-- good
  # -1: max size: 4 Kb   <-- good...
  list-max-ziplist-size -2
```

  quicklist默认压缩深度是0，也就是不压缩。压缩指标可以通过改参数配置：

```s
  list-compress-depth
```

  为了支持快速的push/pop操作，首尾两个ziplist是不压缩的，此时深度就是1，如果深度为2，那么就是首尾4个ziplist不进行压缩。


- [ziplist、linkedlist和quicklist对比](https://matt.sh/redis-quicklist)

