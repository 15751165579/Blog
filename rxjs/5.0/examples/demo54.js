const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.timer(0, 1000)

const buffered$ = source$.buffer(Rx.Observable.interval(2000))

buffered$.subscribe(console.log)