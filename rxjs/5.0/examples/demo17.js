const Rx = require('rxjs/Rx')

// 容易产生数据积压
// 对于合并多个数据流 以最少的数据流为极限
const source1$ = Rx.Observable.of(1, 2, 3)
const source2$ = Rx.Observable.of('a', 'b', 'c')

const source$ = Rx.Observable.zip(source1$, source2$)

source$.subscribe(console.log)