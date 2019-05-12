const Rx = require('rxjs/Rx')
// 一旦不满足  立即退出
const source$ = Rx.Observable.range(1, 20)

const source1$ = source$.takeWhile(x => x < 5)

source1$.subscribe(console.log)