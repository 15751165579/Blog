// 处理集合遍历
const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.of(1, 2, 3, 4) // 可观察者

source$.subscribe(console.log) // 观察者