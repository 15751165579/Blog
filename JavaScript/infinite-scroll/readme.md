# 无限滚动列表

### 一、饿了么的实现方式

 &emsp;&emsp;滚动容器的可视高度 + 垂直滚动条高度 与 滚动内容高度的 对比

 - 如何确定滚动容器(默认的 overflow 值为 visible)

```JavaScript
var getScrollEventTarget = function (element) {
  var currentNode = element;
  while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
    var overflowY = getComputedStyle(currentNode).overflowY;
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode;
    }
    currentNode = currentNode.parentNode;
  }
  return window;
};
```

  - 获取可视高度 包含 padding

```JavaScript
var getVisibleHeight = function (element) {
  if (element === window) {
    return document.documentElement.clientHeight;
  }

  return element.clientHeight;
};
```

  - 获取滚动高度（包含溢出内容高度 + padding） scrollHeight

  - 滚动条的高度 scrollY ? pageYOffset ? scrollTop

  - 获取最终的样式 getComputedStyle + getPropertyValue

  - 监听 scroll 事件 

  - 函数节流

  - 是否可以采用 IntersectionObserve 实现