const Rx = require('rxjs/Rx')

const source1$ = Rx.Observable.timer(0, 1000)
const source$ = source1$.startWith('hhah')

source$.subscribe(console.log)