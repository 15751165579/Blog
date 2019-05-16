const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.timer(0, 1000).take(5)
// 数据缓存下来 用来录播 这样就不要重新订阅上游数据
const sub$ = source$.publishReplay().refCount()

sub$.subscribe(val => console.log('a ' + val))

setTimeout(() => {
  sub$.subscribe(val => console.log('b ' + val))
}, 5000)