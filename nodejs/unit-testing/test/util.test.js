const expect = require('chai').expect
const { add } = require('../util')

/**
 * describe 测试场景
 * 
 * it 测试用例
 * 
 * before 所有测试用例的前置动作
 * 
 * after 所有测试用例的后置动作
 * 
 * beforeEach 单个测试用例的前置动作
 * 
 * afterEach 单个测试用例的后置动作
 * 
 */
// 测试套件
describe('Test add()', () => {

  before(() => console.log(' **** 开始 add 函数的测试'))

  // 测试用例
  it('参数问题', () => {
    expect(() => add()).to.throw('a or b must be number')
  })

  // 测试用例
  it('返回结果是否正确', () => {
    expect(add(1, 4)).to.equal(5)
  })

  after(() => console.log(' **** 完成 add 函数的测试'))

})