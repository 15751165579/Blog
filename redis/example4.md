# 位图的使用

### 基本指令 setbit getbit bitcount bitpos

```JavaScript
  // 首先将字符串转化为ASCII码
  const code = 'd'.charCodeAt()
  // 转化为二进制
  const bit = code.toString(2).padStart(8)

  // => 01100100 从 0 开始到 7

  // redis中的位图操作
  setbit name 1 1
  setbit name 2 1
  setbit name 5 1

  // 查看字符串
  get name
```

  位图用途很大，例如签到系统，如果我们通过key/value来处理，则会产生很大的空间。而使用位图的话，签到一年才365位。相当于一个很小的字符串。

  但是这里也有问题，在Redis中我们通过bitcount来统计1的个数，通过bitpos来寻找范围内1和0的位置。

```JavaScript
  setbit name 2 1
  setbit name 12 1
  // 计算所有1的个数
  bitcount name // 2
  
  // 计算第一个字符中1的个数
  bitcount name 0 0 // 1

  // 计算前两个字符的1的个数
  bitcount name 0 1 // 2

  // 寻找位图中第一个1的位置(寻找的值， 从第几个字符开始)默认从第一个开始，下标从0计算
  bitpos name 1 // 2

  // 从第二个字符开始，寻找1的位置
  bitpos name 1 1 // 12
```

  这里你应该能发现问题了，再统计范围数据时，我们并不能很好的处理，需要把所有的数据读取出来，再进行处理。

### Redis3.2新增  bitfield

  bitfield可以操作多个位，但是最多处理64个位，超过则需要使用多个子指令。

```JavaScript
  set name dai // 'dai'

  // 在第24位之后用113覆盖8位无符号
  bitfield name set u8 24 113

  // => 'daiq'

  // 获取第24位后的8位无符号
  bitfield name get u8 24
```

  bitfield还支持incrby操作。当然进行自增操作，那么就会出现溢出情况，提供wrap折返，fail报错不执行，饱和截断sat（超出范围停留在最大值最小值），而且这个指令只影响一条，又会变成wrap。

```JavaScript
  // 从0位开始 8位加1
  bitfield name incrby u8 0 1

  // 获取前两位
  bitfield name get u2 0 // 1

  // fail模式
  bitfield name overflow fail incrby u2 0 10 // => 1

  // sat模式
  bitfield name overflow sat incrby u2 0 10 // => 3

  // wrap模式
  bitfield name overflow wrap incrby u2 0 1 // => 0
```