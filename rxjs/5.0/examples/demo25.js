const Rx = require('rxjs/Rx')

const source1$ = Rx.Observable.timer(0, 1000).take(2)

const source2$ = Rx.Observable.timer(0, 1000).take(3)

Rx.Observable.forkJoin(source1$, source2$).subscribe(console.log)