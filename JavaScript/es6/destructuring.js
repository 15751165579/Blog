const [ id, { name: cn , age: cage = 20 }] = [1, { name: 'xiaoming' }]

console.log(id)
console.log(cn)
console.log(cage)

// 交换变量的值
let x = 1;
let y = 2;

[y, x] = [x, y]
console.log(x, y)