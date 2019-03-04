# 全面了解Cookie

### 一、Cookie的出现

  &emsp;&emsp;浏览器和服务器之间的通信少不了HTTP协议，但是因为HTTP协议是无状态的，所以服务器并不知道上一次浏览器做了什么样的操作，这样严重阻碍了交互式Web应用程序的实现。

  &emsp;&emsp;针对上述的问题，网景公司的程序员创造了Cookie。


### 二、Cookie的传输

  &emsp;&emsp;服务器端在实现Cookie标准的过程中，需要对任意HTTP请求发送Set-Cookie HTTP头作为响应的一部分：

```s
  Set-Cookie: name=value; expires=Tue, 03-Sep-2019 14:10:21 GMT; path=/; domain=.xxx.com;
```

  &emsp;&emsp;浏览器端会存储这样的Cookie，并且为之后的每个请求添加Cookie HTTP请求头发送回服务器：

```s
  Cookie: name=value
```

  &emsp;&emsp;服务器通过验证Cookie值，来判断浏览器发送请求属于哪一个用户。


### 三、浏览器中的Cookie

  &emsp;&emsp;浏览器中的Cookie主要由以下几部分组成：

  - 名称：Cookie**唯一**的名称，必须经过URL编码处理。（同名会出现覆盖的情况）
  - 值：必须经过URL编码处理。
  - 域（domain）：默认情况下cookie在当前域下有效，你也可以设置该值来确保对其子域是否有效。
  - 路径（path）：指定Cookie在哪些路径下有效，默认是当前路径下。
  - 失效时间（expires）：默认情况下，浏览器会话结束时会自动删除Cookie；也可以设置一个GMT格式的日期，指定具体的删除日期；如果设置的日期为以前的日期，那么Cookie会立即删除。
  - 安全标志（secure）：指定之后只允许Cookie发送给https协议。

  &esmp;&emsp;浏览器在发送请求时，只会将名称与值添加到请求头的Cookie字段中，发送给服务端。

  &emsp;&emsp;浏览器提供了一个非常蹩脚的API来操作Cookie：

```JavaScript
  document.cookie
```

  &emsp;&emsp;通过上述方法可以对该Cookie进行写操作，每一次只能写入一条Cookie字符串，需要注意Cookie的每一段信息需要通过**分号加空格**分割：

```JavaScript
  document.cookie = 'a=1; secure; path=/'
```

  &emsp;&emsp;通过该方法还可以进行Cookie的读操作：

```JavaScript
  document.cookie
  // "a=1"
```

  &emsp;&emsp;由于上述方法操作Cookie非常的不直观，一般都会写一些函数来简化Cookie读取、设置和删除操作。



### 限制

  - 不能够跨域
  - 大小
  - 个数

### 组成

  - 名称
  - 值
  - 域
  - 路径
  - 失效时间
  - 安全标志

  &esmp;&emsp;它们以分号加空格分隔。这些在客户端发送时，只会发送键值对。

### JavaScript操作Cookie

  &emsp;&emsp;document.cookie并不会覆盖之前的cookie,除非名称已经存在，否则必须设置过期时间。

  cookie的基本操作

  cookie的骚操作 （子cookie）(数量的限制)

  HTTP专有cookie, (httpOnly) 客户端无法操作该Cookie。

### Cookie网站性能的影响

