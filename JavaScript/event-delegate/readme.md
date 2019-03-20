### 前端小贴士 - 事件委托

### 一、什么是事件委托？

  &emsp;&emsp;通常情况下，注册事件程序有两种方式：

  - DOM0级事件处理程序，例如：onclick；
  - DOM2级事件处理程序，addEventListener。

  &emsp;&emsp;但是当页面中存在大量的事件处理程序时，会造成以下问题：

  - 这两种注册事件处理程序的方式都需要先查询具体的元素，而大量的DOM查询操作会影响网站的性能。
  - 大量的事件处理程序函数占用大量的内存。

  &emsp;&emsp;为了优化上述问题，可以利用事件冒泡的机制，只指定一个事件处理程序，管理某一类型的所有事件，这种事件注册的方式叫做事件委托。

### 二、简单示例

  &emsp;&emsp;在实际的开发过程中，经常会遇到列表的处理，在此之前，你会为每一个列表项注册事件处理程序，现在应该采用事件委托的方式进行优化。

  &emsp;&emsp;首先需要为每一个列表项加上标识符，以便在事件冒泡阶段区别是哪一个列表项：

```HTML
<ul id="js-list">
  <li>
    <button data-id="1">删除</button>
  </li>
  <li>
    <button data-id="2">删除</button>
  </li>
  <li>
    <button data-id="3">删除</button>
  </li>
</ul>
```

  &emsp;&emsp;事件委托的书写方式：

```JavaScript
const el = document.getElementById('js-list')

el.addEventListener('click', handleClick, false)

function handleClick (e) {
  const { target } = e
  if (target.tagName.toLowerCase() === 'button') {
    const id = target.dataset.id
    console.log(`删除id为 ${id} 的列表项`)
  }
}
```

### 三、事件委托的封装

  &emsp;&emsp;从上述示例中，可以发现事件委托的核心就是在事件冒泡阶段确定目标事件元素；

  &emsp;&emsp;对于这一点可以采用DOM中的扩展方法Element.matches()来判断当前元素是否与选择器字符串匹配：

```JavaScript
const DOCUMENT_NODE_TYPE = 9
// 有一些浏览器使用前缀, 在非标准名称  matchesSelector () 下实现了这个方法!
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
  const proto = Element.prototype
  proto.matches = proto.matchesSelector || proto.msMatchesSelector || proto.webkitMatchesSelector || proto.mozMachesSelector
}

// 寻找事件目标元素
function closest (el, selector) {
  while (el && el.nodeType !== DOCUMENT_NODE_TYPE) {
    if (typeof el.matches === 'function' && el.matches(selector)) {
      return el
    }
    el = el.parentNode
  }
}
```

  &emsp;&emsp;接下来只要劫持事件处理程序，插入这段处理逻辑即可：

```JavaScript
function delegate (el, selector, type, callback) {
  if (typeof el === 'string') {
    el = document.querySelector(el)
  }
  const listenerFn = listener.apply(this, arguments)
  el.addEventListener(type, listenerFn, false)

  return {
    destroy () {
      el.removeEventListener(type, listenerFn, false)
    }
  }
}


function listener (el, selector, type, callback) {
  // 利用闭包的方式劫持事件处理程序
  return function (e) {
    e.delegateTarget = closest(e.target, selector)

    if (e.delegateTarget) {
      callback.call(el, e)
    }
  }
}
```

### 四、写在最后

  &emsp;&emsp;事件委托作为提升网站性能的一种方式，大家掌握了吗！