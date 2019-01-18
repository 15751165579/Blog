/* eslint-disable */

maxProfit = prices => {
  const max = prices.length
  if (max < 2) {
    return 0
  }

  const sell = [0]
  const hold = [-prices[0]]

  const sell1 = [0]
  const hold1 = [-prices[0]]

  for (let i = 1; i < max; i++) {
    sell[i] = Math.max(sell[i - 1], hold[i - 1] + prices[i])
    hold[i] = Math.max(hold[i - 1], sell1[i - 1] - prices[i])

    sell1[i] = Math.max(sell1[i - 1], hold1[i - 1] + prices[i])
    hold1[i] = Math.max(hold1[i - 1], -prices[i])
  }
  return sell[max - 1]
}