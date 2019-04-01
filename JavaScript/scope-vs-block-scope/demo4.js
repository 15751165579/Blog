/* eslint-disbale */
function foo () {
  console.log('foo 内部 ' + a)
}

function bar () {
  var a = 10
  console.log(' bar 内部 ' + a)
  foo()
}

var a = 1
bar()