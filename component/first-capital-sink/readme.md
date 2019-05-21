# 实现首字下沉样式

### 一、前言

  &emsp;&emsp;在阅读报纸或者杂志时，文章开头第一段话的第一个字的字号特别大，并且伴有下沉显示，这种样式就叫做首字下沉。

  &emsp;&emsp;首字下沉样式既醒目又具有一定的美感，那么对于一个前端开发者，该如何实现呢？

### 二、initial-letter

  &emsp;&emsp;CSS 的 initial-letter 属性可以实现首字下沉的效果，但是遗憾的是：目前只有高版本的 Safari支持该属性。

```CSS
p::first-letter {
  -webkit-initial-letter: 3;
  text-transform: uppercase;
  color: red;
  font-weight: bold;
}
```

  &emsp;&emsp;效果如下：

  ![initial-letter](./initial-letter.jpg)

### 三、float + margin 的 Polyfill 方案

  &emsp;&emsp;对于不支持 initial-letter 属性的浏览器，可以采用 float + margin 的 Polyfill 方案，以下面的 HTML 结构为例：

```HTML
<div class="container">
  <p class="demo2">My father’s family name being Pirrip, and my Christian name Philip, my infant tongue could make of both names nothing longer or more explicit than Pip. So, I called myself Pip, and came to be called Pip.</p>
</div>
```

  &emsp;&emsp;现在可以通过以下三步实现一个跨3行的首字下沉效果。
  
  
  &emsp;&emsp;第一步，预估一下这个首字符的字体大小，由于段落文本具有行间距，那么这里假设首字符的字体大小为410%。

  &emsp;&emsp;第二步，利用 float 属性让首字符左浮动。

  &emsp;&emsp;在进行第三步之前，同学们需要先了解一下中英文绘制的内容区域：

  ![中英文绘制](./font.png)

  &emsp;&emsp;上图是在300px的正方形内绘制的字体大小同样为300px的字符，可以明显的看出字符上下有明显的留白，随着字体越来越大，垂直方向的留白也会越来越多，为了让首字符下沉效果更美观，需要减少这些留白。

  &emsp;&emsp;第三步，采用垂直方向的负值 margin 缩短高度，从而减少字体的留白部分。

```CSS
.demo2::first-letter {
  font-size: 410%;
  font-weight: bold;
  float: left;
  text-transform: uppercase;
  margin: -12px 4px -20px 0;
}
```

  &emsp;&emsp;最终实现的效果为：

  ![float-margin-polyfill](./float-margin-polyfill.jpg)

  &emsp;&emsp;有兴趣的同学可以对比一下没有采用负值 margin 的实现效果。

### 四、JavaScript 实现 initial-letter

  &emsp;&emsp;上述 Polyfill 方案，虽然可以实现需求，但是写代码全靠猜，可不是一个合格前端该干的事情，所以这时候要把 JavaScript 利用起来。

##### 1、连字符与驼峰字符的转化

  &emsp;&emsp;CSS 中的属性名都是采用连字符的格式，而 JavaScript 中操作 CSS 属性名时，需要采用驼峰格式，所以就涉及到了两者之间的相互转换，这里可以采用正则中的分组进行处理：

```JavaScript
/**
 * 驼峰 -> 连字符
 *
 * @param {String} str
 * @returns
 */
function transformCamelToHyphen(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}
/**
 * 连字符 -> 驼峰
 * @param {String} str
 * @returns
 */
function transformHyphenToCamel(str) {
  return str.replace(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
}
```

##### 2、获取段落的样式

  &emsp;&emsp;接下来，需要通过 getComputedStyle 方法获取段落的字体、字体大小以及行高的样式：

```JavaScript
/**
 * 获取元素字体样式
 *
 * @param {HTMLElement} el
 * @returns
 * @memberof FirstCapitalSink
 */
function getFontCSS(el) {
  const _css = window.c(el)
  const cssProperties = ['fontFamily', 'fontSize', 'lineHeight']
  const ret = Object.create(null)
  for (let i = 0, max = cssProperties.length; i < max; i++) {
    const property = cssProperties[i]
    const value = _css.getPropertyValue(transformCamelToHyphen(property))
    ret[property] = value
  }
  return ret
}
```

##### 3、计算首字符占据的高度

  &emsp;&emsp;根据段落的行高和字体大小，可以计算出行距：

```JavaScript
  const { lineHeight, fontSize, fontFamily } = this.getFontCSS(this.el)
  const height = Number.parseInt(lineHeight, 10)
  const lineSpace = height - Number.parseInt(fontSize, 10)
```

  &emsp;&emsp;再根据跨行数，即可计算首字符占据的高度：

```JavaScript
/**
 * 计算总高度
 *
 * @param {Number} rowNumber 行数
 * @param {Number} height 行高
 * @param {Number} lineSpace 行距
 * @returns
 * @memberof FirstCapitalSink
 */
function calculateHeight(rowNumber, height, lineSpace) {
  return height * rowNumber - lineSpace
}
```

##### 4、canvas 计算垂直方向的留白

  &emsp;&emsp;利用 canvas 计算上下留白的思路为：

  - 绘制边长为100px的白色正方形区域；
  - 在该正方形区域上绘制该首字符，其填充色为黑色，字体大小同为100px；
  - 通过 getImageData 方法获取该区域的像素数组，分析出上下黑色边界的坐标，从而计算出垂直方向的留白比例。

  &emsp;&emsp;代码如下：

```JavaScript
/**
 * 判断当前位置是否为黑色
 *
 * @param {Array} imageData 像素数组
 * @param {Number} index 对应一维数组中恶序号
 * @returns
 * @memberof FirstCapitalSink
 */
function isBlack(imageData, index) {
  const firstByte = index * 4
  const red = imageData[firstByte]
  const green = imageData[firstByte + 1]
  const blue = imageData[firstByte + 2]
  return (red === 0 && green === 0 && blue === 0) ? true : false
}
/**
 * 计算字符的上下留白比例
 *
 * @param {String} text
 * @param {String} fontSize
 * @param {String} fontFamily
 * @param {Number} width
 * @param {Number} height
 * @returns
 * @memberof FirstCapitalSink
 */
function calculateEdgeByCanvas(text, fontSize, fontFamily, width, height) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  canvas.width = width
  canvas.height = height

  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0,0, canvas.width, canvas.height)
  ctx.font = `${fontSize} ${fontFamily}`
  ctx.fillStyle = '#000000'
  ctx.textBaseline = 'top'
  ctx.fillText(text, 0, 0)

  const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const imageData = imageDataObj.data
  let startEdgeY, endEdgeY

  startState:
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const index = row * width + col
      if (this.isBlack(imageData, index)) {
        startEdgeY = row
        break startState
      }
    }
  }

  endState:
  for (let row = height; row >= 0; row--) {
    for (let col = 0; col < width; col++) {
      const index = row * width + col
      if (this.isBlack(imageData, index)) {
        endEdgeY = row
        break endState
      }
    }
  }

  return {
    startEdgeYRatio: startEdgeY / height,
    endEdgeYRatio: 1 - endEdgeY / height
  }
}
```

##### 6、更新样式

  &emsp;&emsp;得到首字符上下留白的比例之后，可以计算出字符恰好填充首字所占高度的字体大小：

```JavaScript
  const fz = totalHeight / (1 - startEdgeYRatio - endEdgeYRatio )
```

  &emsp;&emsp;最后，将计算得到的值，更新到相应的样式属性即可：

```JavaScript
/**
 * 将对象转化为 cssText 
 *
 * @param { Object } obj
 * @memberof FirstCapitalSink
 */
function transfromObjectToCSSText(obj) {
  return Object.keys(obj).map(key => `${transformCamelToHyphen(key)}:${obj[key]}`).join(';')
}

// 适当的字体大小
const fz = totalHeight / (1 - startEdgeYRatio - endEdgeYRatio )
const options = {
  float: 'left',
  fontSize: `${fz}px`,
  lineHeight: 1,
  padding: `${lineSpace / 2}px 0`,
  margin: `-${fz * startEdgeYRatio}px 0 -${fz * endEdgeYRatio}px 0` // 负值 margin 减少留白
}
this.el.style.cssText = this.transfromObjectToCSSText(options)
```

### 五、总结

  &emsp;&emsp;本文介绍了实现首字下沉的三种方案：

  - CSS 属性 initial-letter；
  - CSS Polyfill 方案 float + margin
  - JavaScript 实现方案

  &emsp;&emsp;第一种方案的缺陷主要在于兼容性太差，第二种方案又不够灵活。

  &emsp;&emsp;第三种方案通过以下方式解决了第二种方案的痛点：
 
  - 首先利用 getComputedStyle 方法，获取字体、字体大小和行高样式，并且计算出行距以及首字应该占据的高度；
  - 最后利用 canvas 的像素级操作计算出首字填充该高度的适当字体大小。


&emsp;&emsp;**相关文章推荐**

  - [图片懒加载的前世今生](https://juejin.im/post/5c9376506fb9a070fc623b2c)
  - [实现高度“听话”的多行文本输入框](https://juejin.im/post/5c9a1645e51d4559bb5c666f)
  - [前端模拟用户的复制操作](https://juejin.im/post/5cd179586fb9a032045960b6)


