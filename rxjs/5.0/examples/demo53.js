const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.timer(0, 1000)

// 每隔5秒钟 收集接下来2.5内的数据流
// openings 开启缓冲区的通知
// closingSelector
const buffered = source$.bufferToggle(Rx.Observable.interval(5000), () => Rx.Observable.interval(2500))

buffered.subscribe(console.log)

