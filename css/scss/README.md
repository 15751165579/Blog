# Scss

### 选择器嵌套 vs 属性嵌套

### 引用父选择符 &

### 占位选择符 解决.class + @extend的坑

### 注释 /**/ 与 // 的区别

### 变量 $

### 支持基本数据结构 和 运算操作

  除号(/)处理 存在变量的情况下 用 #{}包住变量（很多地方都可以用）

### !default 设置变量的默认值

### @import引入文件 文件应该都以下划线开头例如 _grid.scss 引用的时候可以直接采用grid

### @media可以写在选择器的内部 这是一个比较便利的地方

### 条件选择 @if @else if

```scss
  p {
    @if $type == ocan {
      color: blue;
    } @else if $type == monster {
      color: red;
    } @else {
      color: yellow;
    }
  }
```

### @for

```scss
  @for $i from 1 through 3 {
    .item-#{$i} { width: 2em * $i };
  }
```

### @each

```scss
  @each $animal in puma, egret {
    .#{$animal}-icon {
      background-image: url('/images/#{$animal}.png');
    }
  }
```

### @mixin 与 @include

### Arguments参数

### @function @return

### sass的常见坑点

##### 1、嵌套

  对于嵌套的写法一方面使我们省去父级选择器的重复书写，但是有时间却会造成性能和设计上的问题。例子：

```scss
  .nav {
    ul {
      list-type: none;
      li {
        line-height: 20px;
      }
    }
  }

  // 编译之后的
  .nav ul {}
  .nav ul li {}

  // 实际上我们可能这样更好
  .nav ul {}
  .nav li {}
```

  选择器的性能：

  - 浏览器处理选择器是从右往左的；
  - 最右边的称之为关键选择器， 关键选择器越具体，则效率越高。
  - 减少不必要的层级

##### 2、继承

  对于.class + @extend的方式，如果你定义的.class在其他的嵌套选择器中有定义过，则会出现预期之外的效果，所以最好的方式采用%placeholder + @extend的方式。抽离的方式:

```css
  .demo1, .demo2 {
    ...
  }
```