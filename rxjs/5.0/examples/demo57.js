const Rx = require('rxjs/Rx')

const source1$ = Rx.Observable.timer(0, 1000).take(5)
// subject 作为中间件 扮演双重角色
// 一旦终结 就终结了
const subject$ = new Rx.Subject()

source1$.subscribe(subject$)

subject$.subscribe(val => console.log('a ' + val))

setTimeout(() => {
  subject$.subscribe(val => console.log('b ' + val))
}, 2000)
