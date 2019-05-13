// 操作符
// 无 new 创建 create
// map 产生了一个新得 Observable 对象
const Rx = require('rxjs/Rx')

const onSubscribe = observer => {
  observer.next(1)
  observer.next(2)
  observer.next(3)
}

const source$ = Rx.Observable.create(onSubscribe)
source$.map(item => item * 10).subscribe(console.log)

