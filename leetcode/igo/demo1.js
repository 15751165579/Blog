/**
 * 最理想的状态
 * 
 * 只预留一个空闲货道，要求每次要取的货物必须是在货道的第一个位置并且该货道中货物为所有货道中最少的，
 * 
 * 以至于没三次取货能够预留出一个空闲的货道。
 * 
 * 那么这样的操作数(取放算作一次操作)为：
 * 
 * (total - 1) * 3
 * 
 */

/**
 * 第一阶段：
 * 
 * 默认的条件仍然是要取的货物在该货道的其它商品的前面（这种情况就可能有空盒子占用在使用中的货道上）
 * 
 * 以 3个使用中的货道 1个预留货道为例：o表示含有含有的盒子 x表示空盒子
 * 
 * 第一步：1次操作
 * o o o
 * o o o
 * o   o
 * 
 * 第二步：1次操作
 * o o o
 * o o o
 * o
 * 
 * 第三步：1次操作（这时空闲货道已经占满）
 * o o o
 * o o o
 * 
 * 第四步：1次操作
 * o o o
 *   o o
 *   x
 * 
 * 第五步：2次操作
 * o o o
 * x   o
 * x
 * 
 * 第六步：3次操作，并且第一个货道变成了空闲货道
 *   o o
 *   x o
 *   x
 * 
 * 第七步：3次操作，并且第二个货道变成了空闲货道
 *     o
 *     o
 * 
 * 第八步：1次操作
 *     o
 * 
 * 第九步：1次操作 所有货物取完
 * 
 * 总共花费的操作数为: 1 + 1 + 1 + 1 + 2 + 3 + 3 + 1 + 1 = 14
 * 
 */
const debug = require('debug')('igo')
const fs = require('fs')
const path = require('path')
debug.enabled = false

// 最差的情况
function computeOperation (N, M) {

  // 初始化数据结构
  const storage = new Array(N)
  for (let i = 0; i < N; i++) {
    storage[i] = [1, 1, 1]
  }
  let total = 0
  let freeStorage = M * 3
  let goodsCount = N * 3

  
  while (goodsCount > 0) {
    sortForBest(storage)
    debug(storage)
    const item = storage[0]
    let empty = 0
    item.forEach(sub => {
      if (sub === -1) {
        empty++
      }
    })
    if (empty === 0) {
      // 直接放在空货道上 需要考虑是否可以释放为
      goodsCount--
      total++
      debug('执行操作数： 1')
      storage[0].shift() // 取出货物
    } else if (empty === 1) {
      // 当前货道前面有1个空盒子
      storage[0].shift()
      storage[0].shift()
      total += 2
      debug('执行操作数： 2')
      goodsCount--
    } else if (empty === 2) {
      // 1件货物 2个空盒子
      storage[0].shift()
      storage[0].shift()
      storage[0].shift()
      total += 3
      debug('执行操作数： 3')
      goodsCount--
    }

    empty += 1 // 取出的货物也变成了空盒子

    // 该货道是否可以释放为空货道
    let isFree = false
    if (storage[0].length === 0) {
      storage.shift() // 释放
      isFree = true
      empty -= 1
    }
    // 这时需要处理一下空盒子如何放在正在使用的货道上
    if (empty <= freeStorage) {
      freeStorage -= empty
    } else {
      empty -= freeStorage
      freeStorage = 0

      // 将空盒子放在最少的货道上 这里需要解决当前操作货道的冲突
      const restStorage = isFree ? storage : storage.slice(1)
      let end = restStorage.length - 1

      const last1 = restStorage[end]
      const last2 = restStorage[end - 1]
      if (last1.length === 3) {
        throw new Error('系统当前没有可收纳的空余位置')
      } else {
        if (empty === 1) {
          last1.unshift(-1)
        } else if (empty === 2) {
          if (last1.length === 1) {
            last1.unshift(-1)
            last1.unshift(-1)
          } else if (last1.length === 2 && last2.length === 2) {
            last1.unshift(-1)
            last2.unshift(-1)
          } else {
            throw new Error('系统当前没有可收纳的空余位置')
          }
        }
      }
    }

    if (isFree) {
      freeStorage += 2
    }
  }
  return total
}

// 最优的情况
function computeBestOperation (N) {
  return N * 3
}

function sortForBest (arr) {
  arr.sort((next, pre) => {
    return next.length - pre.length < 0
  })
}

const chartData = {
  x: [],
  y: []
}
const arr = [420]
for (let j = 0; j < arr.length; j++) {
  const max = arr[j]
  const best = computeBestOperation(max)
  let ceil = false
  let floor = false
  for (let i = 2; i < max / 2; i++) {
    const count = computeOperation(max, i)
    console.log(`空闲货道: ${i} ** 执行的操作 ${count}`)
    const ratio = count / best
    chartData.x.push(i)
    chartData.y.push(count)
    if (ratio < 1.2 && !floor) {
      floor = true
      console.log(`空闲货道: ${i} ** 执行的操作 ${count}`)
    }
    if (count === best && !ceil) {
      ceil = true
      console.log(`空闲货道: ${i} ** 执行的操作 ${count}`)
    }
  }
}


fs.writeFile(path.join(__dirname, './data.json'), JSON.stringify(chartData), (err) => {
  if (!err) {
    console.log('写入完成')
  }
})