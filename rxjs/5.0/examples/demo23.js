const Rx = require('rxjs/Rx')

const source1$ = Rx.Observable.timer(0, 2000).map(item => 'a' + item)
const source2$ = Rx.Observable.timer(500, 1000).map(item => 'b' + item)

Rx.Observable.race(source1$, source2$).subscribe(console.log)