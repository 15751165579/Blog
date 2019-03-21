# 前端小贴士 - 函数节流与防抖

### 一、应用场景

  &emsp;&emsp;在前端的开发过程中，经常会接触到高频度触发事件，例如：scroll，drag，input等等。

  &emsp;&emsp;如果在这些事件的事件处理程序中进行非常耗时的操作，则会造成页面卡顿的性能问题。面对这样的问题，通常会尽量避免在事件处理程序中进行复杂耗时操作，再通过降低执行频率的方法进行优化。

  &emsp;&emsp;而降低函数执行频率的方法，就是今天所要介绍的函数节流与函数防抖。

### 二、函数节流

  &emsp;&emsp;函数节流是指确保函数在固定时间间隔只执行一次。在 JavaScript 中可以采用 setTimeout + 闭包的方式实现：

```JavaScript
function throttle (fn, interval = 1000) {
      let timer = null
      let firstTime = true
      return function (...data) {
        if (firstTime) {
          fn.apply(this, data)
          firstTime = false
        }

        if (timer) {
          return
        }

        timer = setTimeout(() => {
          clearTimeout(timer)
          timer = null
          fn.apply(this, data)
        }, interval)
      }
    }
```

### 三、函数防抖

  &emsp;&emsp;函数防抖同样需要指定一个执行间隔，但是在等待的过程中，一旦被打断会重新计时，所以它执行的时间间隔可能与预期不太一样。

  &emsp;&emsp;利用 setTimeout + 闭包也可以实现函数防抖：

```JavaScript
function debounce (fn, interval = 1000) {
  let timer = null
  return function (...data) {
    clearTimeout(timer)
    timer = null
    timer = setTimeout(() => {
      fn.apply(this, data)
      clearTimeout(timer)
      timer = null
    }, interval)
  }
}
```