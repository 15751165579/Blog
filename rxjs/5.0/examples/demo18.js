const Rx = require('rxjs/Rx')

const source1$ = Rx.Observable.timer(0, 1000).map(item => 'a' + item)
const source2$ = Rx.Observable.timer(500, 1000).map(item => 'b' + item)

const source$ = Rx.Observable.zip(source1$, source2$)

source$.subscribe(console.log)

