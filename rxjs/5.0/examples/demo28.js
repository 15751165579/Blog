const Rx = require('rxjs/Rx')

const source1$ = Rx.Observable.of(1, 2, 3, 4, 5, 6)

const source$ = source1$.reduce((x, y) => x + y, 0)

source$.subscribe(console.log)