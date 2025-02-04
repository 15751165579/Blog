# 压缩列表

### 压缩列表(ziplist)

  Redis中的zset和hash对象中元素个数比较少的情况下，会采用压缩列表进行存储。压缩列表是一块连续的存储空间，没有任何冗余空间。

```js
  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  + zlbytes + zltail_offset + zlleength + entry + enrty + ... + zlend +
  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
```

  - zlbytes: 整个压缩列表占用的字节数
  - zltail_offset: 最后一个元素距离压缩列表起始点的偏移量，用于快速的定位尾部元素。（从而支持双向遍历）
  - zllength: 元素的个数
  - entry: 元素内容
  - zlend: 压缩列表结束标识

  对于每个entry都会存储前一个enrty的字长度，并且根据存储的内容的不同会采用不同的编码方式。

### 为什么压缩列表不适合元素较多的情况？

  当插入一个新元素的时候，压缩列表需要重新分配内存，并将之前的内容一次性的拷贝到新的地址，也有可能在原有的地址上进行扩展，如果压缩列表过大，那么重新分配内存和拷贝内存就会有很大的消耗。

### 级联更新

  前面提到entry中通过prevlen存储前一个entry的长度，但是prevlen会根据内容的大小是否超过254字节采用1字节或者5字节存储。如果ziplist在修改某个entry时，可能触发级联更新，这就是一个非常耗时的操作。 

### intset

  当set中存储的都是整数并且元素较少的时候，Redis会采用intset进行存储。intset是紧凑数组结构，同时支持16、32、64位这整数。

```js
  ++++++++++++++++++++++++++++++++++++++++++++++
  + encoding + length + value + value + .....  +
  ++++++++++++++++++++++++++++++++++++++++++++++
```