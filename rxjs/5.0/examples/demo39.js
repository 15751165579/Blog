const Rx = require('rxjs/Rx')

const source1$ = () => {
  return Rx.Observable.timer(0, 500).take(4)
}

const source2$ = Rx.Observable.timer(0, 2000)

source2$.concatMap(source1$).subscribe(console.log)