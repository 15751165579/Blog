const Rx = require('rxjs/Rx')

const notify = (source$) => {
  return source$.delay(2000)
}

const source$ = Rx.Observable.of(1)
source$.repeatWhen(notify).subscribe(console.log)

// defer 当 Observable 被订阅时，才会被调用

// const source$ = Rx.Observable.defer(() => Rx.Observable.ajax('....'))