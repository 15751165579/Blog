const Rx = require('rxjs/Rx')

const notify = () => {
  return Rx.Observable.interval(1000)
}

const source$ = Rx.Observable.of(1, 2, 3)
source$.repeatWhen(notify).subscribe(console.log)
