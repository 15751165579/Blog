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

##### 3、cornTime
  
  &emsp;&emsp;node-corn中主要通过CronTime解析corn格式，并且它还支持Date类型的处理。

  &emsp;&emsp;解析corn格式涉及到很多正则表达式的知识，下面章节会详细介绍。
  
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

  &emsp;&emsp;接下来就是通过最小值、最大值以及步长向this上的时间单元存放有效的时间点：

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







