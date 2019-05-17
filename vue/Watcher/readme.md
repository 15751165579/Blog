### Wacther

  主要作用于  watch api 和 directive 指令


  Dep

  Dep 主要是来管理 Watcher 并且 调用 Watcher 实例上的 update 方法 执行 更新逻辑 

  并且 Dep 上有一个 target 属性来 维护当前的 Watcher 对象

  lifecycle.js -> mountComponent (进行 new Watcher（vm, updateComponent)

  state.js -> initState -> initWatch

  生命周期

  options 中  有 el 才会调用 $mount 方法，

  Vue 根实例多是创建之后 再调用 $mount 方法

  Vue-loader ???