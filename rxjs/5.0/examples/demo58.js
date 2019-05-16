const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.timer(0, 1000)
// multicast 是 底层实现 
// 必须手动触发 connect
const source1$ = source$.multicast(new Rx.Subject())

source1$.subscribe(val => console.log('a ' + val))

setTimeout(() => {
  source1$.subscribe(val => console.log('b ' + val))
}, 2000)

source1$.connect()