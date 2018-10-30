# RDB

### RBD的创建与载入

  Redis作为内存数据库，一旦程序退出进程，那么保存在内存中的数据就会丢失，显然Redis在程序重启时，仍然可以保留数据，这里就需要了解Redis持久化的相关知识。

  Redis中有两种持久化的方式:

  - RDB
  - AOF

  它们对应的命令有：SAVE、BGSAVE、BGREWRITEAOF。

  通常情况下，AOF的更新频率高于RDB文件更新，默认的配置下，Redis采用RDB持久化，如果开启AOF，那么Redis则优先采用AOF文件还原数据库状态。

  这里的SAVE是一个运行在主进程上的操作，而另外两个命令则是采用子进程的运行方式，为了避免资源竞争的问题，Redis限制了这个三个命令的执行时机。例如：正在执行BGSAVE时，是不可以执行SAVE操作的。

  而当我们重新启动Redis时，它会根据配置RDB或者是AOF来判断通过那种方式还原数据库状态。


### 自动间隙性保存

  在Redis运行的过程中，我们只需要通过配置文件就可以让这些保存操作自动执行。

```s
  save 900 1 # 900秒之内，服务器进行过至少一次修改
  save 300 10 # 300秒之内，服务器进行过至少10次修改
  save 60 10000
```

  当满足以上任意条件，Redis会自动的执行BGSAVE指令。

  当设置上述配置参数，Redis会将这些字段保存在redisServer对象的saveparams中，并且结合：

  - dirty: 记录距离上一次SAVE或者BGSAVE之后，所有数据库进行了多少次修改。
  - lastsave: 记录上一次成功执行SAVE或者BGSAVE命令的时间。

  Redis中的serverCron默认100毫秒执行一次，这里就会结合saveparams和dirty来判断是否应该执行保存操作了。

  