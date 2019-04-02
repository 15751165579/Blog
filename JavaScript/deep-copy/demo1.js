/**
 * 采用 JSON 序列化方法
 */
const obj = {
  student: {
    name: 'xiaohong'
  },
  score: [1, 2, 3]
}

const obj1 = JSON.parse(JSON.stringify(obj))

console.log(obj1.student === obj.student)

// 这种只能对于 普通对象 和 数组对象进行深拷贝