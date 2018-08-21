# GeoHash

### 介绍

  业界比较通用的地理位置距离排序算法是GeoHash算法，Redis也使用了GeoHash算法。该算法将二维的经纬度数据映射到一维的整数，这样所有的元素都挂载一条直线上。当需要查看【附近的xxx】时，只需要将二维坐标映射到直线上，寻找周围的点就行了。这里需要注意的是：二维坐标映射为一维是有损的，但是这种误差在我们的接受范围内。

### 使用

```s
  # 添加操作 （没有删除操作）
  geoadd company 116.514203 39.905409 juejin

  # 可以添加多个
  geoadd company 116.562108 39.787602 jd 116.334255 40.027400 xiaomi

  # 计算地理位置之间的距离
  geodist company juejin ireader km

  # 获取某个地理位置
  geopos company juejin

  # 获取地理位置的hash值 
  geohash company juejin
```

  得到hash值后，可以登录（http://geohash.org/wx4g52e1ce0）查看地理位置。接下来，就需要查看附近的公司了。

```s
  # 获取ireader方圆20km内的公司，并且按照升序排列
  georadiusbymember company ireader 20 km count 3 asc

  # 降序，这里就不一定包含自己了
  georadiusbymember company ireader 20 km count 3 desc

  # 获取地理位置的详细信息
  georadiusbymember company ireader 20 km withcoord withdist withhash count 3 asc
```

  Redis还提供根据坐标查询周围元素，这个作用更加大。

```s
  # 查询周围的元素
  georadius company 116.514202 39.905409 20 km withdist count 3 asc
```

### 实践的注意点

  Redis中Geo数据结构的数据都是放在zset集合中，单个key的大小最好不要超过1M，对于数据比较大的最好是单独的Redis实例，或者将单个key进行拆分。