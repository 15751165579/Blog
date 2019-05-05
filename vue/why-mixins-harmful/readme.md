  ### why mixins harmful

    [react mixins harmful](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html)

    采用组合的方式复用代码

    declarative rendering 声明式渲染

    top-down data flow 自顶向下的数据流

    混入 对于后期维护的问题

    - 当组件中调用 mixins 中的方法时，我们并不知道该方法来自 mixins；
    - mixins 不同于层级结构，它是扁平化的，在同一个命名空间中操作，这很大可能上会引起命名冲突问题；
    - 随着业务的不断扩展，mixins 会与组件的耦合程度越来越深；

    几种解决方案

    - high order component 高阶组件
    - render props
    - hooks