# CSS并不简单：多栏布局（Multi-Columns Layout）

> 多栏布局是CSS3新增布局中的一种，尽管它很低调。


### 一、明确结构

  &emsp;&emsp;多栏布局的结构很简单，主要由multi-column container和column box组成。

   &emsp;&emsp;当一个元素设置了column-width和column-count属性并且值不为auto，那么这个元素就是multi-column container。

  &emsp;&emsp;multi-column container内部通过多个column box来展示内容。

### 二、了解基本用法

##### 1、column-count和column-width

   &emsp;&emsp;通过这两个属性，我们可以控制分栏的数目，但是相比较count属性，width属性就显得很灵活。

   &emsp;&emsp;当设置width属性之后，并不是说分栏的宽度就是这个固定的值，它还会结合分栏布局容器中的宽度灵活的多增少减。

  ![内容的排列顺序](http://o8sux93eg.bkt.clouddn.com/mcl-one.png)

##### 2、column-rule和column-gap

   &emsp;&emsp;这两个属性主要帮助我们设置分栏之间的间隙以及分栏的样式，还是比较好理解的：

  ![分栏间隔以及样式](http://o8sux93eg.bkt.clouddn.com/mcl-two.png)

   &emsp;&emsp;这里你可以将column-rule的宽度设置的大一些，会有惊奇的发现哦。

##### 3、column-span

   &emsp;&emsp;这个属性和table中的span属性差不多，但是它只有none和all两个值，并且它前后的内容都得按照分栏布局规则重新排列。

  ![column-span效果](http://o8sux93eg.bkt.clouddn.com/mcl-three.png)

### 三、浅谈应用

   &emsp;&emsp;掌握基础结构和用法之后，现在可以对一篇文章进行漂亮的排版了：

  ![文章排版](http://o8sux93eg.bkt.clouddn.com/mcl-four.png)

   &emsp;&emsp;看起来的确不错，但是感觉有那么点怪。

   &emsp;&emsp;怪在哪里呢？因为你几乎不会看到展示文章的网站中采用这种方式排版。（为了验证这一点特地查看了大部分的杂志或者新闻网站）。

   &emsp;&emsp;其实看到这种多栏布局，我第一时间想到的是古书的排版，那么我们可以采用这种分栏布局实现古书的排版方式：

```css
  .demo {
    width: 300px;
    margin: 100px auto;
    columns: 10;
    column-rule: 1px dashed rgb(213,213,213);
    direction: rtl;
    word-wrap: break-word;
    text-align: center;
  }
```

  ![采用多栏布局的古书风格](http://o8sux93eg.bkt.clouddn.com/%E5%BE%AE%E4%BF%A1mcl-5.png)

  &emsp;&emsp;在采用多栏布局的方式实现这种效果时需要注意：

  - 每一栏的宽度必须控制在一个字左右，所以这里对于容器的宽度有严格的要求；
  - 通过word-wrap: break-word属性使中文的标点符号换行；

  &emsp;&emsp;那么不用多栏布局是否也能实现上述的排版呢？当然可以！并且我们又要认识一个新的CSS3成员 -- writing-mode：

```css
  .demo {
    width: 180px;
    margin: 50px auto;
    height: 170px;
    line-height: 30px;
    font-size: 16px;
    letter-spacing: 1px;
    writing-mode:vertical-rl;
    background: repeating-linear-gradient(to left, #000, #000 3%, #FFF 3%, #FFF);
    background-size: 30px 100%;
  }
```

  ![writing-mode结合渐变背景](http://o8sux93eg.bkt.clouddn.com/mcl-6.png)

  &emsp;&emsp;这里唯一值得诟病的就是分栏的样式不能像分栏布局中的column-rule那样灵活的变动。

  &emsp;&emsp;CSS总是给人很神奇的感觉，接下来我们用多栏布局实现九宫格布局：

  ![多栏布局实现九宫格](http://o8sux93eg.bkt.clouddn.com/mcl-7.png)

  &emsp;&emsp;它最大的缺点已经通过图中的数字展示的清清楚楚，实际上在实现这样的布局时，特别需要注意的就是子元素垂直方向margin造成的影响，这个就留给读者自己去实践吧。

### 四、总结

  &emsp;&emsp;作为CSS3中新增的布局方式，相比较并没有flex那么引人注目，主要由于它解决的痛点相对比较的偏，但是从上述实现的九宫格布局不难看出它还是能搞点事情的。
