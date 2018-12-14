/* eslint-disable */

/**
 * 关键影响因素
 * 1、货物的分布
 * 2、空货道的摆放位置
 */
const debug = require('debug')('igo')
debug.enabled = true
const row = 2
const col = 2
// 货物分布
function step1 () {
  const storage = []
  let count = 1
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (!storage[i]) {
        storage[i] = []
      }
      if (i !== row - 1 || j !== col - 1) {
        storage[i][j] = [count, count, count]
      } else {
        storage[i][j] = []
      }
      count++
    }
  }
  return storage
}

// 货物数量记录
function step2 () {
  const goodsRecord = {}
  for (let i = 0; i < row * col - 1; i++) {
    goodsRecord[i + 1] = 3
  }
  return goodsRecord
}

// 货物位置记录
function step3 (storage) {
  const goodsPosition = {}
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      for (let k = 0; k < 3; k++) {
        const item = storage[i][j][k]
        if (!goodsPosition[item]) {
          goodsPosition[item] = []
        }
        goodsPosition[item].push([i, j, k])
      }
    }
  }
  return goodsPosition
}


// 每次随机取1 ~ 10 件货物
function step4 (goodsRecord) {
  const total = Object.values(goodsRecord).reduce((next, pre) => next + pre, 0)
  const randomAmount = Math.ceil(Math.random() * 9 + 1)
  const amount = randomAmount > total ? total : randomAmount

  const cart = []
  for (let i = 0; i < amount; i++) {
    const keys = Object.keys(goodsRecord)
    const maxIndex = keys.length - 1
    const randomIndex = Math.floor(Math.random() * maxIndex)
    const key = keys[randomIndex]
    goodsRecord[key]--
    if (goodsRecord[key] === 0) {
      delete goodsRecord[key]
    }
    cart.push(key)
  }
  return cart
}

// 模拟取完所有的货品
function start () {

  // 移动的总共距离
  let discount = [0, 0]
  // 总共执行的操作数 （取盒子和放盒子操作）
  let operationCount = 0

  // 初始空位置
  const emptyPosition = {
    '0': [],
    '1': [],
    '2': [],
    '3': [[row - 1, col - 1]]
  }

  const storage = step1()

  const goodsRecord = step2()

  const goodsPosition = step3(storage)

  // 默认机械臂的位置为 0 0
  const position = [0, 0]
  while(Object.keys(goodsRecord).length > 0) {
    const cart = step4(goodsRecord)
    debug('** 本次取出的货物: ' + cart)

    core(cart, goodsPosition, emptyPosition, storage)

  }
}

start()

/**
 * 寻找取货放货的最佳路径
 * 
 */

function core (cart, goodsPosition, emptyPosition, storage) {
  // 决定需要取的货物的位置
  const moveGoodsArray = []
  cart.forEach(item => {
    const p = findBestGoods(item)
    moveGoodsArray.push(p)
  })
  console.log(moveGoodsArray)

  function findBestGoods (item) {
    const positionArray = goodsPosition[item]
    // 当前货道上的最大数量
    let maxCount = 4

    let ans = []
    positionArray.forEach(sub => {
      const [x, y, z ] = sub
      if (z === 0 || storage[x][y][z - 1] === undefined) {
        const currentCount = 3 - z
        if (currentCount < maxCount) {
          maxCount = currentCount
          ans = [x, y, z]
        }
      }
    })

    // 更新商品位置信息
    const [x, y, z] = ans
    storage[x][y][z] = undefined
    
    // 更新空置位置
    let index = -1
    emptyPosition[z].forEach(([x1, y1], i) => {
      if (x1 === x && y1 === y) {
        index = i
      }
    })
    emptyPosition[z].splice(index, 1)
    emptyPosition[z + 1].push([x, y])

    // 更新商品信息
    index = -1
    goodsPosition[item].forEach(([x1, y1, z1], i) => {
      if (x1 === x && y1 === y && z1 === z) {
        index = i
      }
    })
    goodsPosition[item].splice(index, 1)
    return ans
  }
}
