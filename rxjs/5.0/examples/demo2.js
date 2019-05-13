// 迭代器
const Rx = require('rxjs/Rx')

const onSubscribe = observer => {
  observer.next(1)
  observer.next(2)
  observer.next(3)
}

const source$ = new Rx.Observable(onSubscribe) // 可观察者

// 观察者
const theObserver = {
  next: item => console.log(item)
}

source$.subscribe(theObserver)