# 前端数据监控系统

### 一、路由的监控

##### 1、href
  &emsp;&emsp;直接上报即可

##### 2、URL Hash (#) 无刷新路由切换方式

  &emsp;&emsp;Hash 路由会携带一个 # 标记，虽然不怎么美观，但是兼容性非常的好。

  &emsp;&emsp;Hash 路由还有一个缺点就是 开发者只能修改 # 之后的内容 


```JavaScript
  window.addEventListener('hashchange', () => {
    // 上报
  }, true)
```

##### 3、HTML History API 主流的无刷新路由切换方式

  &emsp;&emsp;相比较 Hash 路由，History API 完全可以自定义 URL 。

  &emsp;&emsp;由于 pushState 和 replaceState 没有回调，这里需要采用 AOP 的思想进行处理，从而实现监听路由的变化：

```JavaScript
function aop (type) {
  const origin = window.history[type]
  const event = new Event(type) // CustomEvent 可以发送更多的数据
  return function (...data) {
    event.arguments = data
    window.dispatchEvent(event)
    const ret = origin.apply(this, data)
    return ret
  }
}

window.history.pushState = aop('pushState')
window.history.replaceState = aop('replaceState')

document.getElementById('js-button-push').addEventListener('click', () => {
  window.history.pushState({ push: '123' }, 'page 2', 'push.html')
}, false)

document.getElementById('js-button-replace').addEventListener('click', () => {
  window.history.replaceState({ replace: '456' }, 'page 2', 'replace.html')
}, false)

window.addEventListener('pushState', e => {
  console.log(' === pushState === ')
  console.log(e)
})

window.addEventListener('replaceState', e => {
  console.log(' === replaceState === ')
  console.log(e)
})
```

### 二、错误监控

##### 1、try/catch

  &emsp;&emsp;try/catch 最大的问题是不能够捕获异步代码的异常。

  &emsp;&emsp;而对于 try/catch 的性能问题，不要 try/catch 中定义太多的变量，最好只写一个函数调用，避免变量拷贝造成的性能问题。（定义函数也是一样）

```JavaScript

  try {
    ....
  } catch (e) {
    // 上报
  }
```

##### 2、onerror

  &emsp;&emsp;相比较 try/catch ，onerror 可以获取到异步代码的错误（如 setTimeout），并且错误信息相对比较完整。。

```JavaScript
window.addEventListener('error', (e) => {
  e.preventDefault()
  const { message, filename, lineno, colno, error } = e
  console.log(' === 捕获错误 === ')
  // 上报
  console.log(message)
  console.log(filename)
  console.log(lineno)
  console.log(colno)
  console.log(error.stack)
})  
```

  &emsp;&emsp;但是使用它需要主要很多的地方：

  - 1、必须声明在需要监控代码之前。
  - 2、Promise 错误无法捕获。
  - 3、静态资源的加载错误 需要在 捕获阶段获取 但是无法获取到最终的请求状态


