const { range } = require('rxjs')
const { map } = require('rxjs/operators')

// 不能分开写
const source$ = range(1, 3).pipe(map(item => item * 10))

source$.subscribe(item => console.log(item))
