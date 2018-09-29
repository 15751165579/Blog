# 愿只有一个Grid Layout

> CSS3新增布局三剑客之Grid Layout

### 一、前言

  相比较Multi-Columns Layout 和Flexible Box Layout，Grid Layuot更像是两者的结合，当然这里并不是说Grid Layout可以取代二者。

  另外Grid Layout与当前非常火热的Flexible Box Layout有一个本质上的区别就是维度不一样。在使用Flexible Box Layout时，我们只能通过flex-direction定义主轴沿着某一方向，而在Grid Layout中截然不同。


### 二、核心用法

  下面一步步去了解Grid Layout的核心用法：

##### 1、宏观角度

  宏观上可以将Grid Layout看成由行和列组成，这一点可以类比HTML中的table标签，接下来用Grid语法声明一个3行3列的结构。

  ![](http://o8sux93eg.bkt.clouddn.com/grid-row-column.png)

```css
  .grid {
    display: grid;
    width: 300px;
    height: 300px;
    margin: 0 auto;
    grid: repeat(3, 1fr) / repeat(3, 1fr);
  }
  .grid > div:nth-child(odd) {
    background-color: #f5f5f5;
  }
  .grid > div:nth-child(even) {
    background-color: #eee;
  }
```

  通过设置display属性为grid或者inline-grid，可以使得该元素变成Grid布局容器，这基本是新增布局声明的一个通用套路。
  
  上述grid属性是一个复合属性，等价下面的代码。

```css
  .grid {
    /*
      grid: grid-template-rows / grid-template-columns
    */
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
```

  fr是Grid Layout中新增的单位，可以类比Flexible Box Layout中的flex-grow属性。

  上述九宫格中的每一个小格子在Grid中有一个专门的术语 -- Grid Cell。

##### 2、微观角度

  从微观的角度去看Grid Layout，首先你需要了解另一个术语 -- Grid Line。

  不知道读者们有没有看过制作豆腐的过程，其中有一个步骤是用线将整块的豆腐割开，那条线和上述的Grid Line是一样一样的。

  ![Grid Line](http://o8sux93eg.bkt.clouddn.com/grid-line.png)

  那么我们前面所说的行与列就需要用一个更专业的术语来描述 -- Grid Track。

  Grid Track实际上就是相邻的两条Grid Line所形成的区域。

  在Grid Layout中是看不见Grid Line的，但是可以使用它，它默认是数字编号的形式，还记得上面的九宫格布局吗？通过设置display和grid属性，只是将容器划分了结构，但是并没有设置子元素的放置方式，幸好Grid Layout会为每一个子元素设置一个默认位置，例如第一行第一列的元素会这样设置。

```css
  /* grid-area: grid-row-start / grid-column-start / grid-row-end / grid-column-end */
  grid-area: 1 / 1 / 2 / 2;
```

  上述的数字就是Grid Line的编号，并且它还支持自定义命名。

```css
  .grid {
    position: relative;
    margin: 100px auto;
    width: 500px;
    height: 500px;
    display: grid;
    grid: [line-row-1]1fr[line-row-2]1fr[line-row-3]1fr[line-row-4] / [line-col-1]1fr[line-col-2]1fr[line-col-3]1fr[line-col-4];
  }
  .grid > div:nth-child(1) {
    grid-area: line-row-1 / line-col-1 / line-row-4 / line-col-3;
  }
```

  ![Grid Line 命名](http://o8sux93eg.bkt.clouddn.com/grid-line-named.png)

##### 3、Grid Area

  Grid Area也是一个比较重要的术语， 它主要由一个或者多个Grid Cell组成。前面的例子中，我们已经看到可以通过Grid Line为Grid Area分配空间，并且它还有另一种使用的方式。

```css
  .grid {
    position: relative;
    margin: 100px auto;
    width: 500px;
    height: 500px;
    display: grid;
    grid: "first  first  second" "first  first  fouth" "first  first  third";
  }

  .grid > div:nth-child(1) {
    grid-area: first;
  }
  .grid > div:nth-child(2) {
    grid-area: second;
  }
  .grid > div:nth-child(3) {
    grid-area: third;
  }
  .grid > div:nth-child(4) {
    grid-area: fouth;
  }
```

  同样是上述的例子，我们可以这样放置子元素，是不是特别的友好。

##### 4、绝对定位在Grid Layout中的表现
  
  绝对定位大家应该很熟悉，其位置主要由包含块或者初始化包含块决定，通常我们都是通过设置父级元素的position属性来确定包含块，但是在Grid Layout中可以通过grid-area属性达到同样的效果。

```css
  .grid {
    position: relative;
    width: 400px;
    height: 400px;
    margin: 100px auto;
    display: grid;
    grid: repeat(2, 1fr) / repeat(2, 1fr);
    border: 1px dashed red;
    padding: 10px;
  }

  .demo1 {
    grid-area: 2 / 1 / 3 / 2;
    position: absolute;
    top: 30px;
    left: 30px;
    width: 100px;
    height: 100px;
    background: red;
  }
```

  ![](http://o8sux93eg.bkt.clouddn.com/absolute-in-grid.png)

##### 5、其它

  理解上面介绍的几个术语和用法之后，基本上Grid Layout也没有那么神秘了。另外，例如Grid item之间的间隙以及它们的排列方式，基本上和Flexible Box Layout大同小异。

  不过Grid Layout中还有很多好玩的知识点，例如margin凹陷的特性在Grid Layout中并不会发生。这些就留给读者自己去探索吧。

### 三、最后

  为什么会起这个标题呢？主要是因为现在大部分的UI组件库基本上都提供grid组件，就拿比较流行的Bootstrap组件库来说，grid组件的实现：

  - .row设置行，.col-*设置一个百分比宽度的列；
  - .row通过负外边距抵消容器的padding;
  - .col通过左右内边距实现元素之间的间隙效果；
  - 通过媒体查询设置断点（breakpoints）实现响应式的布局；

  而CSS3新增的这个Grid Layout相比较这些实现方式，可以说是非常优秀了。相信不久我们可以告别Grid-Framework，只有一个CSS3的Grid Layout。

### 参考资料
 
- [W3C Grid Layout](https://www.w3.org/TR/css-grid-1/)
- [大漠老师的《使用CSS Grid的九大误区》里面整理了很多参考资料](https://www.w3cplus.com/css/9-biggest-mistakes-with-css-grid.html)
- [上述所有用例的代码](https://github.com/15751165579/Blog/tree/master/css/grid)

如果看官赏脸的话，可以关注在下的订阅号ε=ε=ε=┏(゜ロ゜;)┛：

![](http://o8sux93eg.bkt.clouddn.com/qrcode.jpg)