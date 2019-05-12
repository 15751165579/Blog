const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.of(0, 0, 1, 1, 2, 2)


source$.distinct().subscribe(console.log)