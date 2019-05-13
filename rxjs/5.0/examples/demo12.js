// from
// fromPromise
// fromEvent 处理 dom 事件
const Rx = require('rxjs/Rx')
const Event = require('events').EventEmitter

const event = new Event()

const source$ = Rx.Observable.fromEvent(event, 'msg')

source$.subscribe(console.log)

event.emit('msg', 1)
event.emit('msg', 2)
event.emit('msg-sds', 3)
event.emit('msg', 4)

// 浏览器端的 ajax
// const source1$ = Rx.Observable.ajax('https://api.github.com/repos/ReactiveX/rxjs', {
//   responseType: 'json'
// })

// source1$.subscribe(value => {
//   const starCount = value.response.stargazers_count
//   console.log(starCount)
// })