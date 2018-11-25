const bagOfTokensScore = (tokens, P) => {
  tokens.sort((a, b) => a - b)
  let min = 0
  let max = tokens.length - 1
  let points = 0
  while (min <= max || (min < tokens.length && tokens[min] <= P)) {
    if (tokens[min] <= P) {
      P -= tokens[min]
      min++
      points++
    } else if (points > 0) {
      P += tokens[max]
      points--
      max--
    } else {
      break
    }
  }
  return points
}

console.log(bagOfTokensScore([100], 50), 0)
console.log(bagOfTokensScore([100, 200], 150), 1)
console.log(bagOfTokensScore([100, 200, 300, 400], 200), 2)