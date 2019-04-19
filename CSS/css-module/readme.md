# CSS 模块化

### 一、前言

  &emsp;&emsp;在面对大规模 CSS 时，开发者不得不思考一下问题：

  - 如何轻松的理解这些样式的用途？
  - 如何复用尽可能多的样式，减少冗余代码？
  - 如何不胆战心惊地维护项目中样式？

  &emsp;&emsp;CSS 模块化开发就是为了解决上述问题。

### 二、常见的 CSS module 思想

  CSS module 的难度在于 选择器的优先级 问题 （不存在局部作用域）

  BEM OOCSS SMACSS

  BEM 强调
  - Block
  - Element
  - Modifier

  只采用 class 最为样式名 （避开选择器优先级的问题）
  为什么不用 id ===> 优先级问题， 不能够重用
  不采用标签选择器 主要能够在不影响样式的情况修改 HTML 标签


  少用 子代选择器 和 后代选择器
  - 可读性大大降低
  - 复用性大大降低
  - 选择器是从右向左开始匹配的，过多的层级必然会影响一些性能。

  SMACSS 区分的更加细致

  布局专用 l-
  模块专用 m-
  状态专用 is-
  助手 h-

  好处：
  1、从根本上杜绝了选择器优先级的问题，不再会出现胆战心惊地去修改一个样式，便于维护。
  2、规范的命名让开发者见名知意，增加了可读性。
  3、将样式拆分之后，更加利于代码的复用。
  4、组件化开发思想（开发者不再以页面为基本单位，而是以网站中的组件为基本单位）

  在实践的过程中，可能大家都是吸取这三个思想中适合自己团队开发的部分

### 三、CSS 预处理器

  Sass ruby
  Less ruby
  Stylus  NodeJS

  主要特点

  1、通过嵌套语法 弥补 书写 子代选择器 以及 后代选择器 的繁琐。
  2、提供变量（现代CSS 也有滴）
  3、合理的重用机制

  Scss:

  1、嵌套选择器 嵌套属性
  2、父级选择器的引用 &
  3、单行注释忽略
  4、支持运算符
  5、变量 $name: value; !default (默认值)
  6、占位字符串 #{$name}
  7、@import 导入其它样式文件
  8、@extend 实现分组选择器的效果 （DRY css）don't repeat your css 减少重复代码，但是会增加选择器之间的联系
  9、@mixin 和 @include 更加灵活（可传入参数）
  10、@function

  例外还有 postcss 平台

### 四、css module 的实现

  shadow dom 为 CSS 提供了局部作用域（shadow dom 中的样式不会泄露到全局，全局样式也不会渗入到shadow dom）

  css module [CSS Module](https://glenmaddern.com/articles/css-modules) 通过 css-loader自动处理

```css
.demo {
  background: red;
}

.module_demo_2nchO : {
  background: red;
}  
```

  css scoped (vue-loader) 本质上采用属性选择器

```css
.demo {
  background: red;
}

.demo[data-v-7ba5bd90] {
  background: red;
}

<div data-v-7ba5bd90 class="demo"></div>
```

### 五、开源框架的实践

  element-theme-chalk 通过 scss 实现 BEM语法

  