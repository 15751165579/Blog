/* eslint-disable */
const maxProfit = prices => {
  const max = prices.length
  if (max < 2) {
    return 0
  }

  const hold = [Number.MIN_SAFE_INTEGER]
  const reset = [0]
  const sell = [0]

  for (let i = 1; i <= max; i++) {
    const price = prices[i - 1]
    hold[i] = Math.max(hold[i - 1], reset[i - 1] - price)
    reset[i] = Math.max(reset[i - 1], sell[i - 1])
    sell[i] = hold[i - 1] + price
  }
  return Math.max.call(this, reset[max], sell[max])
}

const testcase = [1,2,3,0,2]
console.log(maxProfit(testcase))

