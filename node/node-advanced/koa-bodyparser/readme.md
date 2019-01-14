# 玩转Koa -- koa-bodyparser原理解析

### 一、前置知识

  &emsp;&emsp;在理解koa-bodyparser原理之前，首先需要了解部分HTTP相关的知识。

#### 1、报文主体

  &emsp;&emsp;HTTP报文主要分为请求报文和响应报文，koa-bodyparser主要针对请求报文的处理。

  &emsp;&emsp;请求报文主要由以下三个部分组成：

  - 报文头部
  - 空行
  - 报文主体

  &emsp;&emsp;而koa-bodyparser中的body指的就是请求报文中的报文主体部分。

#### 2、服务器端获取报文主体

  &emsp;&emsp;HTTP底层采用TCP提供可靠的字节流服务，简单而言就是报文主体部分会被转化为二进制数据在网络中传输，所以服务器端首先需要拿到二进制流数据。
  
  &emsp;&emsp;谈到网络传输，当然会涉及到传输速度的优化，而其中一种优化方式就是对内容进行压缩编码，常用的压缩编码方式有：

  - gzip
  - compress
  - deflate
  - identity（不执行压缩或不会变化的默认编码格式）

  &emsp;&emsp;服务器端会根据报文头部信息中的Content-Type确认采用了何种压缩方式，从而得得到完整的二进制数据流。

  &emsp;&emsp;接下来就需要将二进制数据转换为相应的字符，而字符也有不同的字符编码，例如对于中文字符处理差异巨大的UTF-8和GBK，UTF-8编码汉字通常需要三个字节，而GBK只需要两个字节。所以还需要在请求报文的头部信息中设置Content-type使用的字符编码信息，默认情况下采用的是UTF-8，这样服务器端就可以利用相应的字符规则进行解码，得到正确的字符串。

  &emsp;&emsp;拿到字符串之后，服务器端又要问了：客户端，你这一段字符串是啥意思啊？

  &emsp;&emsp;根据不同的应用场景，客户端会对字符串采用不同的编码方式，常见的编码方式有，

  - URL编码方式: a=1&b=2
  - JSON编码方式: {a:1,b:2}
  - 不采用编码方式: 1234

  &emsp;&emsp;客户端会将采用的字符串编码方式设置在请求报文头部信息的Content-Type属性中，这样服务器端根据相应的字符串编码规则进行解码，就能够明白客户端所传递信息的意思了。

  &emsp;&emsp;下面一步步分析koa-bodyparser如何处理这一系列操作得到报文主体内容的。

### 二、获取二进制数据流

  &emsp;&emsp;NodeJS中获取请求报文主体二进制数据流主要通过监听request对象的data事件完成：

```JavaScript
// 示例一
const http = require('http')

http.createServer((req, res) => {
  const body = []

  req.on('data', chunk => {
    body.push(chunk)
  })
  
  req.on('end', () => {
    const chunks = Buffer.concat(body) // 接收到的二进制数据流

    // 利用res.end进行响应处理
    res.end(chunks.toString())
  })
}).listen(1234)
```

  &emsp;&emsp;而koa-bodyparser主要是对[co-body](https://github.com/cojs/co-body)的封装，而【co-body】中主要是采用[raw-body](https://github.com/stream-utils/raw-body)模块获取请求报文主体的二进制数据流，【row-body】主要是对上述示例代码的封装和健壮性处理。

### 三、内容解码

  &emsp;&emsp;客户端会将内容编码的方式放入请求报文头部信息Content-Encoding属性中，服务器端接收报文主体的二进制数据了时，会根据该头部信息进行解压操作，当然服务器端可以在响应报文头部信息Accept-Encoding属性中添加支持的解压方式。

  &emsp;&emsp;而【row-body】主要采用[inflation](https://github.com/stream-utils/inflation)模块进行解压处理。

### 四、字符解码

  &emsp;&emsp;一般而言，UTF-8是互联网中主流的字符编码方式，前面也提到了还有GBK编码方式，相比较UTF-8，它编码中文只需要2个字节，那么在字符解码时误用UTF-8解码GBK编码的字符，就会出现中文乱码的问题。上述【示例一】中的代码就存在这样的问题，如果发送GBK字符编码

  &emsp;&emsp;NodeJS主要通过Buffer处理二进制数据流，但是它并不支持GBK字符编码方式，需要通过[iconv-lite](https://github.com/ashtuchkin/iconv-lite)模块进行处理。

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