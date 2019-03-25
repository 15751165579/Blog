### 如何实现一个尺寸“听话”的多行输入框

### 一、前言

  &emsp;&emsp;通过创建 textarea 标签，并且指定其 rows 和 cols 属性，就可以创建一个多行文本输入框。

  &emsp;&emsp;但是当输入的内容超过指定的 rows 之后，就会出现滚动条，如果用户想要查看全部内容，那就必须来回的拖动滚动条。而且这个滚动条只有在用户滚动的时候才会出现，在一些情况下，用户可能并不知道该区域有更多的内容。

  &emsp;&emsp;通常情况下，为了给用户一个良好的体验，需要让这个多行输入框的高度自适应，从而避免滚动条带来的问题。


### 二、高度自适应

  &emsp;&emsp;实现高度自适应的输入框的思路很简单：监听输入相关的事件，获取到元素的内容高度，修改 textarea 的固定高度。

  &emsp;&emsp;其中涉及很多基础的知识，也就是我们常说的细节问题处理：

##### 1、scrollHeight

  &emsp;&emsp;scrollHeight 这个只读属性是一个元素内容高度的度量，包括由于溢出的视图中不可见的内容。

  &emsp;&emsp;scrollHeight 包含元素的padding，但是不包含元素的 border 和 margin 。当元素中不存在溢出内容，则 scrollHeight 与 clientHeight 是相同的。

  &emsp;&emsp;接下来只要将获取到的 scrollHeight 属性值赋给元素样式中的 height 属性，就可以动态的更改高度了，但是事情并没有那么简单，这里又要引出另一个基础知识点。

##### 2、box-sizing

  &emsp;&emsp;CSS 中的盒模型基本上是常考的一个知识点，CSS3中可以通过设置 box-sizing 属性值，从而更改盒模型高度和宽度的计算，下面以高度为例：

  - content-box：是默认值。如果你设置一个元素的高度为100px，意味着元素内容区域的高度为100px，如果再设置 padding 和 border ，那么最终元素的高度为 100px + border-top + border-bottom + padding-top + padding-bottom 。
  - border-box：如果你设置一个元素的高度为100px，则意味着元素的最终高度就是100px，而元素内容区域的高度为 100px - border-top - border-bottom - padding-top - padding-bottom 。

  &emsp;&emsp;由此可见，为元素设置样式中的 height 属性时，需要弄清楚元素的 box-sizing 、 padding 以及 border。

##### 3、getComputedStyle

  &emsp;&emsp;对于前端新手来说，要获取到元素样式的 height 属性值，可能第一时间会想到：

```JavaScript
  document.getElementById('demo').style.height
```

  &emsp;&emsp;但是大部分情况下，该属性获取的是空值，因为它只能够获取行内样式，如果 style 属性中并没有设置 height 属性值，那自然就是空值。

  &emsp;&emsp;在 CSS 中，开发者可以通过很多方式去设置元素的样式，并且它们的优先级各不相同，那么就需要一个 API 来确定元素最终的样式，而 Window.getComputedStyle() 方法正是因此而生。

  &emsp;&emsp;Window.getComputedStyle() 方法返回一个实时的 CSSStyleDeclaration 对象，通过调用其 getPropertyValue() 方法，获取相应的属性值：

```JavaScript
  const style = window.getComputedStyle(el)
  style.getPropertyValue('box-sizing')
```

##### 4、实现

```JavaScript
function AutoSize (el) {
  if (!(this instanceof AutoSize)) {
    return new AutoSize(el)
  }
  if (!el) {
    throw new Error('element can not be empty')
  }
  if (typeof el === 'string') {
    el = document.querySelector(el)
  }
  this.el = el
  const attrs = ['box-sizing', 'padding-top', 'padding-bottom', 'border-top', 'border-bottom']

  // 初始化信息
  this.heightOffset = 0
  const style = window.getComputedStyle(el)
  const [boxSizing, paddingTop, paddingBottom, borderTop, borderBottom] = attrs.map(item => style.getPropertyValue(item))
  if (boxSizing === 'content-box') {
    this.heightOffset = -(parseFloat(paddingTop)) - parseFloat(paddingBottom)
  } else {
    this.heightOffset = parseFloat(borderTop)  + parseFloat(borderBottom)
  }
  this.initEvent()
}

AutoSize.prototype = {
  initEvent () {
    this.listener = this.handleAction.bind(this)
    this.el.addEventListener('input', this.listener, false)
  },
  destroy () {
    this.el.removeEventListener('input', this.listener, false)
    this.listener = null
  },
  handleAction (e) {
    const event = e || window.event
    const target = event.target || event.srcElement
    target.style.height = ''
    target.style.height = target.scrollHeight + this.heightOffset + 'px'
  }
}
```

  ![高度自适应效果](./autosize.gif)

  &emsp;&emsp;对于 input 这样高频度触发的事件，一般需要采用函数节流或者函数防抖的方式进行优化，这里就留个同学们自己折腾吧。


### 三、contenteditable

##### 1、简介

  &emsp;&emsp;HTML 中还有一个很特别的属性 -- contenteditable，该属性可以规定当前元素是否可编辑，该属性的取值有以下几种：

  - true 或者空字符串，表示元素是可以编辑的；
  - false 表示元素是不可编辑的；
  - inherit 表明该元素继承了其父元素的可编辑状态。

  &emsp;&emsp;另外，向设置 contenteditable 属性的元素中输入内容时，实际上是向该元素中插入 DOM 元素，并且可以结合 document.execCommand() 方法，所以可以用来开发富文本编辑器，例如：[medium-editor](https://github.com/yabwe/medium-editor)。

  &emsp;&emsp;但是，在这个过程中需要注意很多细节问题，欢迎有这方面开发经验的小伙伴留言讨论。

##### 2、高度自适应

```HTML
  <div contenteditable="true" class="demo" id="js-div" data-placeholder="这是占位文字"></div>
```

  &emsp;&emsp;上述代码仅仅通过指定 contenteditable 属性，就可以实现多行输入框高度自适应的功能，不过正如前面提到的，需要注意诸多的细节问题，下面列举两个简单的问题：（难的，实在处理不了-_-!）

##### 3、placeholder

  &emsp;&emsp;例如上述示例实现的多行输入框就需要我们自己实现 placeholder 的效果：

```CSS
  [contenteditable=true]:empty::before {
    content: attr(data-placeholder);
    color: red;
    display: block;
  }
```

##### 4、value

  &emsp;&emsp;对于 input 和 textarea 标签，可以通过 value 属性值获取用户输入的内容。但是对于设置 contenteditable 属性的元素来说，就需要看情况了：

  - 如果需要获取 HTML 结构，那么就需要采用 innerHTML 属性；
  - 如果仅仅获取文本内容，那么可以考虑 innerText 和 textContent。

  &emsp;&emsp;是不是遇到了一个让你傻傻分不清的两个属性，关于它们的区别主要有：

  - textContent 会获取所有元素的内容，包括 script 和 style 标签元素，而 innerText 不会；
  - innerText 受 CSS 样式的影响，不会返回隐藏元素的文本，而 textContent 会；
  - innerText 返回的文本内容会格式化。

  &emsp;&emsp;综上所述，采用 innerText 属性比较好一点。


##### 5、填空题输入框的实现

  &emsp;&emsp;抛开 contenteditable 属性的诸多问题，它依然有很多的闪光点，例如实现这样一个填空题输入框：

  ![填空题输入框](./tiankongti.gif)
 
### 四、总结

  &emsp;&emsp;虽然 contenteditable 属性可以轻松实现高度自适应的输入框，但是需要处理非常多的细节问题和跨浏览器问题，所以大部分还采用第一种实现方式。