/* eslint-disable */
/**
 * 驼峰 -> 连字符
 *
 * @param {String} str
 * @returns
 */
function transformCamelToHyphen(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}
/**
 * 连字符 -> 驼峰
 * @param {String} str
 * @returns
 */
function transformHyphenToCamel(str) {
  return str.replace(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
}
/**
 * 将数字转化为 px字符串
 * @param {Number} size 
 */
function toPXString(size) {
  return `${size}px`
}

class FirstCharacterSink {
  constructor(selector) {
    if (typeof selector === 'string') {
      this.el = document.querySelector(selector)
    }
    if (typeof selector === 'object') {
      this.el = selector
    }
    if (typeof this.el === 'undefined') {
      throw new Error('selector must be string of object')
    }
    this._testSize = 100
  }
  /**
   * 获取元素字体样式
   *
   * @param {HTMLElement} el
   * @returns
   * @memberof FirstCapitalSink
   */
  getFontCSS(el) {
    const _css = window.getComputedStyle(el)
    const cssProperties = ['fontFamily', 'fontSize', 'lineHeight']
    const ret = Object.create(null)
    for (let i = 0, max = cssProperties.length; i < max; i++) {
      const property = cssProperties[i]
      const value = _css.getPropertyValue(transformCamelToHyphen(property))
      ret[property] = value
    }
    return ret
  }
  /**
   * 将对象转化为 cssText 
   *
   * @param { Object } obj
   * @memberof FirstCapitalSink
   */
  transfromObjectToCSSText(obj) {
    return Object.keys(obj).map(key => `${transformCamelToHyphen(key)}:${obj[key]}`).join(';')
  }
  /**
   * 计算总高度
   *
   * @param {Number} rowNumber 行数
   * @param {Number} height 行高
   * @param {Number} lineSpace 行距
   * @returns
   * @memberof FirstCapitalSink
   */
  calculateHeight(rowNumber, height, lineSpace) {
    return height * rowNumber - lineSpace
  }
  /**
   * 判断当前位置是否为黑色
   *
   * @param {Array} imageData 像素数组
   * @param {Number} index 对应一维数组中恶序号
   * @returns
   * @memberof FirstCapitalSink
   */
  isBlack(imageData, index) {
    const firstByte = index * 4
    const red = imageData[firstByte]
    const green = imageData[firstByte + 1]
    const blue = imageData[firstByte + 2]
    return (red === 0 && green === 0 && blue === 0) ? true : false
  }
  /**
   * 计算字符的上下留白比例
   *
   * @param {String} text
   * @param {String} fontSize
   * @param {String} fontFamily
   * @param {Number} size
   * @returns
   * @memberof FirstCapitalSink
   */
  calculateEdgeByCanvas(text, fontSize, fontFamily, size) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const x = size
    const y = size * 1.5 // 这里就不采用 getBoundingClientRect() 来计算。
    
    canvas.width = x
    canvas.height = y

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0,0, canvas.width, canvas.height)
    ctx.font = `${fontSize} ${fontFamily}`
    ctx.fillStyle = '#000000'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, 0, canvas.height / 2)

    const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const imageData = imageDataObj.data
    let startEdgeY, endEdgeY

    startState:
    for (let row = 0; row < y; row++) {
      for (let col = 0; col < x; col++) {
        const index = row * x + col
        if (this.isBlack(imageData, index)) {
          startEdgeY = row
          break startState
        }
      }
    }

    endState:
    for (let row = y; row >= 0; row--) {
      for (let col = 0; col < x; col++) {
        const index = row * x + col
        if (this.isBlack(imageData, index)) {
          endEdgeY = row
          break endState
        }
      }
    }
    return {
      startEdgeYRatio: (startEdgeY - size / 4) / size,
      endEdgeYRatio: 1 - (endEdgeY - size / 4) / size
    }
  }
  /**
   * 初始化
   *
   * @param {Number} line
   * @memberof FirstCapitalSink
   */
  init (rowNumber, text) {
    if (typeof rowNumber !== 'number') {
      throw new Error('rowNumber must be number!')
    }
    const { lineHeight, fontSize, fontFamily } = this.getFontCSS(this.el)
    const height = Number.parseInt(lineHeight, 10)
    // 行距
    const lineSpace = height - Number.parseInt(fontSize, 10)
    // 首字符占据的空间
    const totalHeight = this.calculateHeight(rowNumber, height, lineSpace)
    // 计算
    const { startEdgeYRatio, endEdgeYRatio } = this.calculateEdgeByCanvas(text, toPXString(this._testSize), fontFamily, this._testSize)
    
    const fz = totalHeight / (1 - startEdgeYRatio - endEdgeYRatio )
    const actualHeight = fz * (1 - endEdgeYRatio)
    const capHeight = fz * startEdgeYRatio
    const options = {
      float: 'left',
      fontSize: toPXString(fz),
      height: toPXString(actualHeight), // 解决 firefox 中 float 高度的问题
      lineHeight: 1,
      fontFamily,
      padding: `${toPXString(lineSpace / 2)} 0`,
      marginTop: toPXString(-capHeight)
    }
    this.el.style.cssText = this.transfromObjectToCSSText(options)
  }
}