const Rx = require('rxjs/Rx')

const source1$ = Rx.Observable.of(1, 2, 3)

source1$.map(x => x * 10).subscribe(console.log)