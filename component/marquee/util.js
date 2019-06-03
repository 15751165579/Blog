const cssPrefixes = ['Webkit', 'Moz', 'ms']
const emptyStyle = document.createElement('div').style
const vendorProps = {}

function vendorPropName(name) {
  const capName = name[0].toUpperCase() + name.slice(1)
  let i = cssPrefixes.length
  while (i--) {
    name = cssPrefixes[i] + capName
    if (name in emptyStyle) {
      return name
    }
  }
}

export function finalPropName(name) {
  const final = vendorProps[name]
  if (final) {
    return final
  }

  if (name in emptyStyle) {
    return name
  }
  return vendorProps[name] = vendorPropName(name)
}
/**
 * 
 * @param {Number} timeDiff 当前时间与起始时间差
 * @param {Number} start 初始值
 * @param {Number} end 终止值
 * @param {Number} duration 持续时间
 */
export function linear(timeDiff, start, end, duration) {
  return end * timeDiff / duration + start
}
// requestAnimationFrame polyfill 方案
!(function() {
  var lastTime = 0
  var vendors = ['ms','moz','webkit','o']
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      var curTime = Date.now()
      var timeToCall = Math.max(0, 16 - (curTime - lastTime))
      var id = window.setTimeout(function () {
        callback(curTime + timeToCall)
      }. timeToCall)
      lastTime = curTime + timeToCall
      return id
    }
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      window.clearTimeout(id)
    }
  }
}())

export function animate({ timingFunction, updateDOM, duration, el, infinite = false}) {
  let start = performance.now()

  requestAnimationFrame(function animate(time) {
    // 1、计算时间比
    let timeFraction = (time - start) / duration

    if (timeFraction > 1) {
      timeFraction = 1
    }
    // 2、时间函数
    let progress = timingFunction(time - start, 0, 100, duration)

    // 3、更新UI
    updateDOM(progress, el)

    // 4、下一个执行周期
    if (timeFraction < 1) {
      return requestAnimationFrame(animate)
    }
    if (infinite) {
      start = performance.now()
      requestAnimationFrame(animate)
    }
  })
}


