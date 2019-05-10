// combineLatest
// 相比较zip 它比较正常 类似 merge 但是返回的是数组
const Rx = require('rxjs/Rx')

const source1$ = Rx.Observable.timer(0, 1000).map(item => 'a' + item)
const source2$ = Rx.Observable.timer(500, 1000).map(item => 'b' + item)

const source$ = Rx.Observable.combineLatest(source1$, source2$)

source$.subscribe(console.log)