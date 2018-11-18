# web存储

  web存储的四大金刚：Cookie、SessionStorage、localSorage and IndexedDB。

### 一、Cookie

##### 1、什么是Cookie?

  Cookie主要是用来存储会话信息的：

  - 服务端的请求通过Set-Cookie携带Cookie，客户端解析后存储。
  - 客户端每次发送请求都会通过请求头中的Cookie属性发送Cookie。

  这样服务端就能够通过Cookie中的内容判断该用户是谁。

  当然这里你必须要知道HTTP是无状态的，才能理解上述的解释。

##### 2、限制

  浏览器对于Cookie的限制主要有三个方面：

  - 跨域：浏览器的同源策略对JavaScript的安全限制，所谓同源就是同域名、同协议和同端口，只有在这三个条件一致的情况下，才能访问。
  - 个数限制
  - 大小限制

##### 3、组成

  Cookie的组成：

  - 名称：不区分大小写，最佳实践是需要区别大小，URL编码
  - 值：URL编码
  - 域
  - 路径
  - 失效时间
  - 安全状态

  这些值是通过";" + " "分开的。

  前面提到的客户端会主动的在请求发送的时候加上Cookie，但是只会发送名称和值。


##### 4、JavaScript对于Cookie的操作

  Cookie的赋值操作是追加，不是覆盖。

  Cookie的删除操作实际上是设置过期。

##### 5、子Cookie的概念

### 二、Web Storage

  Web Storage分为SessionStorage和localStorage。

##### 1、基本方法

  对于WebStorage对象都包含以下方法：

  - clear
  - getItem
  - setItem
  - key
  - removeItem

  并且通过storage事件可以监听值的变化，但是无法区分这两种类别。

##### 2、SessionStorage

  SessionStorage主要存储会话级别的数据，当退出浏览器时别会被清除。

##### 3、LocalStorage

  LocalStorage则是一种持久化的存储

##### 4、限制

  浏览器同样对于Web Storage也有大小的限制。

### 三、IndexedDB

##### 1、基本认知

  IndexedDB是Web客户端的数据库，与一般的SQL数据库不一样的是通过对象存储。

  并且每一次操作数据库都是一个异步请求。

##### 1、版本号的处理

##### 2、存储空间

##### 3、事务操作

##### 4、游标（范围， 方向）

##### 5、并发处理

##### 6、限制

  - 大小限制
  - 跨域限制