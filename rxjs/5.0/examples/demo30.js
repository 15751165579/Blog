const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.of(1, 2, 3)

const source1$ = source$.every(item => item > 0)

source1$.subscribe(console.log)