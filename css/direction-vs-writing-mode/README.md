# CSS中流的方向控制

### 改变流向的三大属性

  - direction
  - unicode-bidi
  - writing-mode

### 应用

##### 1、水平方向的margin重叠

  对于块级元素的margin凹陷发生在父子或者兄弟元素的垂直方向，但是我们通过writing-mode属性使水平方向也能发生这样的现象。

##### 2、垂直居中

  块级元素对于通过水平方向的margin:auto，能够实现水平居中，但是对于垂直方向的margin:auto并不能使垂直方向居中，通过writing-mode可以颠倒这样的规则。

##### 3、对于文字排版的影响

  首先对于文字的text-indent可以变成垂直方向上，另外对于字体图标的旋转可以通过writing-mode实现。
