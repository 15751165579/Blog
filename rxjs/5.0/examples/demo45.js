const Rx = require('rxjs/Rx')
// catch 可以对错误进行 恢复  也就是给错误值一个默认值的 一旦触发错误，那么就会对上游数据进行退订
const source$ = Rx.Observable.range(1, 10)

const someNumber = value => {
  if (value === 4) {
    throw new Error('some number')
  }
  return value
}

const error$ = source$.map(someNumber)

const source1$ = error$.catch(() => Rx.Observable.of(8))

source1$.subscribe(console.log)
