// 异步数据流
const Rx = require('rxjs/Rx')

const source1$ = Rx.Observable.interval(1000)

source1$.map(val => val * 2).subscribe(console.log)