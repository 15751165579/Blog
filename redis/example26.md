# 延后处理

  虽然Redis是单线程模型，但是它仍然有几个异步线程用来处理耗时的操作。

### del

  删除指令del会直接释放内存，大部分情况下，这个指令会非常的快，没有什么延迟。如果我们需要删除的key是一个非常大的对象，那么删除操作就会导致单线程卡顿。

  Redis4.0中引入unlink指令，通过unlink指令将删除key的操作交给后台线程回收内存。

```s
  unlink key
```

  但也不是所有的unlink操作都会延后处理，如果对应的key占用非常小的内存，那么Redis会立即回收内存，同del指令一样。

### flush

  与del类似的flush命令同样会遇到这样的情况，我们可以:

```s
  flush async
```

### AOF

  Redis每秒需要进行一次AOF同步操作，确保消息不丢失，需要调用sync函数，这个操作如果比较耗时，那么会影响主进程的性能。所以Redis为它开辟了一个独立的异步线程，队列中只要AOF Sync任务。


### 更多延迟删除选项

- slave-lazy-flush 从库接收rdb文件之后的flush操作
- lazyfree-lazy-eviction 内存超过maxmemory时的淘汰操作
- lazyfree-lazy-expire key 过期删除
- lazyfree-lazy-server-del rename指令删除destKey