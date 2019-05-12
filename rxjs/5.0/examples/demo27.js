const Rx = require('rxjs/Rx')

const source1$ = Rx.Observable.of(1, 2, 3)

const source$ = source1$.max()

source$.subscribe(console.log)