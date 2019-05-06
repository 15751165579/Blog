# JavaScript 模拟用户的复制操作

### 一、前言

  &emsp;&emsp;用户在浏览网页的过程中执行复制操作的场景是非常多的，例如：复制链接地址、复制分享文案等等。

  &emsp;&emsp;为了优化用户的操作体验，那么就需要深入研究复制操作的机制。

  &emsp;&emsp;复制操作可以分为如下两部分：

  - 选中文本：用户通过鼠标选中文本的操作。
  - 操作系统剪贴板：用户按下 Ctrl（command） + C 的操作。


### 二、选中文本

  &emsp;&emsp;首先，读者需要明白并不是所有的文本都可以被选中的（后续会提到），笔者这里先介绍几个比较容易理解的情况：

##### 1、input 和 textarea

  &emsp;&emsp;由于 input 元素的工作方式因其类型属性的值而有很大的差异，所以这里只讨论 text 的情况。

  &emsp;&emsp;由于 JavaScript 提供了 HTTMLInputElement.select() 方法，所以选中 textarea 和 input 中的内容就变得非常简单：

```JavaScript
  document.querySelector('input').select()
```

  ![select 方法选中 input 元素](./input-select.jpeg)

##### 2、div

  &emsp;&emsp;div 元素并没有 select() 方法，这就需要读者了解一个新的对象： Selection 。

  &emsp;&emsp;Selection 对象表示用户选择文本的范围以及光标的范围。关于 Selection 对象，读者需要了解以下几个术语：

  - 锚点：选区的起始点。
  - 焦点：选区的终止点。
  - 范围：文档中**连续**的一部分。

  &emsp;&emsp;与 Selection 对象息息相关的还有一个 Range 对象，它主要用来定义选区的信息。对于这两个对象不了解的读者，可以查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection)，接下来，利用 Selection 和 Range 对象实现上述 select() 方法的效果：

```JavaScript
  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(document.querySelector('div'))
  selection.removeAllRanges()
  selection.addRange(range)
```

  ![select div元素](./div-select.jpeg)

### 三、操作系统剪贴板

  &emsp;&emsp;document 暴露的 execCommand 方法，可以用来运行命令来操纵可编辑区域的元素。

  &emsp;&emsp;该方法返回的布尔值表示操作是否被支持或者是否被启用，但是调用一个命令之前，不能尝试使用返回值去校验浏览器的兼容性。

```JavaScript
  function copyText () {
    let success = true
    try {
      success = document.execCommand('copy')
    } catch (e) {
      success = false
    }
    return success
  }
```

  &emsp;&emsp;通过 execCommand 执行 copy 命令，将上述选中的文本添加到系统剪贴板中，接下来用户只需要在使用的地方按下 Ctrl（command） + V 即可粘贴该内容。

### 四、






[select.js](https://github.com/zenorocha/select)
