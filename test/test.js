const chai = require('chai')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')
const request = require('supertest').agent(app.listen())

describe('Mocha 测试 restful api', function () {
  before(done => {
    User.remove({}, err => {
      done()
    })
  })

  describe(' === 测试用户相关api === ', function () {
    it(' ===> 注册接口测试（参数不正确）', done => {
      request.post('/api/register')
      .send({
        account: '21323',
        password: '12345'
      }).end((err, res) => {
        expect(res.body).to.deep.equal({
          code: 200,
          message: '参数格式不正确'
        })
        done()
      })
    })

    it(' ===> 注册接口测试（成功注册）', done => {
      request.post('/api/register')
      .send({
        account: '15751165578',
        password: '123456'
      }).end((err, res) => {
        expect(res.body).to.deep.equal({
          code: 200,
          message: '注册成功'
        })
        done()
      })
    })

    it(' ===> 登录接口测试（参数格式不正确）', done => {
      request.post('/api/login')
      .send({
        account: '15751165578',
        password: '123'
      }).end((err, res) => {
        expect(res.body).to.deep.equal({
          code: 200,
          message: '参数格式不正确'
        })
        done()
      })
    })

    it(' ===> 登录接口测试（用户不存在）', done => {
      request.post('/api/login')
      .send({
        account: '15751165577',
        password: '123456'
      }).end((err, res) => {
        expect(res.body).to.deep.equal({
          code: 500,
          message: '用户不存在'
        })
        done()
      })
    })

    it(' ===> 登录接口测试（密码错误）', done => {
      request.post('/api/login')
      .send({
        account: '15751165578',
        password: '123456789'
      }).end((err, res) => {
        expect(res.body).to.deep.equal({
          code: 500,
          message: '密码错误'
        })
        done()
      })
    })

    it(' ===> 登录接口测试（正确登录）', done => {
      request.post('/api/login')
      .send({
        account: '15751165578',
        password: '123456'
      }).end((err, res) => {
        expect(res.body).to.have.keys(['code', 'token'])
        done()
      })
    })
  })
})


