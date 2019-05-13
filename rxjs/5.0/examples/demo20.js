const Rx = require('rxjs/Rx')
// 同步数据流
const source1$ = Rx.Observable.of(1, 2, 3)
const source2$ = Rx.Observable.of('a', 'b', 'c')

const source$ = Rx.Observable.combineLatest(source1$, source2$)
source$.subscribe(console.log)