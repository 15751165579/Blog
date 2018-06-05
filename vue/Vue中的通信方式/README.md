# Vue中的组件通信方式

### 一、props

  props是我们向组件传递参数的方式，并且可以设置类型检测以及自定义校验规则:

```JavaScript
  props: {
    title: {
      type: String,
      default: '',
      required: true,
      validator: value => value !== 'title'
    }
  }
```

  对于组件内的props的获取，我们可以通过以下三种方式：

  - vm._props.key
  - vm.key
  - vm.$props.key

  实际上，后两者方式是通过代理的方式访问vm._props。

  Vue.2x推荐props采用单向数据流，不推荐在组件内部直接修改props，那么如果我需要修改这些props该如何做呢？

### 二、emit and on

  对于每个Vue实例上多提供了emit和on，这也就是我们熟知的观察者模式。通常在使用的流程是:

  - 通过$on设置监听事件并且设置回调方法
  - 通过$emit触发监听事件并且传入参数

```JavaScript
  this.$on('eventname', callback)
  this.$emit('eventname', params)
```

  > Tip: 大部分情况下我们可能多是通过@evnetname隐式的注册$on。

### 三、v-model

  v-model内部通过根据表单类型不同定义设置相应的$on和$emit，从而达到数据双向绑定的效果。

  为了更加方便开发者的使用，现在我们可以将v-model注册在组件上，通过在props设置value属性，并通过调用$emit触发input事件达到数据双向绑定的效果。

  虽然用起来不错，但是一个组件也就只能有注册一个v-model，如果我们想注册多个呢？

### 四、sync

  sync属性又回来，但是这次我们需要手动的调用$emit方法：

```JavaScript
  // 例: <child :author.sync="author"></child>
  this.$emit('update:author', '小红')
```

  由前面的套路，你可以看得出来sync实际上就是隐式的调用了$on监听了“update:author”事件。

### 五、EventBus

  上面几种方式实际上多是注册在单个的Vue实例上，现在我们可以建立一个事件中心(EventBus)。

```JavaScript
  const bus = new Vue()
  Reflect.defineProperty(Vue.prototype, '$bus', {
    get () {
      return bus
    }
  })
```

  这样我们就可以在这个vue实例上统一注册on和emit方法，不过这里特别需要注意的一点是在组件的beforeDestroy里去销毁注册过的监听函数，以避免重复注册监听函数而导致的多次执行执行问题。

### 六、Vuex

  正如Vue官方文档上所说：Vuex是一个状态管理库，它通过一个共享的状态为我们解决全局变量以及模块之间的通信问题。
