// 异步流程
// RX 中使用 的 迭代器是主动推的动作
const Rx = require('rxjs/Rx')

const onSubscribe = observer => {
  let count = 0
  let timer = setInterval(() => {
    if (count < 4) {
      observer.next(count++)
      return
    }
    clearInterval(timer)
    timer = null
    observer.complete()
  }, 1000)
}

const source$ = new Rx.Observable(onSubscribe)

const theObserver = {
  next: item => console.log(item),
  complete: () => console.log('数据已经推送完毕'),
  error: () => console.log('处理错误')
}

source$.subscribe(theObserver)