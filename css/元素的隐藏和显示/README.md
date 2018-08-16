# 元素的隐藏和显示

### 隐藏元素的方式

- 1、script: script标签是不支持嵌套的，所以放在它里面的元素不会被加载，但是你可通过script.innerHTML获取到
- 2、display:none再经典不过真正意义上的隐藏
- 3、visibility:hidden 元素隐藏，但是其位置信息仍可以获取。
- 4、clip: rect(0,0,0,0) 裁剪绝对定位元素，不能点击
- 5、绝对定位移除可视区域
- 6、z-index: 负数
- 7、opacity: 0
- 8、overhidden: hidden 相当于裁剪了吧。

### display: none;

  display:none在不同的浏览器中其父元素子元素的资源是否加载的区别。以及部分元素天生被display:none的处理（例如style, script 结合contenteditable意想不到的效果）

  HTML5新增的hidden是元素天生display:none;

  display:none不会影响animation，但是天生抗拒transition并且会影响css计数器

### visibility:hidden

  不仅仅是保留空间那么简单。

  visibilty具有传递性，当我们将父级元素设置为visibilty:hidden，子元素之所以也能显示，是因为它具有继承性，当我们将子元素设置为visibiltty: visible；子元素是能显示的。这个可以得到妙用。

  visbility:hidden不会影响到css计数器(counter-reset(name, initial) count-increment(name step) 伪元素的content)

  visiblity:hidden和transition完美结合，并且两者通过延迟动画可以优化hover的用户体验。（例子）

  visibility:hidden可以获取元素的位置信息。并且兼顾无障碍访问。