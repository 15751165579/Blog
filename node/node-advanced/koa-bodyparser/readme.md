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

#### 2、服务器端获取报文主体流程

  &emsp;&emsp;HTTP底层采用TCP提供可靠的字节流服务，简单而言就是报文主体部分会被转化为二进制数据在网络中传输，所以服务器端首先需要拿到二进制流数据。
  
  &emsp;&emsp;谈到网络传输，当然会涉及到传输速度的优化，而其中一种优化方式就是对内容进行压缩编码，常用的压缩编码方式有：

  - gzip
  - compress
  - deflate
  - identity（不执行压缩或不会变化的默认编码格式）

  &emsp;&emsp;服务器端会根据报文头部信息中的Content-Encoding确认采用何种解压编码。

  &emsp;&emsp;接下来就需要将二进制数据转换为相应的字符，而字符也有不同的字符编码方式，例如对于中文字符处理差异巨大的UTF-8和GBK，UTF-8编码汉字通常需要三个字节，而GBK只需要两个字节。所以还需要在请求报文的头部信息中设置Content-Type使用的字符编码信息（默认情况下采用的是UTF-8），这样服务器端就可以利用相应的字符规则进行解码，得到正确的字符串。

  &emsp;&emsp;拿到字符串之后，服务器端又要问了：客户端，你这一段字符串是啥意思啊？

  &emsp;&emsp;根据不同的应用场景，客户端会对字符串采用不同的编码方式，常见的编码方式有，

  - URL编码方式: a=1&b=2
  - JSON编码方式: {a:1,b:2}

  &emsp;&emsp;客户端会将采用的字符串编码方式设置在请求报文头部信息的Content-Type属性中，这样服务器端根据相应的字符串编码规则进行解码，就能够明白客户端所传递的信息了。

  &emsp;&emsp;下面一步步分析koa-bodyparser是如何处理这一系列操作，从而得到报文主体内容。

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

  &emsp;&emsp;一般而言，UTF-8是互联网中主流的字符编码方式，前面也提到了还有GBK编码方式，相比较UTF-8，它编码中文只需要2个字节，那么在字符解码时误用UTF-8解码GBK编码的字符，就会出现中文乱码的问题。
  
  &emsp;&emsp;NodeJS主要通过Buffer处理二进制数据流，但是它并不支持GBK字符编码方式，需要通过[iconv-lite](https://github.com/ashtuchkin/iconv-lite)模块进行处理。

  &emsp;&emsp;【示例一】中的代码就存在没有正确处理字符编码的问题，那么报文主体中的字符采用GBK编码方式，必然会出现中文乱码：

```JavaScript
const request = require('request')
const iconv = require('iconv-lite')

request.post({
  url: 'http://localhost:1234/',
  body: iconv.encode('中文', 'gbk'),
  headers: {
    'Content-Type': 'text/plain;charset=GBK'
  }
}, (error, response, body) => {
  console.log(body) // 发生中文乱码情况
})
```

  &emsp;&emsp;NodeJS中的Buffer默认是采用UTF-8字符编码处理，这里借助【iconv-lite】模块处理不同的字符编码方式：

```JavaScript
    const chunks = Buffer.concat(body)
    res.end(iconv.decode(chunks, charset)) // charset通过Content-Type得到
```

### 五、字符串解码

  &emsp;&emsp;前面已经提到了字符串的二种编码方式，它们对应的Content-Type分别为：

  - URL编码 application/x-www-form-urlencoded
  - JSON编码 application/json

  &emsp;&emsp;对于前端来说，URL编码并不陌生，经常会用于URL拼接操作，唯一需要注意的是不要忘记对键值对进行decodeURIComponent()处理。

  &emsp;&emsp;当客户端发送请求主体时，需要进行编码操作：

```JavaScript
  'a=1&b=2&c=3'
```

  &emsp;&emsp;服务器端再根据URL编码规则解码，得到相应的对象。

```JavaScript
  // URL编码方式 简单的解码方法实现
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

console.log(decode('a=1&b=2&c=3')) // { a: '1', b: '2', c: '3' }
```

  &emsp;&emsp;URL编码方式适合处理简单的键值对数据，并且很多框架的Ajax中的Content-Type默认值都是它，但是对于复杂的嵌套对象就不太好处理了，这时就需要JSON编码方式大显身手了。

  &emsp;&emsp;客户端发送请求主体时，只需要采用JSON.stringify进行编码。服务器端只需要采用JSON.parse进行解码即可：

```JavaScript
const strictJSONReg = /^[\x20\x09\x0a\x0d]*(\[|\{)/;
function parse(str) {
  if (!strict) return str ? JSON.parse(str) : str;
  // 严格模式下，总是返回一个对象
  if (!str) return {};
  // 是否为合法的JSON字符串
  if (!strictJSONReg.test(str)) {
    throw new Error('invalid JSON, only supports object and array');
  }
  return JSON.parse(str);
}
```

  &emsp;&emsp;除了上述两种字符串编码方式，koa-bodyparser还支持不采用任何字符串编码方式的普通字符串。

  &emsp;&emsp;三种字符串编码的处理方式由【co-body】模块提供，koa-bodyparser中通过判断当前Content-Type类型，调用不同的处理方式，将获取到的结果挂载在ctx.request.body：

```JavaScript

  return async function bodyParser(ctx, next) {
    if (ctx.request.body !== undefined) return await next();
    if (ctx.disableBodyParser) return await next();
    try {
      // 最重要的一步 将解析的内容挂载到koa的上下文中
      const res = await parseBody(ctx);
      ctx.request.body = 'parsed' in res ? res.parsed : {};
      if (ctx.request.rawBody === undefined) ctx.request.rawBody = res.raw; // 保存原始字符串
    } catch (err) {
      if (onerror) {
        onerror(err, ctx);
      } else {
        throw err;
      }
    }
    await next();
  };

  async function parseBody(ctx) {
    if (enableJson && ((detectJSON && detectJSON(ctx)) || ctx.request.is(jsonTypes))) {
      return await parse.json(ctx, jsonOpts); // application/json等json type
    }
    if (enableForm && ctx.request.is(formTypes)) {
      return await parse.form(ctx, formOpts); // application/x-www-form-urlencoded
    }
    if (enableText && ctx.request.is(textTypes)) {
      return await parse.text(ctx, textOpts) || ''; // text/plain
    }
    return {};
  }
};
```

  &emsp;&emsp;其实还有一种比较常见的Content-type，当采用表单上传时，报文主体中会包含多个实体主体：

```JavaScript
------WebKitFormBoundaryqsAGMB6Us6F7s3SF
Content-Disposition: form-data; name="image"; filename="image.png"
Content-Type: image/png


------WebKitFormBoundaryqsAGMB6Us6F7s3SF
Content-Disposition: form-data; name="text"

------WebKitFormBoundaryqsAGMB6Us6F7s3SF--
```

  &emsp;&emsp;这种方式处理相对比较复杂，koa-bodyparser中并没有提供该Content-Type的解析。（下一篇中应该会介绍^_^）


### 五、总结

  


 [koa-bodyparser](https://github.com/koajs/bodyparser/blob/master/index.js)
 [co-body](https://github.com/cojs/co-body) 解析请求体
 [raw-body](https://github.com/stream-utils/raw-body)接收客户端请求主体
 [iconv-lite](https://github.com/ashtuchkin/iconv-lite) 解码
 [inflation](https://github.com/stream-utils/inflation) 解压
