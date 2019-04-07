// Set Map 内部都是采用的 SameValueZero 比较算法

const s = new Set()

s.add(1)
s.add(2)
s.add(3)

console.log(s.size)
console.log(s.has(1))
console.log(s.delete(1))
console.log(s.has(1))

// Set 上的 方法 has(value) delete(value) clear() add(value)

// Map 上的方法 set(key, value) get(key) clear() delete(key)

// WeakSet WeakMap 若引用


// Set Map 遍历 都可以采用 keys() values() entries() 以及扩展运算符

// Set 可以用于数组去重

// Set 与 数组之间的转化

const a1 = [1, 2, 3]
const s1 = new Set(a1)

console.log(s1)
console.log([...s1])

// Map 与 Object 的区别

// 1、Object的键只能为 字符串 或者 Symbol ,而 Map任意值
// 2、Map中键值是有序的
// 3、Map 中可以通过 size 获取成员数量
// 4、Map 更容易迭代
// 5、Map 在频繁增删键值对的场景下 性能更好


// Map 与 数组的转化
const a2 = [['name', 'xiaohong'], ['age', 20]]
const m1 = new Map(a2)

console.log(m1)

console.log(Array.from(m1))
console.log(Array.from(m1.values()))