# 字符串内部结构

### 知识回顾

  在C语言中标准的字符串是以NULL作为结束符的，获取这个字符串的长度需要采用strlen方法，而这个方法的时间复杂度是O(n)，作为单线程的Redis表示承受不起。

### SDS（Simple Dynamic String）

```c
  struct SDS<T> {
    T capacity; // 数组的容量
    T len; // 数组长度
    byte flags; // 特殊标识符
    byte[] content; // 内容 以\0结尾
  }
```

### 编码方式

  Redis作者对于内存的优化做到了极致，根据字符串大小的不同采用不同的编码方式

  - int
  - embstr（现在是44字节区分）
  - raw

  在Redis中对于每个key对象都采用:

```c
  struct RedisObject {
    int4 type;
    int4 encoding;
    int24 lru;
    int32 refcount;
    void *ptr
  }
```

  通过这个结构体保存Redis中对象的信息，当字符串编码方式不是raw时，RedisObject和SDS通过malloc分配一个连续内存，当编码方式为raw时，则要通过两次malloc方法为RedisObject和SDS分别分配内存。

### 扩容策略

  首先，Redis中规定字符串的大小不能超过512M。

  当字符串的大小小于1M之前，扩容空间采用加倍策略，当超过1M时，则每次扩容只会多分配1M空间。