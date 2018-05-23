/**
 * Best Time To Buy And Sell Stock II
 */
const maxProfit = function (prices) {
  let result = 0
  for (let i = 0, max = prices.length; i < max - 1; i++) {
    result += Math.max(prices[i + 1] - prices[i], 0)
  }
  return result
}

console.log(maxProfit([1, 2, 3, 4, 5]))