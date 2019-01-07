# 玩转Koa -- koa-bodyparser原理解析

### 一、前言

  &emsp;&emsp;在Koa中，通常可以采用以下三种方式获取请求的参数：

  - ctx.query: 获取URL上拼接的参数。
  - ctx.params: 获取URL路径参数，具体实现可阅读[玩转Koa -- koa-router原理解析](https://juejin.im/post/5c24c3b9e51d45538150f3ab)
  - ctx.request.body: 获取请求体（request body）的内容。

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

### 二、接收完整的Buffer流

### 三、字符编码 内容编码

### 四、对应Content-Type的解析

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
 [iconv-lite](https://github.com/ashtuchkin/iconv-lite) 解码
 [inflation](https://github.com/stream-utils/inflation) 解压