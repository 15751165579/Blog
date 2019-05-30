const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const models = require('../models')

const app = new Koa()
const router = new Router()
app.use(bodyParser())

// 添加商品
router.post('/goods', async ctx => {
  console.log(ctx.request.body)
  const { name, category } = ctx.request.body
  ctx.body = await models.Goods.create({
    name,
    category
  })
})

// 根据id获取商品
router.get('/goods/:id', async ctx => {
  const { id } = ctx.params
  ctx.body  = await models.Goods.findOne({
    where: {
      id
    }
  })
})

// 修改商品信息
router.put('/goods/:id', async ctx => {
  const { id } = ctx.params
  const { name, category } = ctx.request.body
  ctx.body = await models.Goods.update({
    name,
    category
  }, {
    where: {
      id
    },
    limit: 1
  })
})

// 删除商品
router.delete('/goods/:id', async ctx => {
  const { id } = ctx.params
  ctx.body = await models.Goods.destroy({
    where: {
      id
    },
    limit: 1
  })
})


app.use(router.routes()).use(router.allowedMethods())

module.exports = app.listen(2019)