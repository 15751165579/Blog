// 退订
// 作为 Observable 的 source$ 并没有被终结 因为始终没有调用 complete ， 只是不会调用 next
const Rx = require('rxjs/Rx')

const onSubscribe = observer => {
  let count = 0
  let timer = setInterval(() => {
    console.log('数据流')
    observer.next(count++)
  }, 100)
  return {
    unsubscribe: () => {
      clearInterval(timer)
      timer = null
    }
  }
}

const source$ = new Rx.Observable(onSubscribe)

const theObserver = {
  next: item => console.log(item)
}

const subscription = source$.subscribe(theObserver)

setTimeout(() => {
  console.log('取消订阅')
  subscription.unsubscribe()
}, 2000)