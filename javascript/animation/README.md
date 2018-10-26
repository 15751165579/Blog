# Native Web Animation

### 动画的几种方式

  - 位置： translate
  - 缩放： scale
  - 旋转: rotate
  - 透明度: opacity

### 浏览器渲染

  - JavaScript
  - Style
  - Layout -- width, left, top 等
  - Paint -- background, color等
  - Composite -- transform, opacity

  最好的方法就是让动画在Composite阶段执行，那么就需要创建新的Layers:

  - will-change
  - 3D transform
  - animation 2D transforms
  - animation CSS filter

  使用新建Layer层需要注意：

  - 不要创建太多的Layer
  - 每一个Layer都消耗内存
  - 使用在持续动画上
  - 在顶层的layer上执行动画

### 实现动画的方式

  - CSS
  - CSS Variables
  - JavaScript
  - Canvas
  - WebGL
  - Web Animation API


### 参考资料

  - [Web Animation API](https://noti.st/lisi/rIdVN0#s2R4aB5)