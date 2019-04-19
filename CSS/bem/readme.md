
  CSS 模块化处理中最重要的两点 继承 和 选择器优先级

  [why bem](https://blog.decaf.de/2015/06/24/why-bem-in-a-nutshell/)

  [web-component](https://developers.google.com/web/fundamentals/web-components/customelements)

  BEM Block Element Modifier

```CSS
.block {}
.block__element {}
.block--modifier {}
```

  丑陋的写法经常被诟病

  [BEM syntax](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

  由于 CSS 没有作用域而言 BEM 通过命名唯一的方式解决”样式冲突“

  不允许 子代选择器 以及 后代选择器 ，避免级联造成的权重问题。

  缺点：

  1、书写起来太长（现代编辑器都自带提示）
  2、产生额外的字节大小（gzip可以优化一点）
  

  好处：
  1、嵌套过多 很难阅读
  2、嵌套多 性能变差
  3、复用 

  css-loader module

  vue-loader scoped