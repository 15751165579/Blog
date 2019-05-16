const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.timer(0, 1000).take(5)

// 给一个默认值
const sub$ = source$.publishBehavior(-1).refCount()

sub$.subscribe(val => console.log('a ' + val))

setTimeout(() => {
  sub$.subscribe(val => console.log('b ' + val))
}, 3000)