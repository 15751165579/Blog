# 分布式锁

  分布式锁主要用来解决高并发场景下的问题，我们需要保持操作的原子性（所谓原子性是指不会被线程调度机制打断的操作）。

  Redis中我们可以通过setnx来占坑，先来先占，用完了再通过del释放:

```s
  setnx lock:codehole true

  # 处理其他操作

  del lock:codehole
```

  对于这种操作，如果del命令不能正常的执行，那么就会陷入死锁状态。所以为了保证lock:codehole正常的释放掉：

```s
  setnx lock:codehole true

  # 设置过期时间
  expire lock:codehole 5
```

  但是以上操作仍然存在弊端，比如在setnx和expire之间发生了网络异常，那么还是会陷入死锁中，这里我们就需要三方库来实现分布式锁。

  但是Redis2.8引入了set的扩展

```s
  set lock:codehole true ex 5 nx

  # 一顿操作

  del lock:codehole
```

  Redis分布式锁不能解决超时问题。