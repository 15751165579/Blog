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