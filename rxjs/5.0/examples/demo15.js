const Rx = require('rxjs/Rx')

const source1$ = Rx.Observable.of(1, 2, 3)
const source2$ = Rx.Observable.of(4, 5, 6)
// 可以使用实例方法的方式 或者是静态方法的方式
const source$ = source1$.concat(source2$)
source$.subscribe(console.log)