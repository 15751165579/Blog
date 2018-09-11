# 新的淘汰策略LFU

### 前言

  前面我们谈到Redis中的淘汰策略，其中LRU就是根据key最近是否被访问过来确定该key是否为热key。Redis4.0中作者找到了一种比LRU效率更高的策略 -- LFU(Redis4.0)

### Redis 对象的热度

  Redis中所有的对象结构头中都有24bit的字段来记录对象的【热度】

```s
  unsigned lru:24
```

### LRU模式

  在LRU模式下，lru字段存储的是Redis时钟server.lruclock，Redis时钟是一个24bit的整数，默认是Unix时间戳对2^24取模的结果，当一个key被访问一次，那么它的对象头中的lru将被更新为server.lruclock。

  默认Redis时钟值每毫秒更新一下，在定时任务serverCron中设置。(其他的定时任务： hash表的渐进式迁移、过期key的淘汰等)

  根据对象头中的lru和server.lruclock对比，就可以计算出key的空闲时间。

### LFU模式

  在LFU模式下，lru字段24bit存储两个字段，ldt和logc

  - logc（8bit）用来存储key被访问的次数，显然8bit是不够用的。所以它存储的是频次的对数值，并且这个值还会随着时间衰减，如果它的值比较小，那么就很容易回收。为了确保新创建的对象不被回收，会给一个默认值：LFU_INIT_VAL = 5

  - ldt（16bit），用于存储上一次logc更新的时间，当时它与前面的LRU模式相比存储的时间精度比较低。ldt字段不是在对象被访问时更新的，而是在执行淘汰策略时更新的。

  idt的更新同时会衰减logc的值，衰减也采用特定的算法，我们可以调节一下参数控制衰减的速率：

```s
  lfu_decay_time: 1 # 该参数大于1，那么衰减的就比较慢。
```

  logc是在key被访问的时候更新的，只不过它不是简单的+1，前面提到它是存储对数的，所以这里采用概率递增。

### Redis为什么要缓存时间

  获取时间的操作是相对比较耗时的，单线程的Redis考虑到性能的问题，对时间进行缓存，从缓存中获取时间。

### Redis中获取时间戳为什么要原子操作

  首先Redis并不是真正意义上的单线程，还有几个异步线程也需要访问Redis的时钟，使用atomic读写能够保证多线程lruclock数据的一致性。

### 如何使用LFU模式

  首先设置：

```s
  maxmemory-policy: volatile-lfu | allkeys-lfu
```

  接下来你可以通过object freq 查询对象的lfu计数值。