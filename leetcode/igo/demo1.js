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
// const fs = require('fs')
// const path = require('path')
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

  
  while (storage.length > 0) {
    debug(storage)
    /* 随机取出一件货物 但是默认是在最前面 */
    const max = storage.length - 1
    const index = Math.round(Math.random() * max)
    const item = storage[index]
    debug(`******** 当前需要取的货道为 ${index} **********`)
    let empty = 0
    item.forEach(sub => {
      if (sub === -1) {
        empty++
      }
    })
    if (empty === 0) {
      // 直接放在空货道上 需要考虑是否可以释放为
      total++
      storage[index].shift() // 取出货物
      debug(' --------- 操作数 1 ')
    } else if (empty === 1) {
      // 当前货道前面有1个空盒子
      storage[index].shift()
      storage[index].shift()
      total += 2
      debug(' --------- 操作数 2 ')
    } else if (empty === 2) {
      // 1件货物 2个空盒子
      storage[index].shift()
      storage[index].shift()
      storage[index].shift()
      total += 3
      debug(' --------- 操作数 3 ')
    }

    empty += 1 // 取出的货物也变成了空盒子

    // 该货道是否可以释放为空货道
    let isFree = false
    if (storage[index].length === 0) {
      isFree = true
      empty -= 1
    }
    // 这时需要处理一下空盒子如何放在正在使用的货道上
    if (empty <= freeStorage) {
      freeStorage -= empty
    } else {
      empty -= freeStorage
      freeStorage = 0

      // 需要将剩下的空盒子放在使用中的货道上

      // 第一步得到未正在操作中的货道
      const restStorage = storage.slice(0, index).concat(storage.slice(index + 1))
      // 找出占用最少的货道
      const minIndex = findMinSizeStorage(restStorage)
      debug(` ****** 第一次最小的货道 ${minIndex} ****** `)
      if (empty === 1) {
        restStorage[minIndex].unshift(-1)
      } else if (empty === 2) {
        const currentSize = restStorage[minIndex].length
        if (currentSize === 1) {
          restStorage[minIndex].unshift(-1)
          restStorage[minIndex].unshift(-1)
        } else if (currentSize === 2) {
          restStorage[minIndex].unshift(-1)
          const subMinIndex = findMinSizeStorage(restStorage)
          debug(` ****** 第二次最小的货道 ${subMinIndex} ****** `)
          if (subMinIndex.length < 3) {
            restStorage[subMinIndex].unshift(-1)
          } else {
            throw new Error('空盒数量出现问题')
          }
        }
      } else {
        throw new Error('空盒数量出现问题')
      }

    }

    if (isFree) {
      storage.splice(index, 1) // 释放
      freeStorage += 2
    }
  }
  return total
}

// 找出货道中盒子最少的道
function findMinSizeStorage  (storage) {
  let count = 3, minIndex = -1
  for (let i = 0; i < storage.length; i++) {
    const size = storage[i].length
    if (size < count) {
      count = size
      minIndex = i
    }
  }
  if (minIndex < 0) {
    throw new Error('系统当前没有可收纳的空余位置')
  }
  return minIndex
}
console.log(computeOperation(3, 1))