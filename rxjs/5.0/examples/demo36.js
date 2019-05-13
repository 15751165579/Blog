const Rx = require('rxjs/Rx')

const source1$ = Rx.Observable.interval(1000)

source1$.throttleTime(2000).subscribe(console.log)