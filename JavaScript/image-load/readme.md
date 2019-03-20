### 图片懒加载的前世今生

### 一、前言

  &emsp;&emsp;通常情况下，HTML中的图片资源会自上而下依次加载，而部分图片必须得用户向下滚动页面才能被看见，否则永远也不会被看见，那么这部分图片的流量就被白白浪费了。

  &emsp;&emsp;所以，对于那些含有大量图片资源的网站，采用“按需加载”的方式，也就是当图片资源出现在可视区域内，才会被加载，这样可能会影响一丢丢用户体验，但是能大大节省网站的流量。

  &emsp;&emsp;而上述“按需加载”的方式就是今天的主角 -- 图片懒加载技术

### 二、原理

  &emsp;&emsp;图片懒加载技术主要通过监听图片资源容器是否出现在可视区域内，来决定图片资源是否被加载。

  &emsp;&emsp;那么实现图片懒加载技术的核心就是如何判断元素处于可视区域之内。

### 三、前世

  &emsp;&emsp;既然涉及到用户滚动页面的行为，那就少不了scroll事件，通过在scroll事件处理程序中计算元素与可视区域的关系即可，思路很简单，但是需要注意一些细节问题。

  &emsp;&emsp;首先scroll事件可能会被高频度的触发，那么就不能相应的事件处理程序中执行非常重型操作，但是这里是避免不了DOM计算的，那么只有降低DOM计算的频率，比如确保在200ms中只执行一次。

  &emsp;&emsp;上述这种优化的方式叫做函数节流，在JavaScript中可以采用setTimeout + 闭包的方式实现函数节流：

```JavaScript
function throttle (fn, interval = 500) {
  const _fn = fn
  let timer = null
  let firstTime = true

  return function (...args) {
    const self = this
    if (firstTime) {
      // 第一次加载
      _fn.apply(self, args)
      return firstTime = false
    }

    if (timer) {
      // 定时器正在执行中，跳过
      return
    }

    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      _fn.apply(self, args)
    }, interval)

  }
}
```

  &emsp;&emsp;JavaScript提供了Element.getBoundingClientRect()方法返回元素的大小以及相对于视口的位置，那么很容易可以判断元素是否落在可视区域内：

```JavaScript
function isElementInViewport (el) {
  const { top, height, left, width } = el.getBoundingClientRect()
  const w = window.innerWidth || document.documentElement.clientWidth
  const h = window.innerHeight || document.documentElement.clientHeight
  return (
    top <= h &&
    (top + height) >= 0 &&
    left <= w &&
    (left + width) >= 0
  )
}
```

  &emsp;&emsp;

```JavaScript
function LazyLoad (el) {
  if (!(this instanceof LazyLoad)) {
    return new LazyLoad(el)
  }
  if (typeof el === 'string') {
    el = document.querySelectorAll(el)
  }
  this.images = []

  for (let i = 0, max = el.length; i < max; i++) {
    this.images.push({
      finished: false,
      el: el[i]
    })
  }

  this.listener = this.loadImage()
  this.listener()
  this.initEvent()
}

LazyLoad.prototype = {
  loadImage () {
    return throttle(function () {
      let complete = true
      const images = this.images
      for (let i = 0; i < images.length; i++) {
        const { finished, el } = images[i]
        if (finished) {
          continue
        }
        if (!finished) {
          complete = false
        }
        if (isElementInViewport(el)) {
          el.src = el.dataset.src
          images[i].finished = true
        }
      }
      if (complete) {
        window.removeEventListener('scroll', this.listener, false)
        this.images = null
      }
    }).bind(this)
  },
  initEvent () {
    window.addEventListener('scroll', this.listener, false)
  }
}
```

### 今生

  &emsp;&emsp;