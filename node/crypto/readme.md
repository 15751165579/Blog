# 加密知识

### 加密算法的类别

  加密算法主要分为三类:

  - 只需要一个密钥的对称算法： DES、3DES、AES
  - 需要公钥和私钥的非对称算法： RSA、DSA
  - 哈希算法： SHA-256、MD5


### 哈希算法

  哈希算法最重要的两条性质就是不可逆和无冲突，但是在数学上这两条性质是不成立，所以这里成立的条件是反向计算目前的计算资源做不到。

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

  哈希算法的用途，对明文密码的处理：

  - 1）注册过程中，服务器将明文的密码通过MD5加密存储在数据库中。
  - 2）登陆过程中，服务器将用户传递过来的明文密码MD5处理之后，与数据库中的比对，从而验证用户登陆的权限。

  这样一来即使数据库中的加密密码被黑客盗取，依然无法完成登陆。

  当然MD5也有很多的破解方式，其中包括暴力枚举法和彩虹表。

  暴力枚举就是一个一个试。

  彩虹表就是收集常用的密码破解，主流的彩虹表都在100G以上，这是一种典型的时间和空间交换的方式。

  所以如果单纯的使用MD5，通过彩虹表的方式还是有极大的几率被破解的，所以又出现了