# 输出的美化

# 经常使用print

print('name', 'xiaoyun')

# format

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

for item in arr:
  print('{0:1d} {1:2d}'.format(item, item * item))

# 文件读写

f = open('./test.txt', 'r')

print(f.read())

f.close()

f = open('./test.txt', 'w')

f.write('new content')

f.close()