const Rx = require('rxjs/Rx')

const someNumber = value => {
  if (value === 4) {
    throw new Error('some number')
  }
  return value
}

const source$ = Rx.Observable.range(1,5)

const source2$ = source$.map(someNumber)

const err$ = source2$.catch(() => Rx.Observable.of(8)).finally(() => console.log('finally'))

err$.subscribe(console.log)