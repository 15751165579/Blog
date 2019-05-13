// 操作符的实现要点
// 1、返回一个全新的 Observable 对象
// 2、对上游和下游订阅及退订处理
// 3、处理异常情况
// 4、及时释放资源

// 操作符与 Observable 关联的缺点
// 1、通过 prototype 打补丁 导致全局的 Obserable 发生改变
// 2、this 与 纯函数是不是冲突
// 3、使用 call bind 造成类型检查的困惑

// rxjs 5.5 通过 lettable（pipeable）的方式显式传入 Observable 对象，替换 this 从而满足 this
// 并且这种方式有助于 Tree Shaking