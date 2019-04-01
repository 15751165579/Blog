/**
 * IIFE 现代化模块的基础
 */

const Modules = (function Manager () {
  const modules = {} // 管理模块

  function define (name, deps, func) {
    for (let i = 0, max = deps.length; i < max; i++) {
      deps[i] = modules[deps[i]]
    }

    modules[name] = func.apply(func, deps)
  }

  function get (name) {
    return modules[name]
  }

  return {
    define,
    get
  }
})()


Modules.define('a', [], function () {
  function print (message) {
    console.log(message)
  }

  return {
    print
  }
})

Modules.define('b', ['a'], function (a) {
  function format (message) {
    a.print(message.toUpperCase())
  }

  return {
    format
  }
})

const b = Modules.get('b')
const a = Modules.get('a')

b.format('hello world')
a.print('hello world')
