const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.timer(0, 1000)
// 何时触发 closeSelector 函数
// buffer notify Observable 对象
const buffered = source$.bufferWhen(() => Rx.Observable.interval(3000))

buffered.subscribe(console.log)