# CentOS搭建git仓库

### 安装git

```s
  yum install -y git

  # 安装完毕，可以查看一下git的版本
  git --version
```

### 建立仓库

  在我们的根目录下创建一个文件夹为仓库:

```s
  # 创建一个名为git的仓库
  [root@xxxxx /] mkdir git
  
  [root@xxxxx /] cd git

  [root@xxxxx /] mkdir test

  # 创建一个裸库（不包含工作区）
  [root@xxxxx /] sudo git init --bare test

  # 授予权限
  [root@xxxxx /] sudo chown -R root:root test
```

  以上就是建立一个简单的git仓库。