# Redis服务器基础

### 数据库的切换

  在Redis服务器中，通过redisServer对象的dbnum属性记录数据库的个数（默认是16个），然后将各个数据库存储在db字段中。

  通过改变redisClient对象中的db字段的指向，达到切换数据库的效果：

```s
  # 切换到第二个数据库
  select 2
```

### 键空间与过期时间

  Redis所有的key都保存在键空间dict上，对于过期时间则是保存在expires上。

  当Redis操作具体键时，还会进行一些附加操作，如：计算键空间的命中次数和未命中次数、计算LRU、处理过期key等。

### 过期key处理策略

  Redis中一共有三种过期key处理策略：

  - 定时删除策略：设置一个过期key的同时创建一个定时器删除该key，这种方式对内存非常友好，但是遇到大规模请求或者是大规模过期key时，则会影响服务器的响应和吞吐量。
  - 惰性删除策略：当访问一个key时，检查它是否过期，再决定是否删除。这种方式对于CPU时间是友好的，但是如果存在过期key一直没有被删除，则会浪费大量的内存，造成内存泄漏。
  - 定期删除策略：综合上述两种策略的优劣点，控制处理的key的数量和频率。

### 过期key的影响

  下面了解一下过期key对于三种场景的影响：

  - RDB: 在执行保存RDB操作时，不会将过期key存入，当Redis重新载入RDB时，也会过滤掉过期Key。
  - AOF: 对于AOF文件处理过期Key，实际就是增加一条del命令。
  - 主从复制： 对于主服务器会处理过期key，并且将del命令发给从服务器。对于从服务器不会主动的删除过期key，只有接受到主服务器的del命令才会删除过期key