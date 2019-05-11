const Rx = require('rxjs/Rx')

// withLatestFrom
const source1$ = Rx.Observable.timer(0, 1000)
const source11$ = source1$.map(item => 'a' + item)
const source12$ = source1$.map(item => 'b' + item)

const source$ = source11$.withLatestFrom(source12$)

source$.subscribe(console.log)

/**
 * 合并相互独立的 Observable 对象，采用 combineLatest
 * 
 * 如果是由一个 Observable 映射出 其它的数据，再合并这些数据，那么就需要采用 withLatestFrom
 * 
 */