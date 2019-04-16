# 前端错误监控系统

  采集 -> 处理 -> 分析 -> 报警

  jstrack
  badjs


### 采集

  script error 浏览器对于跨域错误出于安全机制的一种处理方式

  使用 crossorigin 属性，需要服务端和客户端同时支持，客户端由于各家浏览器的实现程度不一样，在行、列号 和  堆栈信息上 表现都不太一样。

  解决这种问题的最简单的处理 就是将所有的静态资源存放在同源下，但是这样无法再利用CDN的性能 以及 单域资源并发加载限制等等。

  另一种方法是 劫持原生的方法


  try catch 对性能的影响

  不要在 try/catch 中定义太多的变量，最好只写一个函数调用，避免变量拷贝造成的性能问题，定义 function 也是一样的


### 上传

  ```JavaScript
  new Image().src = url
```

  这样可能会受到浏览器回收内存的影响，导致请求无法发送过去

```JavaScript
  let image
  const n = Date.now() + Math.random()
  image = window[n] = new Image()
  image.onload = image.onerror = function () {
    window[n] = null
  }
  image.src = src
```

  时间戳 解决 缓存 ， 随机数解决 极端情况 的覆盖问题

### sentry

  JavaScript SDK 

    tracekit 统一格式化报错信息调用栈，对于不返回调用栈信息的情况，采用 caller 向上回溯函数的调用栈

    raven.js 进一步处理信息 以及上报错误 其中对于一些常用的函数进行包装

    与第三方框架的结合，主要在于框架本身可能已经对于一些错误进行处理，这里需要通过插件的获取到 框架内部错误信息。


    私有化 部署

    mac：

    brew cask install docker

    一、安装各种依赖

    docker pull redis
    docker pull postgres
    docker pull sentry

    https://docs.docker.com/samples/library/sentry/