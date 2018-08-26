# 开源节流 小对象压缩

  Redis是一个非常耗费内存的数据库，所以在使用的时候，我们需要注意节约内存，避免Redis因为出现内存不足而崩溃的情况。

### 小对象压缩ziplist

  如果Redis内部管理的集合数据很小，那么它就会采用紧凑存储形式压缩存储。

  Redis中的ziplist是一个紧凑的字节数据结构

```s
  hset demo a 1
  
  hset demo b 2

  hset demo c 3

  # 这里我们可以查看demo数据结构
  object encoding demo 

  # 'ziplist'
```

  zplist的大概样子:(主要作用与 hash 与 zset)

```JavaScript

  zlbytes zltail zllen entry entry .... zlend

  // zlbytes 记录整个压缩列表占用的字节数
  // zltail 记录最后一个entry的偏移量，便于直接定位最后的元素
  // zllen 记录entry的数量
  // entry: 如果采用的是hash结构，那么key和value就会作为两个entry相邻存储
  // zlend 用于标记一个字节结束
```

  除了ziplist还有两种紧凑数组结构： intset 和 hashtable

```s
  # 全部为整数时，采用intset
  sadd demo 1 2 3 4

  object encoding demo

  # intset
```

```JavaScript
  // 结构
  encoding length value value value ....
```

  encoding表示intset使用的位宽，如果整数可以通过uint16表示，那么encoding就是16。Redis支持set动态从uint16升级到uint32，再升级到uint64。

```s
  # 存在字符串时，则使用hashtable

  sadd demo str

  object encoding demo

  # hashtable
```

  当然Redis中自然时规定了小对象存储的限制条件。

### 内存管理

  Redis并不总是将空闲内存归还给操作系统。

  操作系统对于内存的回收是以页为单位的，所以当我们删除一个1G的zset，也许它分布在多个页上，而这些页上还存在其它的数据，那么操作系统并不会去回收这些页。

  当然我们可以采用flushdb删除所有的Key。

  所以内存管理是个非常复杂的活，Redis采用了Facebook的jemalloc

```s
  # 查看内存使用情况
  info memory
```
