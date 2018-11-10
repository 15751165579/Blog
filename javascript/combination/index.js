/**
 * 组合算法
 * 
 */
function combination (data, step, selected_data, amount) {
  if (selected_data.length === amount) {
    console.log(selected_data)
    return
  }
  if (step >= data.length) {
    return
  }

  selected_data.push(data[step])
  combination(data, step + 1, selected_data, amount)
  selected_data.pop()
  combination(data, step + 1, selected_data, amount)
}

combination([1, 2, 3, 4, 5], 0, [], 3)