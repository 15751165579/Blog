const Rx = require('rxjs/Rx')

// 缓存窗口 数据无损 背压处理
// window 直接返回一个 Observable
// buffer 缓存数据之后再返回

const source$ = Rx.Observable.interval(1000)
// 5秒内 前2.5秒的数据流
const buffered = source$.bufferTime(2500, 5000)

buffered.subscribe(console.log)

