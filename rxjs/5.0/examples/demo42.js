const Rx = require('rxjs/Rx')

const project$ = () => {
  return Rx.Observable.timer(0, 500).take(4)
}

const source$ = Rx.Observable.timer(0, 3000)

source$.exhaustMap(project$).subscribe(console.log)