# 对象

### 概念

  首先要明白Redis中的数据结构与对象的区别。

  在Redis中有五大基本对象：

  - 字符串
  - 列表
  - 字典
  - 集合
  - 有序集合

  而数据结构正如前面所学到的：动态字符串（SDS），压缩列表(ziplist)，跳跃表(skiplist)等。


### 字符串（string）

  对于字符串对象会采用三种数据结构实现：

  - 可以用long类型表示的整数采用 int
  - 其他情况采用 raw 或者 embstr

  这里的embstr主要是用于小字符串的优化，与raw的主要区别就在与同时为redisObject和SDS申请一块连续的内存，这样相比raw可以在申请和释放内存操作上省时。

  而且embstr是一个只读的状态，当采用append操作，它必然会改变成raw数据结构。

### 列表(list)

  列表对象底层实现有两种数据结构，ziplist和linkedlist，采用ziplist实现的条件：

  - 所有元素的大小小于64个字节
  - 列表中元素的数量小于512

### 字典(hash)

  字典对象底层实现也是采用两种数据结构：ziplist和hashtable，采用ziplist实现的条件：

  - 所有元素的大小小于64个字节
  - 列表中元素的个数小于512

### 集合(set)

  集合对象的底层实现也是采用两种数据结构：intset和hashtable，采用inset实现的条件：

  - 所有元素的类型为整数
  - 元素个数小于512

### 有序集合(zset)

  有序集合底层采用ziplist或者skiplist实现，采用ziplist实现的条件：

  - 所有元素的大小小于64个字节
  - 元素的总数小于128


### 类型检查与命令多态

  Redis中的命令有两类，一种对于任何类型都能执行，还有一种时针对具体的类型。

  对于具体的类型命令则需要通过redisObject上的type确定是否为有效的类型，才能执行下一步。

  而多态命令能需要分析具体的数据结构，调用相应的方法。

### 内存回收

  C语言不支持内存回收，所以Redis中采用引用计数的方式实现内存的回收。

### 共享对象

  Redis中只对整数进行内存共享，主要考虑到验证操作的复杂性带来的内存消耗。

### 对象的空转时长

  前面提到redisObject中还有一个lru字段，通过当前时间减去lru时间就可以得到对象的空转时间。

```s
  OBJECT IDLETIME key
```

  如果该键值对被访问则空转时间为0。
