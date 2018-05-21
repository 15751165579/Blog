# CentOS7.0下Nginx环境配置

### 依赖环境安装

  Nginx是C语言编写的，需要安装gcc编译器:

```s
  yum install -y gcc-c++
```

  Nginx的http模块使用pcre来解析正则表达式，而pcre-devel是基于pcre的二次开发库:

```s
  yum install -y pcre pcre-devel
```

  Nginx使用zlib对http包的内容进行gzip

```s
  yum install -y zlib zlib-devel
```

  Nginx不仅支持http协议，还支持https协议，OpenSSL是一个强大的安全套接字层密码库：

```s
  yum install -y openssl openssl-devel
```

### 下载Nginx安装包

```s
  wget https://nginx.org/download/nginx-1.14.0.tar.gz
```

### 默认配置

```s
  ./configure
```

### 编译安装

```s
  make && make install
```

### 配置环境变量

```s
  echo 'export PATH=$PATH:/usr/software/nginx/sbin' > /etc/profile.d/nginx.sh
```

### 环境变量生效

```s
  source /etc/profile
```

### 查找安装路径

```s
  whereis nginx
```

> Tip: 如果你需要查看当前目录的路径，则可以使用: pwd

### 常用Nginx命令

  查看Nginx进程:

```s
  ps aux|grep nginx
```

  启动Nginx:

```s
  ./nginx
```

  关闭Nginx:

```s
  ./nginx -s quit
```

  当Nginx的配置文件发生变化时：

```s
  ./nginx -s reload
```
