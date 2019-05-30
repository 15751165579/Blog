const expect = require('chai').expect
const supertest = require('supertest')
const models = require('../models')
const app = require('../api/app')
const api = supertest(app)

describe(' **** 接口测试 ****', () => {

  before(async () => {
    await models.Goods.destroy({ where: {} })
  })

  describe(' **** GET /goods/:id **** ', () => {

    let result = null
    beforeEach(async () => {
      result = await models.Goods.create({
        name: '土豆',
        category: '蔬菜'
      })
    })

    it('正常情况下，返回一个包含 id、name、category、createdAt、updatedAt 属性的对象', (done) => {
      const { id, name, category } = result.dataValues
      api.get(`/goods/${id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).to.be.a('object')
          expect(res.body).to.be.all.keys('id', 'name', 'category', 'createdAt', 'updatedAt')
          expect(res.body.id).to.be.eq(id)
          expect(res.body.name).to.be.eq(name)
          expect(res.body.category).to.be.eq(category)
        })
        .end(done)
    })

    it('id 不为数字的情况，返回 400 状态码，以及错误信息', done => {
      api.get('/goods/dfdd')
        .expect(400)
        .expect(res => {
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.all.keys('code', 'msg')
          expect(res.body.code).to.be.eq(10020)
          expect(res.body.msg).to.be.eq('参数不合法')
        })
        .end(done)
    })

  })

  after(done => {
    app.close(done)
  })

})