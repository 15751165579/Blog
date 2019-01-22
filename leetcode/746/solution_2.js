/**
 * 空间复杂度的优化
 */
const minCostClimbingStairs = cost => {
  const max = cost.length
  for (let i = 2; i < max; i++) {
    cost[i] += Math.min(cost[i - 1], cost[i - 2])
  }
  return Math.min(cost[max - 1], cost[max - 2])
}

console.log(minCostClimbingStairs([10, 15, 20]), 15)
console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]), 6)