# 玩转Koa -- koa-bodyparser原理解析


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