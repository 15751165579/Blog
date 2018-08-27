(function () {
  var a = 'hello'
  console.log(a)
})();

[1, 2, 3, 4].forEach(item => console.log(item))

!(function (foo) {
  global.foo = foo
})(function foo () {
  console.log('foo')
});

global.foo()