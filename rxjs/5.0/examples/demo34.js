const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.range(1, 20)

const source1$ = source$.first(
  item => item % 2 === 0,
  (item, index) => item + ' ' + index
)

source1$.subscribe(console.log)