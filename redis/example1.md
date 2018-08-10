# Redis 基本数据结构

- string
- list 
- set
- hash
- zset

### 一、string

##### 1、基本概念

  Redis中的字符串是动态的，采用预分配冗余空间的方式减少内存的频繁分配。也就是当前字符串分配的空间实际上是要大于字符串的长度的。字符串最大的空间是512M。

##### 2、基本操作

```s
  # 创建字符串
  set name xiaoming

  # 读取字符串
  get name

  # 判断字符串是否存在
  exists name

  # 删除字符串
  del name

  # 批量设置
  mset name xiaoming age 20 hobby lol

  # 批量读取
  mget name age hobby
```

##### 3、设置过期时间

```s
  # 比如给我们的name设置一个5秒的过期时间
  expire name 5

  # 我们还可以使用setex 命令（set + expire）
  setex name 5 demo

  # 如果name不存在我们则创建
  setnx name xiaoming
```

##### 4、计数

```s
  # 首先value的值为整数
  set x 1

  # 我们可以进行自增操作 ++
  incr x

  # 也可以进行 +y的操作
  incrby x 10
```

##### 5、应用

  例如我们缓存用户的信息，可以通过JSON序列化转化为字符串，再存入redis中，取出时做一次反序列化即可。

### 二、list

  list是一个链表(linkedlist)，所以它的插入和删除操作非常的快，时间复杂度为O(1)，但是索引定位很慢，时间复杂度为O(n)>

  当list弹出一个元素，数据结构自动被删除，内存自动回收。

##### 1、push和pop操作

  list可以进行push和pop操作，而且它支持左右方向，所以我们很容易通过list实现队列和栈的数据结构。

```s
  # 从左边push
  lpush books js python c

  # 从左边pop
  lpop books

  # 从右边push
  rpush books java

  # 从右边pop
  rpop books
```

##### 2、慢操作

  前面也说了由于list是个链表，查询并不是很高效。

```s
  # 根据下标获取元素
  lindex books 1

  # 根据范围获取元素
  lrange books 2 4

  # ltrim实现一个定长的list
  ltrim books 1 2
```

##### 3、快速链表

  再细究Redis中的列表，我们可以发现它不仅仅是个链表，而是称之为快速链表的结构(quicklist)。

  普通的链表需要的附加指针空间太大，比较浪费空间，而且会加重内存的碎片化。而Redis中的list在元素较少的情况下通过ziplist，也就是使用一块连续的空间存储，当数据较大的时候将多个zipList使用双向指针串起来使用形成quicklist。

##### 4、应用

  列表结构通常用来做异步队列的使用，将需要延后处理的任务结构序列化成字符串塞入Redis的列表，另一个线程从这个列表中轮询数据进行处理。

### 三、hash

##### 1、基本原理

  hash(字典)，内部实现同Java中的HashMap一致。同样采用数组+链表的二维结构，第一维hash的数组位置碰撞时，就会将碰撞的元素通过链表串接起来。

  不同的是，Redis中的hash的值只能为字符串，并且采用渐进式rehash，保留两个新旧hash结构，不断的将旧hash的内容迁移到新的hash结构中。当搬迁结束后，就会用新的hash代替旧的。

##### 2、基本操作

```s
  # 创建hash
  hset student name xiaoming
  
  # 同样支持批量创建
  hmset student age 25 hobby lol

  # 获取全部内容
  hgetall student

  # 获取姓名
  hget student name

  # 增加一岁
  hincrby student age
```

### 四、set

  set(集合)，内部实现相当于一个特殊的字典，只不过它的value都为NULL。

##### 1、基本操作

```s
  # 添加元素
  sadd books js
  sadd books python

  # 查看成员
  smembers books

  # 查看成员是否存在
  sismembber books js

  # 查看集合的长度
  scard books

  # 弹出集合中的元素
  spop books
```

### 五、zset

  zset应该算是Redis中最为特色的数据结构。它一方面是一个set，保证内部value的唯一性；另一方面它可以给每个value赋予一个score，代表这个value的排序权重。它的内部实现是一种叫做跳跃列表的数据结构。

##### 1、基本操作

```s
  # 创建
  zadd books 10 python
  zadd books 2 js
  zadd bokks 8 java
  zadd books 6 c

  # 常看成员数量
  zcard books

  # 默认是升序，查看前4个
  zrange books 0 3 withscores

  # 我们也可以降序
  zrevrange books 0 3

  # 查看单个元素的score
  zscore books js

  # 查看单个元素的排名
  zrank books js
  zrevrank books js

  # 查看分数区间
  zrangebyscore books 3 10 withscores

  # 删除某个元素
  zrem books js
```

##### 2、跳跃列表概述

  在zset中插入一个新的元素，我们需要保证这个zset仍然是有序的，那么我们就需要快速定位，通常我们会通过二分查找找到插入点，而二分查找对于链表是无效的，那么我们改如何定位呢？

  zset内部将元素建立层级，一个元素可能身兼数职，通过随机策略决定一个元素的兼职情况。当我们需要定位时，只需要一级一级查找即可。

##### 六、容器数据结构的通用规则

  对于list、hash、set和zset，

  - create if not exists: 如果容器不存在，则先创建一个，再进行操作。
  - drop if no elements: 如果容器元素没有了，那么立即删除元素，释放内存。

##### 七、过期时间

  Redis中的所有数据结构都可以设置过期时间，但是过期时间都是以对象为单位。比如hash就是针对于整个hash对象，而不是其中某个key。

  对于字符串，如果你通过set再次设置，会去掉过期时间。

```s
  # 设置过期时间
  setex name 20 xiaoming

  # 查看过期时间
  ttl name

  # 再次设置
  set name xiaohong

  # 查看过期时间 已经失效
  ttl name
```