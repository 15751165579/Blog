# 加密知识

### 加密算法的类别

  加密算法主要分为三类:

  - 只需要一个密钥的对称算法： DES、3DES、AES
  - 需要公钥和私钥的非对称算法： RSA、DSA
  - 哈希算法： SHA-256、MD5


### 哈希算法

  哈希算法最重要的两条性质就是不可逆和无冲突，但是在数学上这两条性质是不成立，所以这里成立的条件是反向计算目前的计算资源做不到。(无冲突 王小云教授的论文找出了碰撞的规律)

  哈希算法常用的实现就是MD5和SHA：

```JavaScript
  const crypto = require('crypto')

  const hash = crypto.createHash('md5') // MD5 sha256 sha512

  hash.update('Hello World')

  console.log(hash.digest('hex')) // 1位16进制等于4位二进制 输出16进制

  const sha256 = crypto.createHash('sha256')

  sha256.update('Hello World')

  console.log(sha256.digest('base64')) // 输出base64 
```

  哈希算法的用途，最简单的明文密码处理流程：

  - 1）注册过程中，服务器将明文的密码通过MD5加密存储在数据库中。
  - 2）登陆过程中，服务器将用户传递过来的明文密码MD5处理之后，与数据库中的比对，从而验证用户登陆的权限。

  这样一来即使数据库中的加密密码被黑客盗取，依然无法完成登陆。

  当然MD5也有很多的破解方式，其中包括暴力枚举法和彩虹表。

  暴力枚举就是一个一个试。

  彩虹表就是收集常用的密码破解，主流的彩虹表都在100G以上，这是一种典型的时间和空间交换的方式。

  所以如果单纯的使用MD5，通过彩虹表的方式还是有极大的几率被破解的。

  常用密码处理

  - hash + https 也就是客户端对密码进行哈希处理，这样服务器就真的获取不到明文密码，再进通过https对通信加密，避免重放攻击，但是Https是需要付费的。
  - 基于HMAC的方案，客户端先获取到一段随机数据，然后客户端基于这段随机数据以及用户输入的密码，通过约定的哈希算法生成摘要值，发送给服务器，服务器将数据库中的哈希值加上之前的随机值，做一次哈希运算，然后与客户端的哈希值进行对比。每次发送给服务端的哈希值都不同，所欧裔重放攻击不起作用。

  应对彩虹表的方式就是采用MD5 + 盐, 也就是在MD5处理明文密码之前，将密码中加入盐，盐需要满足的条件：

  - 不要太短
  - 随机

  第三种方案HMAC + MD5，需要一个散列函数（MD5, SHA）以及一个密钥。规避碰撞风险

```JavaScript
  const hmac = crypto.createHmac('sha256', 'secret')

  hmac.update('Hello World')

  console.log(hmac.digest('hex'))
```

### 对称加密算法

  对称加密算法主要通过单个密钥进行加密解密操作。

  常提到得对称加密算法有： 

  - DES: 已经被破解
  - 3重DES：处理速度慢，导致加密耗时，也不常用。
  - AES： DES的代替者。

### 非对称加密算法

  相比较对称算法，发送者和接收者都是同一个密钥，显然会增加密钥管理的安全性，而非对称加密算法则有两种密钥：私钥和公钥。私钥只有自己知道，而公钥对于所有发送者都是公开的。

  非对称加密算法中最常用的就是RSA，它基于的数学基础：大素数的分解因子难题。不过随着计算机运算能力的发展，或者说是量子力学的发展，最终它可能也会变得不安全。

  公钥和私钥可以通过openssl生成

```s
  genrsa -out rsa_private_key.pem 2048
  rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
```