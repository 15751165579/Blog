var a = 'global'

function foo () {
  console.log('foo: ' + a)
}

function bar () {
  var a = 'bar scope'
  console.log('bar: ' + a)
  foo()
}

function boo () {
  eval('var a = "dynamic scope"')
  console.log('boo: ' + a)
}

bar()
boo()