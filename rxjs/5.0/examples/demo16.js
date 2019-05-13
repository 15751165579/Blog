const Rx = require('rxjs/Rx')
// 第一时间订阅上游所有数据 接下来 先到先得 不要用它合并同步数据流
const source1$ = Rx.Observable.timer(500, 1000).map(val => val + 'A')
const source2$ = Rx.Observable.timer(1000, 1000).map(val => val + 'B')

const source$ = Rx.Observable.merge(source1$, source2$)

source$.subscribe(console.log)

// merge 还有可选参数 concurrent