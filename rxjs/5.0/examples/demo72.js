const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.timer(0, 1000).take(5)

// 与 Publish 的不同点
const sub$ = source$.share()

sub$.subscribe(val => console.log('a ' + val))

setTimeout(() => {
  sub$.subscribe(val => console.log('b ' + val))
}, 5000)