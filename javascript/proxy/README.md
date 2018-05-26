# 快来围观一下JavaScript的Proxy

> 的确写Proxy文章很多，那么今天我也不凑字数了，炒两个栗子吧。

[![](https://badge.juejin.im/entry/5b0938166fb9a07ac23b3118/likes.svg?style=plastic)](https://juejin.im/post/5b09234d6fb9a07acf569905)

### 一、虚拟属性

```JavaScript
  const person = {
    name: 'xiaoyun',
    province: '江苏省',
    city: '南京市'
  }
```

  对于上述对象，我们可能需要地址信息（由省市拼接而成），在此之前我们可能会采取下列方式：
  - 直接在person对象上声明一个address属性；
  - 当用到address信息时，再通过person拼接。

  第一个方法的主要弊端是污染了原有的对象，而第二种方法就很不灵活。现在我们可以通过Proxy实现比较好的效果:

```JavaScript
  const enhancePerson = new Proxy(person, {
    get (target, name) {
      switch (name) {
        case 'address':
          return `${target['province']}-${target['city']}`
        default:
          return target[name]
      }
    }
  })
  enhancePerson.address // 江苏省-南京市
```

  通过这种方式我们就可以实现虚拟属性了，因为它不会被遍历出来：

``` JavaScript
  Object.keys(enhancePerson) // [ 'name', 'province', 'city' ]
```
  这里还有一个我觉得比较容易忽略的点：

```JavaScript
  person === enhancePerson // false
  enhancePerson.city = '苏州市'
  enhancePerson.city === person.city // true
```

  显然这两个并不是同一个对象，但是我通过改变enhancePerson的city属性却影响到了person的city属性，这就是我们通常会忽略掉的，如果你不设置Proxy的set方法，它会保持默认行为：

```JavaScript
  set (target, propKey, value) {
    target[propKey] = value
  }
```

  可能有些同学会想不就是不让它遍历出来吗？看这招：

```JavaScript
  const person = {
    name: 'xiaoyun',
    province: '江苏省',
    city: '南京市',
    get address () {
      return `${this.province}-${this.city}`
    }
  }

  const enhancePerson = new Proxy(person, {
    ownKeys (target) {
      return Object.keys(target).filter(item => item !== 'address')
    }
  })

  enhancePerson.address // 江苏省-南京市
  Object.keys(enhancePerson) // [ 'name', 'province', 'city' ]
```

  虽然是实现了上述的功能，但是Proxy中的ownKeys拦截的方法太多，所以我们拦截ownKeys之后，会导致某些方法无法使用，并且拦截ownKeys返回的结果也有严格的要求：

  - 返回的结果必须是一个数组
  - 并且数组的元素必须是String或者Symbol类型
  - 结果必须包含对象的所有不可配置、自身拥有的属性
  - 如果对象不能扩展，则结果只能包含自身拥有的属性，不能含有其他属性

  所以在拦截方法注意点很多，不然很容易出现问题。

> Tip: 未通过defineProperty定义的属性的描述器属性默认为true，否则默认为false。

### 二、扩展基本操作

  当我第一次接触Python时，比较有印象的就是它的List的一个语法: arr[1:3]，以前只有羡慕的份，现在完全可以自己撸一个：

```JavaScript
  const arr = [1, 2, 3, 4, 5, 6, 7, 8]

  const list = new Proxy(arr, {
    get (target, name) {
      if (name.includes(':')) {
        const indexs = name.split(':')
        return target.slice(indexs[0], indexs[1])
      }
      return target[name]
    }
  })

  list['2:6'] // [ 3, 4, 5, 6 ]
```

  是不是😎，对于对象，我们同样可以采用类似的方法：

```JavaScript
  const obj = {
    a: {
      b: {
        c: 'xiaoyun'
      }
    }
  }

  const obj1 = new Proxy(obj, {
    get (target, name) {
      const keys = name.split('.')
      return keys.reduce((pre, next) => {
        if (pre !== null && pre !== undefined) {
          pre = pre[next]
        }
        return pre
      }, target)
    }
  })
  obj1['a.b.c'] // xiaoyun
```
