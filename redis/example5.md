# HyperLogLog

 对于普通的PV数据，可以通过一个独立的Redis计数器就可以实现。而对于UV数据，需要进行去重处理，大部分人可能想到set的处理方式，对于数据达到一定的级别时，set占用的空间过高。而对于这些统计数据并不需要特别的精确（ 0.277%），那么可以采用HyperLogLog。

### pfadd和pfcount

```s
  pfadd data user1 user2 user3

  pfcount data // 3
```

### pfmerge

  采用HyperLogLog记录我们的UV数据时，如果突然要求将几个页面数据合并，那么我们就可以通过pfmerge完成这一需求。

### 原理

  HyperLogLog不适用于存储单个用户的相关数据，因为它需要占据12K的内存空间，但是相对于set的话又非常的便宜。

  Redis内部也进行了相应的优化，在数据很小的时候，采用稀疏矩阵。当数据超过阈值时，才会转化为稠密矩阵占据12K内存。

  为什么是12K？

  HyperLogLog中使用了2^14个桶，每个桶的maxbits需要6个bits来存储。

  那么就是 2^14 * 6 / 8 = 12K 字节。