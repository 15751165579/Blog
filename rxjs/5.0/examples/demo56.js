const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.timer(0, 1000)

const window$ = source$.window(Rx.Observable.interval(5000))

window$.mergeMap(ob$ => ob$.reduce((acc, cur) => [...acc, cur], [])).subscribe(console.log)