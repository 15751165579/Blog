# harmful
def number_of_evil_robots_attacking():
  return 10
def should_raise_shields():
  return number_of_evil_robots_attacking()

if should_raise_shields() == True:
  print('Shields raise')
else:
  print('Safe! No giant robots attacking')

# idiomatic
if should_raise_shields():
    print('Shields raise')
else:
  print('Safe! No giant robots attacking')

# hramful
is_generic_name = False
name = 'Tom'
if name == 'Tome' or name == 'Dick' or name == 'Harry':
  is_generic_name = True

# idiomatic
is_generic_name = name in ('Tom', 'Dick', 'Harry')

# harmful
my_container = ['Larry', 'Moe', 'Curly']
index = 0
for element in my_container:
  print('{} {}'.format(index, element))
  index += 1

# idiomatic
for index, element in enumerate(my_container):
  print('{} {}'.format(index, element))

# harmful
def f(a, L = []):
  L.append(a)
  return L

print(f(1))
print(f(2))
print(f(3))

# idiomatic
def f(a, L = None):
  if L is None:
    L = []
  L.append(a)
  return L
print(f(1))
print(f(2))
print(f(3))


# *args **kwargs
def f(*args, **kwargs):
  print(args)
  print(kwargs)

f(1, 2, 3, 4, name='xiaoyun', age=20)

# 列表推导式

some_other_list = range(10)

some_list = [ x + 10 for x in some_other_list]

print(some_list)

# 使用* 这里可以不使用切片
some_list = ['a', 'b', 'c', 'd', 'e']
(first, second, *rest) = some_list
print(first)
print(second)
print(rest)

# 字典推导式

some_obj = { 'name': 'xiaoyun', 'age': 20}

some_reverse_obj = { value: key for key, value in some_obj.items()}

print(some_reverse_obj)

# 使用 format 对于 string的格式化

info = { 'name': 'xiaoyun', 'age': 20 }

print('我的名字叫 {0}, 今年 {1} 岁'.format(info['name'], info['age']))

# join方法通过list生成一个字符串

# 字符串上的方法可以链式调用

# 类重载__str__ 影响print使用

class Student(object):
  def __init__(self, name, age):
    self.name = name
    self.age = age
  def __str__(self):
    return ('我的名字叫{0}, 今年{1}岁'.format(self.name, self.age))

s = Student('xiaoyun', 20)

print(s)

# set推导式

some_set = ['xiaoming', 'xiaoyun', 'xiaodong', 'xiaowen', 'xiaoyun']

some_other_set = { item for item in some_set }

print(some_other_set)


# 对于全局常量 通常采用全大写变量
