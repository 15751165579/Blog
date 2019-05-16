const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.timer(0, 1000).take(6)

const sub$ = source$.publish().refCount()

sub$.subscribe(val => console.log('a ' + val))

setTimeout(() => {
  sub$.subscribe(val => console.log('b ' + val))
}, 3000)