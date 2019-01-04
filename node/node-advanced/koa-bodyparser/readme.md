# 玩转Koa -- koa-bodyparser原理解析

 Content-Type text/plain application/json application/x-www-form-urlencoded

 Charset utf8 gbk ....

 在网络传输的过程中，传输的是二进制的比特位。

 UTF-8编码汉字通常需要三个字节，而GBK只需要两个字节


 1、text/plain 处理较为简单只要将buffer拼接即可 设计到编码方式的处理 iconv-lite 处理编码方式