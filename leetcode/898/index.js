const subarrayBitwiseORs = (A) => {

  const max = A.length
  const x = new Set()

  for (let i = 0; i < max; i++) {
    let item = A[i]
    x.add(item)
    for (let j = i + 1; j < max; j++) {
      item = item | A[j]
      x.add(item)
    }
  }
  return x.size
}


console.log(subarrayBitwiseORs([0]), 1)
console.log(subarrayBitwiseORs([1, 1, 2]), 3)
console.log(subarrayBitwiseORs([1, 2, 4]), 6)
console.log(subarrayBitwiseORs([1, 11, 6, 11]), 4)

const subarrayBitwiseORs1 = (A) => {

  let cur = new Set()
  const ans = new Set()

  for (let i = 0; i < A.length; i++) {
    const item = A[i]
    const x = new Set()
    for (let e of cur.values()) {
      x.add(e | item)
    }
    x.add(item)
    cur = x
    for (let sub of cur.values()) {
      ans.add(sub)
    }
  }

  return ans.size
}


console.log(subarrayBitwiseORs1([0]), 1)
console.log(subarrayBitwiseORs1([1, 1, 2]), 3)
console.log(subarrayBitwiseORs1([1, 2, 4]), 6)
console.log(subarrayBitwiseORs1([1, 11, 6, 11]), 4)