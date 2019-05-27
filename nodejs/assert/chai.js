// const chai = require('chai')
// const assert = chai.assert
// const should = chai.should()
// const expect = chai.expect

// const foo = 'foo'

// // TDD风格 assert
// assert.typeOf(foo, 'string')

// // BDD风格 should
// foo.should.be.a('string')

// // BDD风格 expect
// expect(foo).to.be.a('string')

const expect = require('./expect')

class Person {
  constructor (name, age) {
    this.name = name
    this.age = age
  }
  updateName (val) {
    this.name = val
    return this
  }
  updateAge (val) {
    this.age = val
    return this
  }
  sayHi () {
    console.log(`my name is ${this.name}, ${this.age} years old`)
  }
}

const p = new Person({ name: 'xiaoyun', age: 10 })

p.updateAge(12).updateName('xiao ming').sayHi()

const student = {
  name: 'xiaoming',
  age: 20
}

expect(student).to.be.a('object')

expect(student).to.be.a('object').and.to.have.property('name')

expect(student).a('object').property('name')


