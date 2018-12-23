# 玩转Koa -- 路由中间件原理解析

#### 一、前言

  &emsp;&emsp;Koa为了保持自身的简洁，并没有捆绑中间件。

  &emsp;&emsp;但在实际的开发中，我们需要和形形色色的中间件打交道，本文将要分析的便是经常用到的路由中间件 -- koa-router。

  &emsp;&emsp;如果你对Koa的原理还不了解的话，可以先查看[Koa原理解析](https://juejin.im/post/5c1631eff265da615f772b59)。

#### 二、koa-router概述

  &emsp;&emsp;koa-router的源码只有两个文件：router.js和layer.js。

  &emsp;&emsp;核心功能：

  - 路由注册
  - 路由验证

#### 三、路由注册
