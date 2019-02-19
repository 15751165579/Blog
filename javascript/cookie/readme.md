# Cookie

  &emsp;&emsp;服务器需要通过Set-Cookie头部发送信息，客户端发送请求时，需要携带Cookie头部信息。

  &emsp;&emsp;Cookie采用URL编码

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

