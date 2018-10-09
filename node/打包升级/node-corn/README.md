# 打包升级：node-corn源码解析

> node-corn主要通过提供Corn格式语法执行定时任务。

### 一、前言

  &emsp;&emsp;利用node-corn创建一个每隔3秒执行一次的定时任务：

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

### 二、CronJob

##### 1、传参方式

  &emsp;&emsp;大部分的开源库在API的调用上都会支持两种传参方式。

  - 载荷形式：a, b, c
  - 对象形式：{ a: a, b: b, c: c }

  &emsp;&emsp;这里的CronJob也是同样的套路:

```javascript
  /**
   * 为了节约篇幅，示例代码只展示主要内容
   * ===> CronJob函数
   */
  var _cronTime = cronTime;
	var argCount = 0;
	for (var i = 0; i < arguments.length; i++) {
		if (arguments[i] !== undefined) {
			argCount++;
		}
  }
  // 判断参数是否为对象形式
	if (typeof cronTime !== 'string' && argCount === 1) {
    // 解析对象
    onTick = cronTime.onTick;
	}  
```

##### 2、回调函数

  &emsp;&emsp;CronJob中有两种回调函数：

  - onTick是每个时间点触发的回调函数，通过_callbacks数组存储。
  - onComplete是整个定时任务执行完的回调函数，通过调用stop方法触发。

  &emsp;&emsp;这两个参数都需要通过command2function函数处理，因为node-corn不仅提供了corn语法，而且提供许多JavaScript中的扩展功能，这里就是可以选择采用子进程处理定时任务。

```JavaScript
  function command2function(cmd) {
		var command;
    var args;
    /**
     * 1、通过传参的类型判断是否采用子进程的方式
     * 2、采用spawn的方式创建子进程
     */
		switch (typeof cmd) {
			case 'string':
				args = cmd.split(' ');
				command = args.shift();

				cmd = spawn.bind(undefined, command, args);
				break;

			case 'object':
				command = cmd && cmd.command;
				if (command) {
					args = cmd.args;
					var options = cmd.options;
					cmd = spawn.bind(undefined, command, args, options);
				}
				break;
    }
		return cmd;
	}
```

##### 3、corn格式解析
  
  
##### 4、start函数

  &emsp;&emsp;start函数是开启整个定时任务的入口函数，它启动的方式主要有两种：

  - 调用CronJob时设置startNow为true，自动调用start函数；
  - 手动调用start函数（第一个示例中的job.start()）。

  &emsp;&emsp;onTick回调函数的执行时机也有两种情况：

  - 达到具体的时间点执行；
  - 初始化时执行，这个取决于runOnInit参数的值。

```JavaScript
  /**
   * ===> CronJob函数
   */
  if (runOnInit) {
		this.lastExecution = new Date();
		fireOnTick.call(this);
	}

	if (startNow) {
		start.call(this);
	}
```

  &emsp;&emsp;从源码中可以看到onTick回调函数是放在_callbacks中的，但是通过CronJob只能设置一个onTick函数，如果你需要设置多个onTick函数，可以采用CronJob原型上的addCallback方法，并且这些onTick的执行顺序需要注意一下：

```JavaScript
  var fireOnTick = function() {
    // 利用_callbacks数组模拟栈的行为 后进先出
		for (var i = this._callbacks.length - 1; i >= 0; i--)
			this._callbacks[i].call(this.context, this.onComplete);
	};
```

  &emsp;&emsp;其中最重要的start函数，下面会详细讲解。

### 三、CronTime

  

