# if else 与 JS中不太一样
x = 2

if x == 1:
  print('one')
elif x == 2:
  print('two')
else:
  print('other')

# for 循环 类似于JS中的for in，但是JS中的for in 主要用于对象结构
y = ['name', 'age', 'ok']

# 当你需要在for in 中修改正在迭代的序列，最好先制作一个副本
for item in y[:]:
  if len(item) > 3: y.insert(0, item)

print(y)

for item in range(len(y)):
  print(item, y[item])

# range === iterable (start, end, step)

print(list(range(0, 10, 2)))

# break continue 这些和其他语言多差不多

# pass表示什么多不做


# 定义函数

def fib(n):
  a, b = 0, 1
  while a < n:
    print(a)
    a, b = b, a + b
  
fib(1000)

# lambda形式

def make_add (a):
  """
    一般函数内使用这样的注释
  """
  return lambda x: x + a

f = make_add(100)

print(f(20))

print(make_add.__doc__)


