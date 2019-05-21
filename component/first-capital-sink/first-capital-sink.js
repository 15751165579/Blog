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

class FirstCapitalSink {
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
   * @param {Number} width
   * @param {Number} height
   * @returns
   * @memberof FirstCapitalSink
   */
  calculateEdgeByCanvas(text, fontSize, fontFamily, width, height) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    canvas.width = width
    canvas.height = height

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0,0, canvas.width, canvas.height)
    ctx.font = `${fontSize} ${fontFamily}`
    ctx.fillStyle = '#000000'
    ctx.textBaseline = 'top'
    ctx.fillText(text, 0, 0)

    const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const imageData = imageDataObj.data
    let startEdgeY, endEdgeY

    startState:
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const index = row * width + col
        if (this.isBlack(imageData, index)) {
          startEdgeY = row
          break startState
        }
      }
    }

    endState:
    for (let row = height; row >= 0; row--) {
      for (let col = 0; col < width; col++) {
        const index = row * width + col
        if (this.isBlack(imageData, index)) {
          endEdgeY = row
          break endState
        }
      }
    }

    return {
      startEdgeYRatio: startEdgeY / height,
      endEdgeYRatio: 1 - endEdgeY / height
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
    const lineSpace = height - Number.parseInt(fontSize, 10)
    const totalHeight = this.calculateHeight(rowNumber, height, lineSpace)
    const { startEdgeYRatio, endEdgeYRatio } = this.calculateEdgeByCanvas(text, '100px', fontFamily, 100, 100)
    
    const fz = totalHeight / (1 - startEdgeYRatio - endEdgeYRatio )
    const options = {
      float: 'left',
      fontSize: `${fz}px`,
      lineHeight: 1,
      padding: `${lineSpace / 2}px 0`,
      margin: `-${fz * startEdgeYRatio}px 0 -${fz * endEdgeYRatio}px 0`
    }
    this.el.style.cssText = this.transfromObjectToCSSText(options)
  }
}