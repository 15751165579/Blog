const Rx = require('rxjs/Rx')
// 效果不一致
const source1$ = Rx.Observable.timer(0, 1000)

const source11$ = source1$.map(item => 'a' + item)

const source12$ = source1$.map(item => 'b' + item)

Rx.Observable.combineLatest(source11$, source12$).subscribe(console.log)