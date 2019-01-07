# 玩转Koa -- koa-bodyparser原理解析

### 一、前言

  &emsp;&emsp;在Koa中，通常可以采用以下三种方式获取请求的参数：

  - ctx.query: 获取URL上拼接的参数。
  - ctx.params: 获取URL路径参数，具体实现可阅读[玩转Koa -- koa-router原理解析](https://juejin.im/post/5c24c3b9e51d45538150f3ab)
  - ctx.request.body: 获取（request body）的内容。

  &emsp;&emsp;而客户端在发送请求体时，会通过携带Content-Type请求头告诉服务端发送的是哪一种数据类型，常见的Content-Type有：

  - text/plain
  - application/json
  - application/x-www-form-urlencoded
  - multipart/form-data

  &emsp;&emsp;koa-bodyparser主要针对前面三种Content-Type的请求体解析，处理的步骤如下：

  1. 接收客户端发送的数据
  2. 内容解码
  3. 字符解码
  4. 根据Content-Type输出相应的数据结构

### 二、接收客户端发送的数据

  &emsp;&emsp;在NodeJS中可以通过监听request对象上的data和end事件完成客户端的数据接收，代码如下：

```JavaScript
const http = require('http')

http.createServer((req, res) => {
  const body = []

  req.on('data', chunk => {
    body.push(chunk)
  })
  
  req.on('end', () => {
    const chunks = Buffer.concat(body) // 完整的二进制数据流
    res.end(chunks.toString()) // 响应该请求
  })
}).listen(1234)
```

### 三、内容解码

  &emsp;&emsp;为了减少请求体在网络传输过程中的体积，还可以对其进行压缩处理，当请求头中声明Content-Encoding属性，则是告诉服务器该请求体采用了那种压缩编码方式，比如现在重用的gzip压缩。当然服务器和客户端也可以通过在头部信息中添加Accept-Encoding属性告知对方支持哪些压缩编码方式。

  &emsp;&emsp;在NodeJS中，获取到Content-Encoding信息之后，可以采用[inflation](https://github.com/stream-utils/inflation)对请求信息进行解压。

### 四、字符解码

  &emsp;&emsp;除了上述的内容编码，对于字符也有编码，而字符编码的方式也声明在Content-Type中，常见的字符编码有：UTF-8、GBK等。

  &emsp;&emsp;不同字符编码之间的差异在于编码相同类型字符所采用的字节数可能不同。例如UTF-8编码汉字需要三个字节，而GBK只需要两个字节。

  &emsp;&emsp;对于前面的示例，现在发送一段GBK编码的内容：

```JavaScript
const request = require('request')
const iconv = require('iconv-lite')

request.post({
  url: 'http://10.1.1.248:1234/',
  body: iconv.encode('文字', 'gbk'),
  headers: {
    'Content-Type': 'text/plain;charset=GBK'
  }
}, (error, response, body) => {
  console.log(body)
})
```

  &emsp;&emsp;终端会打印出乱码，主要原因在于NodeJS中的Buffer默认UTF8的字符编码方式，并且不支持GBK字符编码方式，这里可以采用[iconv-lite](https://github.com/ashtuchkin/iconv-lite)进行转换。

```JavaScript
const http = require('http')
const iconv = require('iconv-lite')

http.createServer((req, res) => {
  const contentType = req.headers['content-type']
  const charsetStr = contentType.split(';')[1]
  const charset = charsetStr && charsetStr.split('=')[1]
  const body = []

  req.on('data', chunk => {
    body.push(chunk)
  })
  
  req.on('end', () => {
    const chunks = Buffer.concat(body)
    res.end(iconv.decode(chunks, charset))
  })
}).listen(1234)
```

### 五、根据Content-Type输出相应的数据结构

  &emsp;&emsp;得到客户端请求主体内容之后，就需要根据Content-Type来判断请求主体采用的何种数据结构。

##### 1、text/plain

  &emsp;&emsp;表现形式为普通字符串：

```s
  "123"
```

  &emsp;&emsp;这种形式虽然简单，不需要服务端特别处理，但是服务端能够提取的信息太少。

##### 2、application/x-www-form-urlencoded

  &emsp;&emsp;表现形式为键值对字符串：

```s
  "a=1&b=2&c=3"
```

  &emsp;&emsp;相比较第一种方式，这里可以通过服务端对该字符串进行解码，获取更多的信息：

```JavaScript
function decode (qs, sep = '&', eq = '=') {
  const obj = {}
  qs = qs.split(sep)

  for (let i = 0, max = qs.length; i < max; i++) {
    const item = qs[i]
    const index = item.indexOf(eq)

    let key, value

    if (~index) {
      key = item.substr(0, index)
      value = item.substr(index + 1)
    } else {
      key = item
      value = ''
    }
    
    key = decodeURIComponent(key)
    value = decodeURIComponent(value)

    if (!obj.hasOwnProperty(key)) {
      obj[key] = value
    }
  }
  return obj
}
```

  &emsp;&emsp;但是它并不能处理复杂的对象。

##### 3、application/json

  &emsp;&emsp;

```s
  "{"a":1,"b":2}"
```

  &emsp;&emsp;





### 五、总结


 前提

 客户端 --> 二进制 ---> 服务端 ---> 根据编码方式解码为相应的字符串 ---> 根据Content-Type 返回相应的结构

 Content-Type text/plain application/json application/x-www-form-urlencoded

 Charset utf8 gbk ....

 在网络传输的过程中，传输的是二进制的比特位。

 UTF-8编码汉字通常需要三个字节，而GBK只需要两个字节


 1、text/plain 处理较为简单只要将buffer拼接即可 设计到编码方式的处理 iconv-lite 处理编码方式

 2、application/json 验证json的正则表达式 JSON.parse

 3、application/x-www-form-urlencoded qs处理


 总结起来：

 1、通过req的data和end事件收集完整的Buffer流
 2、根据Content-Encoding进行解压
 3、根据Charset进行解码
 4、根据Content-Type解析相应的数据类型


 [koa-bodyparser](https://github.com/koajs/bodyparser/blob/master/index.js)
 [co-body](https://github.com/cojs/co-body) 解析请求体
 [raw-body](https://github.com/stream-utils/raw-body)接收客户端请求主体
 [iconv-lite](https://github.com/ashtuchkin/iconv-lite) 解码
 [inflation](https://github.com/stream-utils/inflation) 解压