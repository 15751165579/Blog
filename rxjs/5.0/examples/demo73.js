const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.timer(0, 1000).take(5)

const sub$ = source$.publishLast().refCount()

sub$.subscribe(val => console.log('a ' + val))

setTimeout(() => {
  sub$.subscribe(val => console.log('b ' + val))
}, 5000)