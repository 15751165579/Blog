# 打包升级：node-cron原理详解

> node-cron主要用来执行定时任务，它不仅提供cron语法，而且增加了NodeJS子进程执行和直接传入Date类型的功能。

### 一、前言

  &emsp;&emsp;在理解node-cron之前，需要先知道它的基本用法，下面是一个在每分钟的第20秒到第50秒之间每隔4秒执行一次的定时任务：

```javascript
  const CronJob = require('../lib/cron.js').CronJob
  const job = new CronJob('20-50/4 * * * * *', onTick)
  job.start()

  function onTick () {
    const d = new Date()
    console.log('tick: ', d)
  }
```

  &emsp;&emsp;接下来会从以下几个方面带你领略node-core的原理：

  - 部分注意事项
  - cron格式的解析
  - 定时任务的执行流程

### 二、注意事项

  &emsp;&emsp;在正式进入源码的探索时，最好了解node-cron的基本用法以及相关参数的含义。

##### 1、传参方式

  &emsp;&emsp;node-cron提供CronJob函数创建定时任务，并且允许两种传参方式：

  - 载荷形式：a, b, c
  - 对象形式：{ a: a, b: b, c: c }

```javascript
  /**
   * 为了节约篇幅，示例代码只展示主要内容
   */
  function CronJob (cronTime, onTick, onComplete, startNow, timeZone, context, runOnInit, utcOffset, unrefTimeout) {
    var _cronTime = cronTime;
    var argCount = 0;
    // 排除传入的参数是undefined的情况（要是我就直接argCount = arguments.length）
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i] !== undefined) {
        argCount++;
      }
    }
    // 判断参数为对象类型的条件
    if (typeof cronTime !== 'string' && argCount === 1) {
      onTick = cronTime.onTick;
      ...
    }
  }
```

##### 2、回到函数

  &emsp;&emsp;node-cron中有两种回调函数：

  - onTick: 每个时间节点触发的回调函数；
  - onComplete: 定时任务执行完后的回调函数。

  &emsp;&emsp;从CronJob函数中可以看到onTick回调函数是放在_callbacks中的，但是通过CronJob只能设置一个onTick函数，如果需要设置多个onTick函数，可以采用CronJob原型上的addCallback方法，并且这些onTick的执行顺序需要注意一下：

```JavaScript
  var fireOnTick = function() {
    // 利用_callbacks数组模拟栈的行为 后进先出
		for (var i = this._callbacks.length - 1; i >= 0; i--)
			this._callbacks[i].call(this.context, this.onComplete);
	};
```

  &emsp;&emsp;另外通过runOnInit参数决定onTick在定时任务初始化阶段执行一次：

```JavaScript
  if (runOnInit) {
		this.lastExecution = new Date();
		fireOnTick.call(this);
	}
```

  &emsp;&emsp;这两种回调函数都允许使用NodeJS子进程处理，举个例子：

```JavaScript
  // examples/basic.js
  const CronJob = require('../lib/cron.js').CronJob;
  const path = require('path');
  const job = new CronJob('20-50/4 * * * * *', `node ${path.join(__dirname, './log.js')}`);
  job.start();

  // examples/log.js
  const fs = require('fs');
  const now = new Date();
  fs.appendFile('./examples/demo.log', `${now}\n`, err => {
    if (err) {
      throw new Error(err);
    }
  });
```

  &emsp;&emsp;对于这种方式，CronJob函数中采用command2function对onTick和onComplete参数统一处理：

```JavaScript
  function command2function(cmd) {
		var command;
    var args;
    /**
     * 采用spawn的方式创建子进程
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

### 三、cron格式解析

  &emsp;&emsp;node-cron中通过CronTime处理时间，而且它还支持普通Date类型：

```JavaScript
  if (this.source instanceof Date || this.source._isAMomentObject) {
		// 支持Date类型
		this.source = moment(this.source);
		this.realDate = true; // 标识符
	} else {
		// 处理cron格式
		this._parse();
		this._verifyParse();
	}
```

##### 1、基本常量

  &emsp;&emsp;在了解cron解析原理之前，首先需要理解以下几个常量:

  - timeUnits: second, minute, hour, dayOfMonth, month, dayOfWeek 分别对应'* * * * * *'中的各个星号；
  - constraints: 每个时间单元的时间范围；
  - monthConstraints: 每个月的天数限制；
  - parseDefaults: 默认的解析格式；
  - aliases: 月份以及一周的别名。
  
  &emsp;&emsp;以上常量都是采用数组的格式，内容正好与数组下标一一对应。

##### 2、解析流程

  &emsp;&emsp;下面以'20-50/4 * * * jan-feb *'为例进行解析过程。

  &emsp;&emsp;第一步，CronTime函数中会根据timeUnits创建各个时间单元：

```JavaScript
  // CronTime函数
  var that = this;
	timeUnits.map(function(timeUnit) {
		that[timeUnit] = {};
  });
```

  &emsp;&emsp;第二步，通过_parse方法处理别名以及分割输入的cron格式。

  &emsp;&emsp;因为corn格式是字符串形式的，所以后面会采用很多正则表达式对其处理，下面是替换别名的操作：

```JavaScript
  /**
   * [a-z]：a,b,c...z字符集
   * {1,3}：匹配前面字符至少1次，最多3次
   */
  var source = this.source.replace(/[a-z]{1,3}/gi, function(alias) {
    alias = alias.toLowerCase();
    if (alias in aliases) {
      return aliases[alias];
    }
    throw new Error('Unknown alias: ' + alias);
  });

  // 处理后的结果
  // => 20-50/4 * * * 0-1 *
```

  &emsp;&emsp;提取cron中各个时间单元采用split方法，不过这里通常需要注意头尾可能出现的空格带来的影响：

```JavaScript
  /**
   * ^: 匹配输入的开始
   * $: 匹配输入的结束
   * |: 或
   * *: 匹配前一个表达式0次或者多次 
   */
  var split = source.replace(/^\s\s*|\s\s*$/g, '').split(/\s+/);

  // 处理后的结果
  // => ['20-50/4', '*', '*', '*', '0-1', '*']
```

  &emsp;&emsp;下面就是对各个时间单元进行处理，这里需要注意的是在输入cron格式字符串时，我们可以省去前面的几位，一般都是省去第一位的秒（秒的缺省值为0）：

```JavaScript
  // 由于用户输入的cron中的时间单元的长度时不定的，这里必须从timeUnits中遍历，设计的很巧妙。
  for (; i < timeUnits.length; i++) {
    cur = split[i - (len - split.length)] || CronTime.parseDefaults[i];
    this._parseField(cur, timeUnits[i], CronTime.constraints[i]);
  }
```

  &emsp;&emsp;第三步，采用_parseField方法处理时间单元。

  &emsp;&emsp;首先需要将*替换为min-max的格式：

```JavaScript
  var low = constraints[0];
	var high = constraints[1];
  field = field.replace(/\*/g, low + '-' + high);
  
  // 得到的结果
  // => ['20-50/4', '0-59', '0-23', '1-31', '0-1', '0-6']
```

  &emsp;&emsp;接下来就是最重要的一点，将有效的时间点放入相应的时间单元中，可能这里你还不太明白什么意思，往下看。

  &emsp;&emsp;根据'20-50/4'，可以得到起止时间为20秒，终止时间为50s，步长为4（步长缺省值为1），拿到这些信息之后，结合前面创建的时间单元，最终得到如下结果：

```JavaScript
  second: {
    '20': true,
    '24': true,
    '28': true,
    '32': true,
    '36': true,
    '40': true,
		'44': true,
    '48': true
  }
```

  &emsp;&emsp;明白需要将cron中各个值处理成什么效果之后，先看一下如果提取字符串中的最小值、最大值以及步长：
  
```JavaScript
  // (?:x) 非捕获括号，注意与()捕获括号的区别
  var rangePattern = /^(\d+)(?:-(\d+))?(?:\/(\d+))?$/g;
```

  &emsp;&emsp;具体的处理方式：

```JavaScript
  // _parseField
  var typeObj = this[type]
  if (allRanges[i].match(rangePattern)) {
	  allRanges[i].replace(rangePattern, function($0, lower, upper, step) {
      step = parseInt(step) || 1;
      
      // 这里确保最小值 最大值在安全范围内
      // 并且采用 ~~的方式避免可能为小数的结果
      lower = Math.min(Math.max(low, ~~Math.abs(lower)), high);
      
      upper = upper ? Math.min(high, ~~Math.abs(upper)) : lower;

			pointer = lower;
			do {
        // 通过步长记录各个时间点
				typeObj[pointer] = true;
				pointer += step;
			} while (pointer <= upper);
		});
	} else {
		throw new Error('Field (' + field + ') cannot be parsed');
	}
```

  &emsp;&emsp;第四步，通过_verifyParse对异常值进行检测，避免造成无限循环。

### 四、定时任务执行流程

  &emsp;&emsp;







