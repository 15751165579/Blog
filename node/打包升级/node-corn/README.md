# 打包升级：node-corn源码解析

> node-corn主要通过提供Corn格式语法执行计划任务。

### 一、前言

  &emsp;&emsp;利用node-corn创建一个每隔3秒执行一次的计划任务：

```javascript
  const CronJob = require('../lib/cron.js').CronJob
  const job = new CronJob('*/3 * * * * *', function() {
    const d = new Date()
    console.log('complete', d)
  })
  job.start()
```

  &emsp;&emsp;接下来带着以下的疑问去读源码：

  - 。。。

### 二、
  