// 同步数据流
// create 本质上就是 Observable 构造函数的无 new 写法
// of
// range
// generate
const Rx = require('rxjs/Rx')
const source1$ = Rx.Observable.of(1, 2, 3, 4)
source1$.subscribe(console.log)

const source2$ = Rx.Observable.range(1, 10)
source2$.subscribe(console.log)

// generate 是 for 声明式的处理
const source3$ = Rx.Observable.generate(
  2,
  val => val < 10,
  val => val + 2,
  val => val * val,
)
source3$.subscribe(console.log)

// repeat 产生了 10 新的 Obserable 反复重复上游 Observable 对象
const source4$ = Rx.Observable.of(1, 2, 3)
source4$.repeat(10).subscribe(console.log)

// empty 创建一个直接完结的 Observable 对象
// throw 创建一个 Observale 对象，直接抛错
// never 创建一个什么都不做的 Observale 对象

