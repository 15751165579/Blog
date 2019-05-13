const Rx = require('rxjs/Rx')
// 找到第一个满足要求的
const source$ = Rx.Observable.of(1, 2, 3)

const source1$ = source$.find(item => item > 0)

source1$.subscribe(console.log)