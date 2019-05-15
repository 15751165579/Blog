const Rx = require('rxjs/Rx')

const someNumber = value => {
  if (value === 4) {
    throw new Error('some number')
  }
  return value
}

const source$ = Rx.Observable.range(1,5)

const source1$ = source$.map(someNumber)

const source2$ = source1$.retryWhen(() => Rx.Observable.interval(1000).take(3))

source2$.subscribe(console.log)
