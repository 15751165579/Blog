###  前端怎么能不懂复制

### 光标处理

  &emsp;&emsp;JavaScript中操作光标主要通过window.getSelection()方法，该方法会返回一个Selection对象，该对象中比较重要的属性如下：

  - anchorNode：选区起点所在的节点。
  - anchorOffset: 选区起点在anchorNode中的位置偏移量。
  - foucsNode: 选区终点所在的节点。
  - focusOffset: 选区终点在focusNode中的位置偏移量。


  &emsp;&emsp;特别需要注意的是anchorOffset的值可能会由于鼠标拖拽的方向不同，从而大于focusOffset的值。

```JavaScript
  const selection = window.getSelection()
  selection.toString() // 选中的文本
```

  &emsp;&emsp;通过toString()可以获取到选区内纯文本的内容。
