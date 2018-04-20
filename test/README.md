# 测试
[![Build Status](https://travis-ci.org/15751165579/Blog.svg?branch=master)](https://travis-ci.org/)

## 测试范式

软件测试中提出两种方法论：BDD 和 TDD

BDD(Behavior-Driven Development)是行为驱动的开发

TDD(Test-Driven Development)是测试驱动的开发

这里选择BDD来进行测试，BDD提供的接口：

- describe() 声明测试套件
- it() 声明测试用例
- before() 所有测试用例的前置动作
- after() 所有测试用例的后置动作
- beforeEach() 每个测试用例的前置动作
- afterEach() 每个测试用例的后置动作

## 测试框架集[Mocha](https://mochajs.org/)

## 测试断言框架[chai](http://www.chaijs.com/)

它支持BDD和TDD风格,

- BDD: Expect 和 Should API
- TDD: Assert

## 测试Http工具[supertest](https://github.com/visionmedia/supertest)

supertest与chai搭配测试Node restful api

## 持续集成平台[travis](https://travis-ci.org)

官网上有很全的教程，主要要熟悉一下.travis.yml的配置项

## 代码覆盖率工具[istanbul](https://istanbul.js.org/)

它拥有四个测试维度:
- 行覆盖率(line cover)
- 函数覆盖率(function cover)
- 分支覆盖率(branch cover)
- 语句覆盖率(statement cover)

> Tip: 这里注意istanbul2.0 api名字换了，原先0.4版本会出现一些奇妙的问题。。。

## 代码覆盖平台[coveralls](https://coveralls.io)

使用步骤
- 安装依赖包coveralls
- 结合travis使用，那你可以使用travis提供的encrypt方法加密coveralls的repo_token，将加密后的字符串放入travis配置文件
- 如果你是本地使用，那么创建.coveralls.yml配置文件即可

> Tip: 不要暴露你的coveralls的repo_token
