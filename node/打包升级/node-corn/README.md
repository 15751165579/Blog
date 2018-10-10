# 打包升级：node-corn原理详解

> node-corn主要用来执行定时任务，它不仅提供corn语法，而且增加了NodeJS子进程执行和直接传入Date类型的功能。

### 一、前言

  &emsp;&emsp;在理解node-corn之前，需要先知道它的基本用法，下面是一个在每分钟的第20秒到第50秒之间每隔4秒执行一次的定时任务：

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
  - corn格式的解析
  - 定时任务的执行流程

### 二、注意事项

  &emsp;&emsp;在正式进入源码的探索时，最好了解node-corn的基本用法以及相关参数的含义。

##### 1、传参方式

  &emsp;&emsp;node-corn提供CronJob函数创建定时任务，并且允许两种传参方式：

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

  &emsp;&emsp;node-corn中有两种回调函数：

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

### 三、corn格式解析

  

##### 1、基本常量

  &emsp;&emsp;在了解corn解析原理之前，首先需要理解以下几个常量:

  - timeUnits: '* * * * * *' 各个星号的含义；
  - constraints: 每个时间单元的范围；
  - monthConstraints: 每个月的天数限制；
  - parseDefaults: 默认的解析格式；
  - aliases: 月份的一周的别名。
  
  &emsp;&emsp;以上常量都是采用数组的格式，正好数组下标一一对应。

##### 2、主要流程

```JavaScript
  // CronTime函数
  var that = this;
	timeUnits.map(function(timeUnit) {
		that[timeUnit] = {};
  });
```

  &emsp;&emsp;上述代码是将6个时间单元挂载到this上，目的是存放corn格式解析后的时间点（what???）：

```JavaScript
  // 比如解析 '*/10 * * * * *' 也就是没10秒执行一次，那么得到的this就是

  {
    source: '*/10 * * * * *',
    second: {
      '0': true,
      '10': true,
      '20': true,
      '30': true,
      '40': true,
      '50': true
    },
    minute: {
      '0': true,
      ...
      '59': true
    },
    hour: {
      '0': true,
      ...
      '59': true
    },
    dayOfMonth: {
      '1': true,
      ...
      '31': true
    },
    month: {
      '0': true,
      ...
      '11': true
    },
    dayOfWeek: {
      '0': true,
      ...
      '6': true
    }
  }
```

  &emsp;&emsp;接下来根据source的类型判断是普通的Date还是corn格式：

```JavaScript
  if (this.source instanceof Date || this.source._isAMomentObject) {
			// 支持Date类型
			this.source = moment(this.source);
			this.realDate = true;
		} else {
			// 处理corn格式
			this._parse();
			this._verifyParse();
		}
```

##### 3、_parse方法

  &emsp;&emsp;_parse方法主要就是将有效时间点存放在各个时间单元中，这里采用了大量的正则表达式对字符串进行处理。

  &emsp;&emsp;前面提到月份和一周里的天数是可以采用别名的方式,首先替换这些别名：

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
```

  &emsp;&emsp;提取corn格式中各个时间单元前，需要去除头尾可能存在的空格带来的影响：

```JavaScript
  /**
   * ^: 匹配输入的开始
   * $: 匹配输入的结束
   * |: 或
   * *: 匹配前一个表达式0次或者多次 
   */
  var split = source.replace(/^\s\s*|\s\s*$/g, '').split(/\s+/);

  // 得到的数组和timeUnits是一一对应的
```

  &emsp;&emsp;接下来解析各个时间单元：

```JavaScript
  // 这里必须从timeUnits中遍历，主要由于允许用户前几位采用缺省值填充，设计的很巧妙。
  for (; i < timeUnits.length; i++) {
    cur = split[i - (len - split.length)] || CronTime.parseDefaults[i];
    this._parseField(cur, timeUnits[i], CronTime.constraints[i]);
  }
```

##### 4、_parseField方法

  &emsp;&emsp;_parseField方法中主要根据每个时间单元设置的规则提取出有效的时间点。

  &emsp;&emsp;下面以'20-50/4 * * * * *'为例，首先我们需要将*替换成相应的范围:

```JavaScript
  var low = constraints[0];
	var high = constraints[1];
  field = field.replace(/\*/g, low + '-' + high);
  
  // 每个时间单元经过上述正则表达式得到：
  // 20-50/4 0-59 0-23 1-31 0-11 0-6
```

  &emsp;&emsp;接下来再提取每个时间单元中的最小值、最大值和步长：

```JavaScript
  // (?:x) 非捕获括号，注意与()捕获括号的区别
  var rangePattern = /^(\d+)(?:-(\d+))?(?:\/(\d+))?$/g;
```

  &emsp;&emsp;最后通过最小值、最大值以及步长向this上的时间单元存放有效的时间点：

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
				typeObj[pointer] = true;
				pointer += step;
			} while (pointer <= upper);
		});
	} else {
		throw new Error('Field (' + field + ') cannot be parsed');
	}
```

  &emsp;&emsp;当corn格式解析完毕之后，作者又采用_verifyParse对异常值进行检测，避免造成无限循环。

### 四、

  &emsp;&emsp;







