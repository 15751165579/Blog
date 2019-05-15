const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.interval(1000)

const buffered$ = source$.bufferCount(5)

buffered$.subscribe(console.log)