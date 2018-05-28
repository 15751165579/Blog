/**
 * 
 */

const canVisitAllRooms = function (rooms) {
  const keys = new Map()
  keys.set(0, true)
  let max = rooms.length
  let result = 1
  isRun(rooms[0])
  function isRun (item) {
    for (let i = 0; i < item.length; i++) {
      const key = item[i]
      if (!keys.get(key)) {
        result++
        keys.set(key, true)
        isRun(rooms[key])
      }
    }
  }
  return result === max
}

console.log(canVisitAllRooms([[1],[2],[3],[]]), true)
console.log(canVisitAllRooms( [[1,3],[3,0,1],[2],[0]]), false)
console.log(canVisitAllRooms([[2],[],[1]]), true)