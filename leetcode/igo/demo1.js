/**
 * 无冲突的情况下，
 * 
 * 预留空货道 free = Math.ceil(total / 3) 执行的操作数是 (total - free) * 3
 * 
 * 每一次需要取的货都是在最少货的道上
 * 
 * 
 */
const debug = require('debug')('igo')
debug.enabled = true

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
      storage[0].shift() // 取出货物
    } else if (empty === 1) {
      // 当前货道前面有1个空盒子
      storage[0].shift()
      storage[0].shift()
      total += 2
      goodsCount--
    } else if (empty === 2) {
      // 1件货物 2个空盒子
      storage[0].shift()
      storage[0].shift()
      storage[0].shift()
      total += 3
      goodsCount--
    }
    // 该货道是否可以释放为空货道 
    let isFree = false
    if (storage[0].length === 0) {
      freeStorage += 3
      storage.unshift() // 释放
      isFree = true
    }
    // 这时需要处理一下空盒子如何放在正在使用的货道上
    empty += 1 // 取出的货物也变成了空盒子
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

// for (let i = 1; i < 200; i++) {
//   debug(computeBestOperation(i), computeOperation(i, ))
// }

debug(computeBestOperation(500), computeOperation(500, 1))
