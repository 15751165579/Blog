const debug = require('debug')('igo')
debug.enabled = false
/**
 * @param storage 整个货道的盒子分布
 * @param usedStorageCount 存在商品的货道数量
 * @param freeStorageCount 不存在商品的货道数量
 * @param storagePositionCount 每个货道的商品数量
 */
function computeOperation (storage, usedStorageCount, freeStorageCount, storagePositionCount) {
  let total = 0
  let freeStoragePositionCount = freeStorageCount * storagePositionCount

  while (storage.length > 0) {
    /* 随机取出一件货物 但是默认是在最前面 */
    const max = storage.length - 1
    const index = Math.round(Math.random() * max)
    const item = storage[index]
    debug(`******** 当前需要取的货道为 ${index} **********`)
    debug(storage)

    // 找出当前货物的前面有几个空盒子
    let empty = 0
    item.forEach(sub => {
      if (sub === -1) {
        empty++
      }
    })

    let start = empty
    do {
      total++
      storage[index].pop()
      start--
    } while ( start >= 0)
    debug(`操作数 ${empty + 1}`)
    empty += 1 // 取出的货物也变成了空盒子

    // 该货道是否可以释放为空货道
    let isFree = false
    if (storage[index].length === 0) {
      isFree = true
      empty -= 1
    }
    // 这时需要处理一下空盒子如何放在正在使用的货道上
    if (empty <= freeStoragePositionCount) {
      freeStoragePositionCount -= empty
    } else {
      empty -= freeStoragePositionCount
      freeStoragePositionCount = 0

      // 需要将剩下的空盒子放在使用中的货道上
      
      // 由该货道向两侧寻找空位置的货道
      let pre = index - 1
      let next = index + 1
      while (empty > 0) {
        if (pre < 0 && next > max) {
          throw new Error('未找到可以放置的位置')
        }
        const preStorage = storage[pre]
        const nextStorage = storage[next]
        
        while (preStorage && preStorage.length < 3 && empty > 0) {
          preStorage.push(-1)
          empty--
        }

        while (nextStorage && nextStorage.length < 3 && empty > 0) {
          nextStorage.push(-1)
          empty--
        }

        pre--
        next++
      }

    }

    if (isFree) {
      storage.splice(index, 1) // 释放
      freeStoragePositionCount += (storagePositionCount - 1)
    }
  }
  return total
}

module.exports = computeOperation