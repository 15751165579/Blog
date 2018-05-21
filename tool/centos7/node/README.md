# CentOS7.0下Node.js环境安装

### 下载工具

  这里我们可以使用yum工具，应该和Node中的npm是类似的。

### 安装编译环境

```s
  yum -y groupinstall "Development Tools"
```

### 安装Node.js的依赖环境

```s
  yum -y install gcc gcc-c++ kernel-devel
```


### 下载Node安装包

```s
  wget http://nodejs.org/dist/node-latest.tar.gz
```

> Tip: wget命令用来从指定的URL下载文件，它在带宽很窄的情况下和不稳定的网络情况下有很强的适应性。

### 解压安装包

```s
  tar -zxvf node-*.tar.gz
```

> Tip: tar命令可以为linux的文件或者目录创建档案。如果你是处理zip格式的文件可以使用unzip

### 使用默认配置

```s
  cd node-*
  ./configure
```

### 编译安装

```s
  make && make install
```