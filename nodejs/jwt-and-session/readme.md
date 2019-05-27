# JWT And Session

### 基本工作原理

  Session的工作原理：

  - 客户端请求服务端，服务端生成身份认证相关的session数据，并且返回session_id
  - 客户端将session_id保存在Cookie中。
  - 服务端根据Cookie中的session_id处理用户相关的身份权限。

  优势：

  - 服务端可以主动的清除Session
  - session保存在服务端相对安全
  - 结合Cookie使用，相对比较灵活，兼容性好。

  劣势：

  - Cookie + Session在跨域的情况下表现不太好
  - 分布式的情况下，Session需要多机共享
  - 基于 Cookie 很容易被 CSRF

  JWT主要是将三部分编码之后通过.号分隔返回给客户端

##### Header

  Header部分包含类型和使用的算法：

  - type: 默认JWT
  - alg: 例如RSA

  然后对其进行base64处理

##### Payload

  Payload就是我们需要存储的数据，用户，过期日期等。这部分和Header的区别就在于可以加密，所以不能简单的使用Base64，使用Base64UrlEncoder,区别主要在于不显示"="，并且将"-"替换为"_"。

##### Signature

  Signature 主要是对前面的 Header 和 Payload 进行加密，保证Token在传输的过程中不被篡改和损坏。


  工作原理：

- 用户通过POST请求提交登录信息，服务器验证用户账号和密码，将用户的 ID 等其他信息作为Payload，形成JWT。
- 后端将Token返回给客户端，客户端通过 localStorage 或者 sessionStorage 保存。
- 每次请求将 Token 放在 Request Header 的 Authorization 属性上（解决XSS和XSRF）
- 后端检查Token是否正确