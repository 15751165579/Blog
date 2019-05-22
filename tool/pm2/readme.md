# PM2

### 一、安装

  &emsp;&emsp;使用npm：

```s
  npm install -g pm2
```

  &emsp;&emsp;如果与 docker 结合使用，那么需要下载 pm2-runtime 镜像

### 二、常用命令

  &emsp;&emsp;查看进程列表

```s
  pm2 ls
```

  &emsp;&emsp;添加管理进程

```s
  pm2 start app.js --name <alias>
```

  &emsp;&emsp;停止进程

```s
  pm2 stop <alias>
```

  &emsp;&emsp;启动进程

```s
  pm2 start <alias>
```

  &emsp;&emsp;重启

```s
  pm2 restart <alias>
```

  &emsp;&emsp;重载（0秒停机重启）

```s
  pm2 reload <alias>
```

  &emsp;&emsp;以群集模式启动，自动检测可用CPU

```s
  pm2 start app.js -i max
```

### 三、生态系统文件

  &emsp;&emsp;复杂的部署场景，利用生态系统文件代替命令更加的便利：

```JavaScript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "app", // 应用名称
      script: "./app.js", // 启动脚本的路径
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
}
```

  &emsp;&emsp;启动应用程序

```s
  pm2 start ecosystem.config.js
```

  &emsp;&emsp;也可以针对具体的应用进行重启

```s
  pm2 restart ecosystem.config.js --only app
```

  &emsp;&emsp;环境变量的指定

```s
  pm2 start ecosystem.config.js --env production
```

### 四、进程管理

  &emsp;&emsp;pm2是一个保存在后台的守护进程，负责处理所有正在运行的进程，它可以管理任意应用类型，如果您想指定解释器的路径，则需要在生态系统文件中设置 interpreter 属性。

  &emsp;&emsp;另外，可以通过以下命令了解每个进程CPU使用的情况，内存使用情况，环路延迟以及请求时间：

```s
  pm2 monit
```

### 五、日志管理

  &emsp;&emsp;实时日志的访问：

```s
  # 所有应用的日志
  pm2 logs
  # 具体应用的日志
  pm2 logs app
```

  &emsp;&emsp;清空日志文件：

```s
  pm2 flush
```

  &emsp;&emsp;日志文件的配置，更改生态系统文件：

```JavaScript
module.exports = {
  apps: [
    {
      name: 'app',
      script: 'app.js',
      output: './out.log', // 标准输出
      error: './error.log', // 默认输出
      log: './combined.outerr.log', // 结合输出 默认禁用
    }
  ]
}
```

  &emsp;&emsp;合并日志主要是群集模式下使用：

```JavaScript
module.exports = {
  apps: [
    {
      name: 'app',
      script: 'app.js',
      merge_logs: true,
      output: './out.log', // 标准输出
      error: './error.log', // 默认输出
    }
  ]
}
```

  &emsp;&emsp;禁用日志

```JavaScript
module.exports = {
  apps: [
    {
      name: 'app',
      script: 'app.js',
      merge_logs: true,
      output: '/dev/null', 
      error: '/dev/null',
    }
  ]
}
```

  &emsp;&emsp;关于日志的其它配置选项

```JavaScript
module.exports = {
  apps: [
    {
      name: 'app',
      script: 'app.js',
      log_type: 'json', // 输出json格式
      log_date_format: 'DD-MM-YYYY' // 遵循moment.js格式
    }
  ]
}
  ```

### 六、群集模式

  &emsp;&emsp;前面已经知道怎样通过命令行的方式启动群集模式，如果在生态系统文件中，则是配置 instances 属性：

```JavaScript
module.exports = {
  apps: [
    {
      name: 'app',
      script: 'app.js',
      instances: 'max'
    }
  ]
}
```

### 七、观察服务

  &emsp;&emsp;生态系统文件可以配置 watch 属性，让项目根据文件的变动自动重启。

  &emsp;&emsp;watch 为 true 是默认观察当前目录下的文件，当然你可以设置具体的路径。

### 八、静态资源服务

  &emsp;&emsp;可以通过命令行启动：

```s
  pm2 serve <path> <port>
```

  &emsp;&emsp;在生态系统文件中：

```JavaScript
module.exports = {
  apps: [
    {
      name: 'static-file',
      script: 'serve',
      env: {
        PM2_SERVE_PATH: '.',
        PM2_SERVE_PORT: 8080
      }
    }
  ]
}
```

### 八、NodeJS 环境变量的配置

  &emsp;&emsp;生态系统文件配置：

```JavaScript
module.exports = {
  apps: [{
    name: "app",
    script: "./app.js",
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
```

  &emsp;&emsp;命令行执行:

```s
  pm2 start ecosystem.config.js --env production
```

### 九、正常关机与正常启动

  &emsp;&emsp;正常关机并重启可以避免失败请求，在 NodeJS 应用中，通过接收 SIGINT 信号处理：

```JavaScript
  process.on('SIGINT', () => {
    console.info('SIGINT signal received.')
    // 服务器停止接收新的请求，完成已经存在请求。
    // 进行相关资源的关闭。
  })
```

  &emsp;&emsp;默认情况下，pm2 根据默认的 kill_timeout:1600 退出应用。

  &emsp;&emsp;正常启动：在提供 HTTP 请求时，应用需要连接到其他资源，例如数据库。

  &emsp;&emsp;生态系统文件中可以配置 wait_ready: true 以及 listen_timeout: 3000，进行默认处理，手动处理，则可以通过发送 ready 信号，告诉 PM2 资源已经连接：

```JavaScript
  process.send('ready')
```

### 十、Docker 与 PM2 的结合

  &emsp;&emsp;在 Docker 中使用 PM2，首先需要下载相应的 pm2镜像 ，而且必须从生态系统文件启动。

  &emsp;&emsp;需要在 Dockerfile 中配置：

```S
FROM keymetrics/pm2:latest-alpine # 拉取镜像

COPY ecosystem.config.js . # 拷贝生态系统文件

CMD ["pm2-runtime", "start", "ecosystem.config.js"] # 执行命令
```

  &emsp;&emsp;并且可以在 Docker 中使用相关的命令：

```s
  docker exec -it <container-id> pm2 show
```