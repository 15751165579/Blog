# 多栏布局（multi-column）

### 基础概述

  首先我们要知道多栏布局的基本属性：

  - columns: 这是一个符合属性，是由column-width和column-count组成的，count的优先级大于width。
  - column-gap: 用来定义列与列之间的空隙
  - column-rule: 用来定义列之间的边框样式（类似于border），width、style和color组成
  - column-span: 跨列属性。

### 接下来我们需要研究的问题

  - 多栏布局的出现为了实现什么样的需求？
  - 它的这些用法中的一些特点？（例如width和count， 与border的不同点）
  - 应用 （这里可以去实现几个杂志或者海报的设计）
  - 非主流用法



# 再谈CSS3中的多栏布局（Multi-Columns Layout）

> 多栏布局是CSS3新增布局中的一种，尽管它很低调。


### 明确结构

  多栏布局的结构很简单，主要由multi-column container和column box组成。

  当时一个元素设置了column-width和column-count属性并且值不为auto，那么这个元素就是multi-column container。

  multi-column container内部通过多个column box来展示内容。

### 了解基本用法

##### 1、column-count和column-width

  通过这两个属性，我们可以控制分栏的数目，但是相比较count属性，width属性就显得很灵活。

  当设置width属性之后，并不是说分栏的宽度就是这个固定的值，它还会结合分栏布局容器中的大小灵活的多增少减。

  ![内容的排列顺序](http://o8sux93eg.bkt.clouddn.com/mcl-one.png)

##### 2、column-rule和column-gap

  这两个属性主要帮助我们设置分栏之间的间隙以及分栏的样式，还是比较好理解的：

  ![分栏间隔以及样式](http://o8sux93eg.bkt.clouddn.com/mcl-two.png)

  这里你可以将column-rule的宽度设置的大一些，会有惊奇的发现哦。

##### 3、column-span

  这个属性和table中的span属性差不多，但是它只有none和all两个值，并且它前后的内容都重新排列。

  ![column-span效果](http://o8sux93eg.bkt.clouddn.com/mcl-three.png)

### 浅谈应用

  掌握基础结构和用法之后，现在可以对一篇文章进行漂亮的排版了：

  ![文章排版](http://o8sux93eg.bkt.clouddn.com/mcl-four.png)

  看起来的确不错，但是感觉有那么点怪。

  怪在哪里呢？因为你几乎不会看到展示文章的网站中采用这种方式排版。