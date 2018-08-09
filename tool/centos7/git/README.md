# CentOS搭建git仓库

### 安装git

```s
  yum install -y git

  # 安装完毕，可以查看一下git的版本
  git --version
```

### 配置用户名与邮箱

```s
  git config --global user.name 'xxxxx'
  git config --global user.email 'xxxxx'
```

### 新建用户并且添加信任

```s
  adduser -d /home/git -m git # 创建用户名git,并且在home下创建git文件夹
  chmod -R 777 /home/git # 所有人都可以进行读、写、执行操作
```

```s
  # 创建秘钥
  ssh-keygen -t rsa -C "youremail"
  # 复制秘钥
  cat ~/.ssh/id_rsa.pub

  # 在服务器端添加信任
  mkdir ~/.ssh
  vim ~/.ssh/authorized_keys
  chmod 600 ~/.ssh/authorized_keys # 只有读写权限
  chmod 700 ~/.ssh
```

### 设置git密码

```s
  passwd git
```

### 建立仓库

  切换到git文件目录下:

```s
  cd /home/git
```

```s
  # 新建一个仓库目录
  mkdir demo.git
  cd demo.git
  # 初始化新仓库
  git init --bare

  # 接下来你就可以上传代码到git仓库中了
  git@IP:/home/git/demo.git
```

  以上就是搭建一个简单git服务器的流程.