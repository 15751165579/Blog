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