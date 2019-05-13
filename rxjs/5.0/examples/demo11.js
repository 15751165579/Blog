// 异步数据流
const Rx = require('rxjs/Rx')
const source$ = Rx.Observable.timer(2000, 1000)
source$.subscribe(console.log)