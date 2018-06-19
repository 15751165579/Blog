"""
  python 类的学习
"""

class Student(object):
  
  def __init__(self, name, age):
    self.name = name
    self.age = age
    self.__name = 'private' # 私有属性

  def say_hi(self):
    print(self.name, ' ---- ', self.age)

s = Student('xiaoyun', 20)

s.say_hi()

print(s.__name)

# python3中继承的区别

class Animal(object):
  pass

class Dog(Animal):
  pass

# 方法的重载 以及多态