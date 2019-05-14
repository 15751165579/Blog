const Rx = require('rxjs/Rx')

// 也可以实现重试的效果
const source$ = Rx.Observable.range(1, 5)

const someNumber = value => {
  if (value === 4) {
    throw new Error('some number')
  }
  return value
}

const source1$ = source$.map(someNumber)

const err$ = source1$.catch((err, error$) => error$)

err$.subscribe(console.log)