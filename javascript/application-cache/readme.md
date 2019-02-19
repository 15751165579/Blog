# application cache

  &emsp;&emsp;主要通过 manifest file 指定需要下载和缓存的资源。

### 问题

  - 文件首先会从ApplicationCache中加载， 页面渲染完成之后，才会查看更新，如果有更新的话，applicationCache会抛出updateready事情告诉开发者，有资源更新，但是此时你也不能强制更新，只能提示用户有更新。
  - applicationCache只会在manifest文件改变的时候更新

  &emsp;&emsp;坑多，localStorage缓存资源。

  &emsp;&emsp;Http中的缓存模型

  - 永远不要缓存我 
  - 与服务器验证，到底缓存不缓存我 (If-Modified-Since last-modified) (if-match etag)
  - 缓存到什么时间
  
