const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.of(1, 2, 3, 4)

const [x$, y$] = source$.partition(x => x % 2 === 0)

x$.subscribe(console.log)
y$.subscribe(console.log)