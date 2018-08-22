# 事务

  为了保证连续多个操作的原子性，一般数据库都提供事务处理，而Redis中提供的事务处理没有那么的复杂，用起来比较的简单，所以我们不能像使用关系型数据库的事务一样使用Redis。

### 使用

  事务一般都是由begin、commit和rollback组成。Redis中相对应的是multi、exec和discard。

```s
  # 一个事务的流程
  multi # => OK

  set age 0 # => queued

  incrby age 1 # => queued

  incrby age 10 # => queued

  exec
```

  在执行exec命令之前，所有的指令不会执行，而是放入到Redis的事务队列中，一旦执行exec，则会执行队列中的指令，最后将结果一起返回。因为Redis是单线程，所以当它在执行队列中的指令时是不会被打断的。

  其实从以上的原理，实际上当中间一条指令发生错误时，后续指令还是会执行的，所以它不能算作是真正意义上的原子性，仅仅满足事务的隔离性。

  而discard指令只是用来清除它与multi之间注册的指令。

### 优化

  Redis事务在发送每个指令到事务缓存队列时都要经过一次网络读写，当指令比较多的时候，需要的网络IO的时间也会增长。所以Redis客户端执行事务时都会结合pipeline一起使用，这样将多次IO操作压缩成单次IO操作。


### 高并发的几种解决方案

  - incr incrby
  - 分布式锁 set lock:age true ex 5 nx + del lock:age
  - watch + multi 这种方式在测试的情况下会出现问题