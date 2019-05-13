const Rx = require('rxjs/Rx')

const project$ = () => {
  return Rx.Observable.timer(0, 500).take(4)
}

const source$ = Rx.Observable.timer(0, 1000)

source$.mergeMap(project$).subscribe(console.log)