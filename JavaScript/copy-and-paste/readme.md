### 前端怎么能不懂粘贴复制

### 一、前言

  &emsp;&emsp;一谈到“粘贴复制”，大家可能会浮现这样的画面：

  &emsp;&emsp;这基本是大牛程序员的日常自黑，暂不讨论这么高深的内容，本篇文章主要介绍一下前端开发中“粘贴复制”相关的知识点以及应用。

  &emsp;&emsp;“粘贴复制”操作主要涉及到两方面的知识：

  - 操作系统剪贴板内容的获取和设置
  - 文本选择

### 二、操作系统剪贴板

  &emsp;&emsp;JavaScript操作剪贴板有以下两种方式：

##### 1、Clipboard API

  &emsp;&emsp;这是一个处于实验中的功能，它提供如下读写操作系统剪贴板内容的方法：

  - read() 读取操作系统剪贴板中的数据；
  - readText() 从剪贴板中读取文本；
  - write() 写入数据至操作系统剪贴板；
  - writeText() 写入文本数据至操作系统剪贴板。

  &emsp;&emsp;需要注意的是这几个方法返回的都是 Promise ，并且调用 Clipboard API 时，需要得到浏览器相关的权限。

  &emsp;&emsp;以读写文本内容为例：

```JavaScript
function readTextFromClipboard () {
  // 查询浏览器是否有读取剪贴板的权限
  navigator.permissions.query({ name: 'clipboard-read' }).then(({ state }) => {
    if (state === 'granted' || state === 'prompt') {
      // 读取内容
      navigator.clipboard.readText().then(data => {
        // 处理获取到的内容
      })
    }
  })
}

function writeTextToClipboard () {
  navigator.permissions.query({ name: 'clipboard-write' }).then(({ state }) => {
    if (state === 'granted' || state === 'prompt') {
      navigator.clipboard.writeText(' Clipboard API').then(() => {
        console.log('写入成功')
      }).catch(() => {
        console.log('写入失败')
      })
    }
  })
}
```

##### 2、document.execCommand

  &emsp;&emsp;document.execCommand 方法允许运行命令来操纵可编辑内容区域的元素。详细的命令列表可以查看[MDN document.execCommand](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand)，这里主要用到其中的 copy 命令。（paste 命令需要在配置文件中设置，这里就不讨论了。）

  &emsp;&emsp;MDN 提到：在调用一个命令前，不要尝试使用返回值去校验浏览器的兼容性。那么只能通过执行时的返回值判断命令是否有效：

```JavaScript
function execCommand (...args) {
  let success = true
  try {
    success = document.execCommand(args)
  } catch (err) {
    success = false
  }
  return success
}
```

  &emsp;&emsp;copy 命令主要是将当前选中的内容拷贝到剪贴板，这对于用户而言，只要用鼠标选中文本，然后再点击按钮触发 execCommand('copy') 方法，即可完成复制的操作，那么通过 JavaScript 代码如何操作文本选中呢？


### 三、文本选择

  &emsp;&emsp;JavaScript中提供 Selection 对象表示用户选择的文本范围或插入符号的当前位置。

```JavaScript
  window.getSelection() // 获取 Selection
```

  &emsp;&emsp;通过上述代码可以获取 Selection 对象，该对象包含以下几个重要属性：

  - anchorNode 选区起点所在的节点；
  - anchorOffset 选区起点在 anchorNode 中的位置偏移量；
  - focusNode 选区终点所在的节点；
  - focusOffset 选区终点在 focusNode 中的位置偏移量。

  &emsp;&emsp;用户在选择同样一段文本时，鼠标的移动方向可能不一样，而上述 anchor 指的是鼠标开始选择的地方，focus 指的是鼠标结束选择的地方。

  &emsp;&emsp;对于 anchor 和 focus 形成的范围（Range），JavaScript 中提供了 document.createRange() 方法来自定义:

```HTML
  <p id="p1">123456789</p>
  <p id="p2">hello world</p>
```

  &emsp;&emsp;通过下述代码，即可模拟用户选中这两段文本：

```JavaScript
  const selection = window.getSelection()
  selection.removeAllRanges()
  const range = document.createRange()
  range.setStart(document.getElementById('p1'), 0)
  range.setEnd(document.getElementById('p2'), 1)
  selection.addRange(range)
```

  &emsp;&emsp;并且 CSS 中也提供选中文本样式的自定义：

```CSS
  p::selection {
    color: red;
  }
```

  &emsp;&emsp;Selection 对象中还提供一些比较常用的方法：

  - selectAllChildren 将某一指定节点的子节点框入选区；
  - containsNode 判断某一个node是否为当前选区的一部分；
  - toString 返回当前选区的纯文本内容。

  &emsp;&emsp;更多内容详见[MDN Selection](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection)。


### 四、应用

  &emsp;&emsp;下面介绍两种常见的应用场景：

##### 1、著作权声明

  &emsp;&emsp;利用 Selection API 可以在用户执行复制操作时，为复制的内容加上著作权和原文链接：

```JavaScript

  document.addEventListener('copy', protectText, false)

  function protectText () {
    const selection = window.getSelection()
    const text = `<br/>作者：xxx<br/>链接：xxxxxx<br/>来源：xxxx<br/>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`
    const newText = selection + text
    const fakerEl = document.createElement('div')
    fakerEl.style.position = 'absolute'
    fakerEl.style.opacity = 0
    fakerEl.style.zIndex = '-99999'
    fakerEl.innerHTML = newText
    document.body.appendChild(fakerEl)
    selection.selectAllChildren(fakerEl)
    setTimeout(() => {
      document.body.removeChild(fakerEl)
      fakerEl = null
    }, 0)
  }
```

##### 2、自动复制

  &emsp;&emsp;








