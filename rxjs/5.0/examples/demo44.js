const Rx = require('rxjs/Rx')

const source$ = Rx.Observable.of(
  {
    id: 1,
    name: '123'
  },
  {
    id: 2,
    name: '123456'
  },
  {
    id: 2,
    name: '2222'
  },
  {
    id: 1,
    name: 'sdashdhshja'
  }
)

source$.groupBy(x => x.id).flatMap(group$ => group$.reduce((acc, cur) => [...acc, cur], [])).subscribe(console.log)