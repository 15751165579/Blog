const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.range(1, 20)

source$.filter(x => x % 2 === 0).subscribe(console.log)