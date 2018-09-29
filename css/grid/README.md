# CSS3 Grid Layout

> CSS3新增布局三剑客之Grid Layout

### 前言

  相比较Multi-Columns Layout 和Flexible Box Layout，Grid Layuot更像是两者的结合，当然这里并不是说Grid Layout可以取代二者。

  另外Grid Layout与当前非常火热Flexible Box Layout有一个本质上的区别就是维度不一样。在使用Flexible Box Layout使，我们只能通过flex-direction定义主轴沿着某一方向，而在Grid Layout则有两条轴。


### 核心用法

  下面我们一步步去理解Grid Layout中的术语：

##### 1、行与列

  首先我们可以把Grid Layout与table相类比，它也可以看作是由行和列组成, 下面声明一个3行3列的结构。

  ![]()

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

  和其他的布局一样，通过设置display属性为grid或者inline-grid，使得一个元素成为Grid布局容器。最让人疑惑的就是上述grid属性的设置，它实际上等同于下述代码。

```css
  .grid {
    /*
      grid: grid-template-rows / grid-template-columns
    */
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
```

  类比table中的单元格，在Grid Layout中

### 参考资料
 
- [W3C Grid Layout](https://www.w3.org/TR/css-grid-1/)