# 常见问题汇总

### 插入数据量的限制

  通常导出excel中数据时，我们采用blukInsert，这里数据库对于导入大量数据是有1M大小限制的，如果你的数据量超出了1M那么就会报错.

  我们可以查看这个限制变量的值：

```s
  show variables like 'max_allowed_packet'
```

  我们可以通过设置该全局变量来满足我们的需求：

```s
  set global max_allowed_packet = 2 * 10 * 1024 * 1024
```
