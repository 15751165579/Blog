const chai = require('chai')
const expect = chai.expect

describe('expect api 使用', function () {

  describe('not', function () {
    it('不会抛出错误', function () {
      expect(function () {}).to.not.throw()
    })

    it('该对象不包含属性age', function () {
      expect({name: '小明'}).to.not.have.property('age')
    })

    it('该对象是数组类型并且不包含3', function () {
      expect([1, 2]).to.be.an('array').that.does.not.include(3)
    })
  })

  describe('deep', function () {
    // deep 主要是用了 deep-eql比较算法
    it('deep 结合 equal', function () {
      expect({a: 1}).to.deep.equal({a: 1})
    })

    it('deep 结合 include', function () {
      expect([{a: 1}]).to.deep.include({a: 1})
    })

    it('deep 结合 members', function () {
      expect([1, 2]).to.have.deep.members([2, 1])
    })

    it('deep 结合 key', function () {
      expect(new Set([{a: 1}])).to.have.deep.keys([{a: 1}])
    })

    it('deep 结合 property', function () {
      expect({x: {y: 2}}).to.have.deep.property('x', {y: 2})
    })
  })

  describe('nested', function () {
    it('nested 结合 property', function () {
      expect({a: {b: [1, 2]}}).to.have.nested.property('a.b[1]')
    })

    it('nested 结合 include', function () {
      expect({a: {b: [1, 2]}}).to.nested.include({'a.b[1]': 2})
    })
  })

  // describe('own', function () {
  //   it('own 结合 property', function () {
  //     Object.prototype.b = 2
  //     expect({a: 1}).to.have.property('b').not.own.property('b')
  //   })

  //   it('own 结合 include', function () {
  //     Object.prototype.b = 2
  //     expect({a: 1}).to.include({b: 2}).but.not.own.include({b: 2})
  //   })
  // })

  describe('ordered', function () {
    it('ordered 结合 members', function () {
      expect([1, 2]).to.have.ordered.members([1, 2]).but.not.have.ordered.members([2, 1])
    })

    it('ordered 结合 include', function () {
      expect([1, 2, 3]).to.include.ordered.members([1, 2]).but.not.include.ordered.members([2, 3])
    })
  })

  describe('any', function () {
    it('任何一个多不能包含', function () {
      expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd')
    })
    
    it('包含任何一个即可', function () {
      expect({a: 1, b: 2}).to.have.any.keys('a', 'c')
    })
  })

  describe('all', function () {
    it('所有包含', function () {
      expect({a: 1, b: 2}).to.have.all.keys('a', 'b')
    })
  })

  describe('a 与 an', function () {
    it('string 类型检查', function () {
      expect('some').to.be.a('string')
      expect('some').to.be.an('string')
    })

    it('a 与 an的区别', function () {
      const a = {
        [Symbol.toStringTag]: 'mytype'
      }
      expect(a).to.be.a('mytype').but.not.to.be.an('object')
    })
  })

  describe('include', function () {
    it('include在不同类型中有不同的表现', function () {
      expect('some').to.be.a('string').to.include('me')
    })
  })

  describe('true false null undefined NaN empty', function () {
    it('true 的使用', function () {
      expect(true).to.be.true
    })

    it('false 的使用', function () {
      expect(false).to.be.false
    })

    it('null 与 undefined 的使用', function () {
      expect(null).to.be.null.but.not.to.be.undefined
    })

    it('NaN', function () {
      expect(NaN).to.be.NaN
    })

    it('empty', function () {
      expect({}).to.be.empty
      expect([]).to.be.empty
      expect('').to.be.empty
    })
  })

  describe('eql 和 equal', function () {
    it('两者的区别', function () {
      expect({a: 2}).to.eql({a: 2}).but.not.equal({a: 2})
    })
  })

  describe('property', function () {
    it('property基础用法', function () {
      expect({a: 1}).to.have.property('a')
    })
  })
  
  describe('lengthOf', function () {
    it('lengthOf用法', function () {
      expect([1, 2, 3]).to.have.lengthOf(3)
    })
  })

  describe('match', function () {
    it('匹配字符串', function () {
      expect('foosdsd').to.match(/^foo/)
    })
  })

  describe('string', function () {
    it('包含字符串', function () {
      expect('foobarbaz').to.have.string('bar')
    })
  })

  describe('keys', function () {
    it('验证对象的key', function () {
      expect({a: 1, b: 2}).to.have.any.keys('a', 'c').but.not.have.all.keys('a', 'c')
    })
  })

  describe('throw', function () {
    function foo () {
      throw new Error('message')
    }
    it('判断抛出异常', function () {
      expect(foo).to.be.throw()
    })
  })

  describe('respondsTo itself', function () {
    function Cat () {}
    Cat.prototype.meow = function () {}
    Cat.hiss = function () {}
    it('差异性', function () {
      expect(Cat).itself.to.respondsTo('hiss').but.not.to.respondsTo('meow')
      expect(new Cat()).to.be.a('object').to.respondsTo('meow')
    })
  })

  describe('satisfy', function () {
    it('值大于4', function () {
      // expect(5).to.be.above(4) no recommend
      expect(5).to.satisfy(num => {
        return num > 4
      })
    })
  })

  describe('members', function () {
    it('members 结合 have', function () {
      expect([1, 2, 3]).to.have.members([2, 1, 3]).but.not.have.ordered.members([2, 1, 3])
    })

    it('members 结合 include', function () {
      expect([1, 2, 3]).to.include.members([2, 3]).but.not.include.ordered.members([2, 3])
    })
  })
})
