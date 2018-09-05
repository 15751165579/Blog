# 保护Redis

### 指令安全

  Redis一些指令在生产环境中存在很大的隐患：

  - keys: 会造成Redis的卡顿。
  - flushdb/flushall: 删除数据库。

  通过配置文件修改这些指令的别名，达到规避的效果：

```s
  rename-command keys qazxswedc
```

  也可以完成屏蔽掉:

```s
  rename-command keys ""
```

### 端口安全

  必须在配置文件指定监听的IP地址，更进一步可以添加密码访问限制

### Lua脚本安全

  开发者必须禁止Lua脚本由用户输入的内容生成，攻击者可以利用这点植入代码获取Redis的主机权限.

### SSL代理

  常见的使用的是ssh，不过Redis官方推荐使用spiped工具
