"""
  列表
  append(el) 类似于JS的push
  extend(list) 类似于JS的concat
  insert(index, el) 类似于JS的splice中的插入功能
  remove(el) 移除第一个找到的x
  pop(index)
  index(el)
  count(el)
  sort()
  reverse()
"""
from collections import deque
a = [2, 3, 1, 4, 6, 5]

b = [9, 7]

a.append(10)

print(a)

a.extend(b)

print(a)

a.insert(0, 20)

print(a)

a.remove(1)

print(a)

a.pop(2)

print(a)

a.sort()

print(a)

a.reverse()

print(a)

# 把列表当做堆栈使用 后入先出

# 如何使用队列呢
queue = deque(['name', 'age', 'people'])

queue.append('ok')

print(queue)

print(queue.popleft())

print(queue)

# 列表推导式

x = [1, 2, 3, 4]

print([3 * x for x in x])

print([[item - 1, item + 1] for item in x])

print([x for x in x if x > 2])

# 在列表推导式中使用元组必须结合括号

print([(item * 10, item * 100) for item in x])

# 列表推导式是可以嵌套的

y = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

print([[row[i] for row in y] for i in range(len(y))])

# 现实中你应该使用内建函数 处理
print(list(zip(*y)))

# del 删除

c = [1, 2, 3, 4, 5, 6]

del c[0]

print(c)

del c[1:3]

print(c)

# 元组

d = 1, 2, 3

print(d)

# 集合

basket = { 'apple', 'orange', 'pear', 'apple'}

print(basket)

print('orange' in basket)

# - a中有 b中没有的；| 并集；& 交集; ^ a或者b中只有一个有的

num1 = {1, 2, 3, 4, 5}
num2 = {4, 5, 6}

print(num1 - num2)

print(num1 | num2)

print(num1 & num2)

print(num1 ^ num2)

# 字典

obj = { 'name': 'xiaoyun', 'age': 20 }

print(list(obj.keys()))

print(sorted(obj.keys()))

# 元组转化为 字典

print(dict([('name', 'xiaoyun'), ('age', 20)]))


# 遍历的技巧

# 对于字典

for key, value in obj.items():
  print(key, value)

# 对于列表

for index, value in enumerate([1, 2, 3]):
  print(index, value)

# 对于多个列表的遍历

l1 = ['name', 'age', 'city']
l2 = ['xiaoyun', 20, 'nj']

for key, value in zip(l1, l2):
  print(key, value)

# 反向遍历则使用 reversed
