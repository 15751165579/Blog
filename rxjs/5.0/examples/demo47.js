const Rx = require('rxjs/Rx')

// retry(count) 实际上应用并不多 因为它会在发生错误之后 立即重试
const someNumber = value => {
  if (value === 4) {
    throw new Error('some number')
  }
  return value
}

const source$ = Rx.Observable.range(1, 5)

const source1$ = source$.map(someNumber)

const source2$ = source1$.retry(2)

const source3$ = source2$.catch(() => Rx.Observable.of(8))

source3$.subscribe(console.log)