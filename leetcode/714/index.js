/* eslint-disable */
const maxProfit = (prices, fee) => {
  const max = prices.length
  if (max < 2) {
    return 0
  }

  // 第i天出售股票的最大利润
  const sell = [0]
  // 第i天持有股票的最大利润
  const hold = [-prices[0]]

  for (let i = 1; i < max; i++) {
    sell[i] = Math.max(sell[i - 1], hold[i - 1] + prices[i] - fee)
    hold[i] = Math.max(hold[i - 1], sell[i - 1] - prices[i])
  }
  return sell[max - 1]
}