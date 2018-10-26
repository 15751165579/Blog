# 字符串

### 前言

  Redis中的字符串的知识点：

  - 字符串的存储结构。
  - 与C字符串的区别：长度获取，内存分配和二进制安全。
  - 基本API的使用。

### Redis的存储结构

  Redis中字符串采用SDS（Simple Dynamic String）存储结构：

```c
  struct sdshdr {
    int len; // 字符串的长度
    int free; // 空闲区域的长度
    char buf[]; // 实际存储字符串的地方
  }
```

  采用Redis中的string采用和C语言字符串同样的'\0'结尾，这样便于直接调用部分C语言的方法。（'\0'对于开发者是透明的）

### 长度时间复杂度

  在C语言中获取字符串的长度需要遍历一次字符串，从而需要耗费O(n)的时间，而在Redis中对于性能的要求非常高，而对于获取字符串长度这种频繁的操作需要更短的时间，Redis中通过len记录字符串的长度，从而将时间复杂度由O(n)降低为O(1)。


### 内存分配的优化

  在C语言中，对于字符串更新操作之前，需要进行内存分配，不然会造成缓冲区溢出，从而对字符串造成影响，这也意味着，进行N次字符串更新操作，那么就需要进行N次内存分配。

  - 当向字符串添加内容时，没有正确的分配内存，就会造成缓冲区溢出。
  - 当部分字符串删除时，没有及时进行内存释放，就会造成内存泄漏。

  频繁内存分配操作的代价也是非常大的，从而Redis设计了两种方式:

  - 内存预分配
  - 惰性内存释放

  对于内存预分配可以通过下面这个例子理解：

```s
  set str Redis
  # 这时len为5，free为0
  append str Hello
  # 这时len为10，并且free也为10
```

  当进行添加操作时，不仅为新增字符串分配了内存，还申请了len长度的额外空间，这样有利于执行N次字符串操作时，最多执行N次内存操作。

  - 当字符串小于1M时，分配len大小的额外内存。
  - 当字符串大于1M时，每次只分配1M内存。

  对于内存的惰性释放，实际上就是对于字符串删除的内存并不会立即回收，如果下一次字符串的append操作所需要的内存小于遗留下来的内存，那么就可以节省一次内存分配的操作。

### 二进制安全

  C语言中的字符串只能存储文本，而Redis中通过buf数组存储二进制数据，从而允许字符串可以存储二进制数据。

### 基本API的调用

##### 1、设置

  Redis中字符串的设置的操作有八种：

```s
  # set key value （会覆盖之前的内容）
  set str Redis
  # ===> OK
```

```s
  # getset key value (会覆盖之前的内容，但是会返回之前的内容)
  getset str demo
  # ===> Redis
```

```s
  # mset key value key value ... (设置多个键值对)
  mset demo1 a demo2 b
  # ===> OK 
```

```s
  # setex key seconds value (多少秒之后过期)
  setex str 2 demo
  # ===> OK
```

```s
  # setnx key value (不存在便设置值)
  setnx str demo
  # ===> 1 (1表示设置成功)
```

```s
  # append key value (字符串的添加操作，返回字符串当前的长度)
  append str ' hello'
  # ===> 10
```

```s
  # setrange key offset value （替换offset位置开始的字符串，返回当前字符串的长度）
  set str Hello
  setrange str 5 ' World'
  # ===> 11
```

```s
  # setbit ket offset value (替换offset位置的位)
  set str a
  setbit str 6 1
  # ===> 0 （返回之前的位的值）
  get str
  # ===> c
```

##### 查询

```s
  # get key
  get str
  # ===> c
```

```s
  # mget key key ....
  mget demo1 demo2
  # 1) a
  # 2) b
```

```s
  # strlen key
  strlen str
  # ===> 1
```

```s
  # bitcount key (获取位上值为1的数量)
  bitcount str
  # ===> 4
```

  这里可以采用setbit与bitcount结合统计每个用户上线天数统计。

##### 3、对于整数字符串

  Redis中对于整数字符串还有其他的操作：

```s
  # 以下操作都具有原子性
  # 自增1
  incr number
  # ===> 1
  incrby number 2
  # ===> 3
  decr number
  # ===> 2
  decrby number 3
  # ===> -1
```

  通过这些指令可以做很多的事情，例如：统计一天用户的点击量。。。

