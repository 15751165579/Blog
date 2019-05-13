const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.timer(1000).concat(Rx.Observable.timer(1000))

const source1$ = source$.count()

source1$.subscribe(console.log)