## 小程序登录鉴权

##### 一、获取登录凭证

  首先通过:

```JavaScript
  wx.login({
    success: function (res) {
      if (res.code) {
        // 获取到微信派发的登录凭证
      }
    }
  })
```

##### 二、获取openid与session_key

  openid在微信公众平台平台中用来标识每个用户，但是它在订阅号、服务号以及小程序中各不相同的。在小程序中我们可以仅通过openid来标识用户的唯一性，如果你想标识订阅号、服务号以及小程序中的用户的唯一性则得使用unionid。

  session_key保证当前用户进行会话操作的有效性，用来维护小程序中用户的登录状态，通过get请求https://api.weixin.qq.com/sns/jscode2session，传递参数appid、secret、js_code以及grant_type(authorization_code)获取openid以及session_key。

  获取openid以及session_key，我们可以根据这两个参数自定义用户的登录状态。
  
  我们需要确保session_key不会被暴露出去，所以我们需要对session_key进行不可逆的哈希算法。

```JavaScript
  function cryptoSha1 (data) {
    return crypto.createHash('sha1').update(data, 'utf8').digest('hex')
  }
```

##### 三、首次小程序登录的处理

  首先我们获取到的session_key是有时效性的，所以我们需要检查它是否过期。小程序提供checkSession方法检测session_key是否过期，那么我们首次登录的流程：
  - 1、在onLaunch方法中处理;
  - 2、首先检查storage中是否存在session_key(这个为加密之后的session_key);
  - 3、如果不存在，则正常的登录流程，执行步骤7；
  - 4、若果存在，则通过checkSession方法检查session_key是否过期;
  - 5、过期，执行步骤3；
  - 6、未过期，执行步骤7；
  - 7、业务请求。

  在小程序中，可能存在切到后台的情况，那么我们需要在onShow方法调用checkSession来检查session_key是否过期。

##### 四、mysql处理emoji表情

  mysql5.5.3之后，支持将数据库、数据表以及数据列的字符集修改为utf8mb4。

```s
  # /etc/my.cnf

  [client]
  default-character-set=utf8mb4
  [mysql]
  default-character-set=utf8mb4
  [mysqld]
  character-set-client-handshake = FALSE
  character-set-server=utf8mb4
  collation-server=utf8mb4_unicode_ci
```

  对于已经存在的数据库、数据表以及数据列:

```s
  ALTER DATABASE 数据库名称 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

  ALTER TABLE 数据表名称 CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

  ALTER TABLE 数据表名称 CHANGE 字段列名称 VARCHAR(n) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

  sequelize的配置：

```JavaScript
  {
    dialect: 'mysql', 
    dialectOptions: {    
      charset: 'utf8mb4',
      collate: "utf8mb4_unicode_ci"
    }
  }
```

