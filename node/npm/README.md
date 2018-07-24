# npm必知必会

> npm是NodeJS的包管理器，熟练掌握npm的使用，可以大大提高我们的开发效率。

### 一、package.json


##### 1、package.json的初始化

&nbsp;&nbsp;package.json在项目的根目录下，它定义了这个项目需要用到的模块以及项目的基本配置，所以当我们初始化一个NodeJS项目，我们需要先创建一个package.json文件：

```
  npm init
```

&nbsp;&nbsp;通过上述命令我们可以与控制台进行交互来完成一些基础配置项。如果你想跳过这种交互式操作，你可以通过以下命令生成一个默认配置的package.json:

```
  npm init -y
```

&nbsp;&nbsp;如果你还想对package.json进行定制，那么你可以通过.npm-init.js配置文件完成你的需求。

##### 2、scripts

&nbsp;&nbsp;scripts指定了运行脚本命令的npm命令行的缩写，最常用的用法就是在这里设置项目开发环境和生成环境的启动命令：

```json
  {
    "scripts": {
      "dev": "nuxt",
      "build": "nuxt build"
    }
  }
```

&nbsp;&nbsp;在scripts中可以使用&&让多个命令串行执行，同样你也可以使用&让多个命令并行执行，不过window并不支持并行执行，这里我们可以通过npm-run-all包来解决跨平台的问题：

```json
  "scripts": {
    "test": "node test.js",
    "dev": "node app.js",
    "example": "npm-run-all --parallel dev test"
  }
```

&nbsp;&nbsp;scripts中还提供钩子的功能，比如我们执行npm run dev命令，实际上它的执行步骤是这样的：

- 首先需要检查predev命令是否存在，存在则执行；
- 再检查dev命令是否存在，存在执行，不存在则报错；
- 最后检查postdev命令是否存在，存在则执行。

&nbsp;&nbsp;所以通过以上scripts的用法，可以打造一个细腻的工作流。

##### 3、dependencies和devDependencies

&nbsp;&nbsp;这两个字段主要用来记录我们项目中所使用到的模块，通过这两个字段来区别此模块是开发还是运行时使用。为了轻松的管理项目中的模块我们需要认真对待这两个字段，所以在安装模块的时候要指定它是什么性质的模块：

```
  npm install --save express // 记录在dependencies
  npm install --save-dev express // 记录在devDependencies
```

&nbsp;&nbsp;如果你老练一点，上述命令可以写成:

```
  npm i -S express
  npm i -D express
```

&nbsp;&nbsp;如果你已经用上npm5，那么默认会将模块记录在dependencies中（cnpm不支持）:

```
  npm i express // npm5会将express记录在dependencies中
```

##### 4、main

&nbsp;&nbsp;main字段用来指定加载的入口文件，默认是index.js，所以当我们加载一个目录时并不一定执行的是index.js，我们可以通过更改main字段，改变加载的入口文件。

##### 5、config

&nbsp;&nbsp;这个字段主要用来添加命令行的环境变量，例如:

```json
  "config": {
    "port": "8080"
  }
```

&nbsp;&nbsp;那么我们可以在程序中这样获取到这个参数：

```JavaScript
  process.env.npm_package_config_port // 8080
```

&nbsp;&nbsp;灵机一动，是不是似乎感觉到一种力量，我们可以通过这种方式获取package.json中的配置项：

```JavaScript
  process.env.npm_package_name
```

##### 6、engines

&nbsp;&nbsp;这个字段指明该模块运行的平台，例如我们想在程序中直接使用async/await，那么我们就必须指定Node的版本：

```json
  "engines": {
    "node": ">= 7.6"
  }
```

### 二、npm install的执行过程

&nbsp;&nbsp;npm2时代，当我们执行npm install时，进行简单的递归安装，这样存在的问题：

- 目录结构嵌套过深，在Windows文件系统中，可能会触发文件路径不能超过260个字符长的错误；
- 部分模块在很多模块中重复安装，造成大量的冗余。

&nbsp;&nbsp;npm3时代，进行扁平化结构处理，并且默认在无冲突的情况下，尽可能的将依赖包安装到较高的层级。

### 三、npm5

&nbsp;&nbsp;Facebook打造的yarn对于npm5的出现起到了很大的作用，yarn不仅速度快而且颜值高，所以npm必须要学会改变与学习。

&nbsp;&nbsp;npm5中无论下载还是查看信息的文字描述也改得简洁明了了（虽然颜值依然没有yarn高），那么我们接下来看一下比较大的更新:

##### 1、package-lock文件

&nbsp;&nbsp;在npm5中当我们使用install命令时会默认生成一个package-lock文件来记录我们安装的确切版本，为什么要这样做？

&nbsp;&nbsp;package.json中记录我们安装的模块可能是这样的：

```json
  {
    "dependencies": {
      "debug": "^3.1.0"
    }
  }
```

&nbsp;&nbsp;这意味着什么，可能哪一天debug发布了v3.2.0版本，这时我们恰巧执行了install，那么我们就会安装v3.2.0版本，又因为debug更新的一个小功能与我们程序中的一个功能冲突，那么就会导致一系列问题。（这里你可以先了解以下npm中的语义化版本的介绍）

&nbsp;&nbsp;而package-lock文件就是帮助我们记录当时安装模块的确切版本，并且确保我们每一次install都安装相同的模块。如果你要更改这些模块，那么你可以通过install命令指定安装模块的具体版本来更新package-lock文件。

&nbsp;&nbsp;其实package-lock并不算是npm的新功能，npm5之前就提供shrinkwrap来让用户自定义这个功能。

&nbsp;&nbsp;当我们拥有package-lock文件之后，我们可以将其放在版本控制中，从而更好的管理各个依赖模块。

##### 2、symlinks

&nbsp;&nbsp;在npm5之前，我们将本地目录作为依赖模块安装时，npm采用拷贝的方式，将文件复制到node_modules中，而在npm5中采用symlinks，大幅度的提升了安装速度。

##### 3、cache

&nbsp;&nbsp;npm5之前需要用户自己去管理缓存，在npm5中，不需要用户考虑缓存问题，这也大大的提升了npm的安装速度。

### 四、总结

&nbsp;&nbsp;不得不说的是,有了yarn的竞争，npm也相应的做出了很多不错的改变，就目前而言，yarn相比于npm，它的功能并不是特别完善，所以大部分人采用npm结合yarn的方式，从而有效的提高开发效率。


### 参考资料

- [阮一峰教程《package.json文件》](http://javascript.ruanyifeng.com/nodejs/packagejson.html#toc1)
- [2018 年了，你还是只会 npm install 吗？](https://juejin.im/post/5ab3f77df265da2392364341)