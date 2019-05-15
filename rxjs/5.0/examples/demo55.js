const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.timer(0, 1000).take(10)

const window$ = source$.windowTime(2000)

window$.mergeMap(ob$ => ob$.reduce((acc, cur) => [...acc, cur], [])).subscribe(console.log)