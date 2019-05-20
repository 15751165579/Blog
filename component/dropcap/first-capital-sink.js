/* eslint-disable */
/**
 * 驼峰转连字符
 *
 * @param {*} str
 * @returns
 */
function transformCamelToHyphen(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}
/**
 * 连字符转驼峰
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
   * 创建测试块级元素
   *
   * @param {Object} fontStyle
   * @returns
   * @memberof FirstCapitalSink
   */
  createFakerElement(fontStyle) {
    const el = document.createElement('div')
    const options = Object.assign({
      position: 'fixed',
      top: '0',
      left: '0',
      opacity: '0'
    }, fontStyle)
    Object.keys(options).forEach(key => el.style[key] = options[key])
    const span = document.createElement('span')
    span.innerHTML = 'X'
    el.appendChild(span)
    document.body.appendChild(el)
    return el
  }
  /**
   * 计算总高度
   *
   * @param {*} line
   * @param {*} offsetHeight
   * @param {*} lineSpace
   * @returns
   * @memberof FirstCapitalSink
   */
  calculateHeight(line, offsetHeight, lineSpace) {
    return offsetHeight * line - lineSpace
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
   * 计算文字的上下边缘距离
   *
   * @param {String} text 需要测量的大写字母
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
  init (line) {
    if (typeof line !== 'number') {
      throw new Error('line must be number!')
    }
    const fontCSS = this.getFontCSS(this.el)
    const fakerElement = this.createFakerElement(fontCSS)
    const lineSpace = Number.parseInt(fontCSS.lineHeight, 10) - Number.parseInt(fontCSS.fontSize, 10)
    const totalHeight = this.calculateHeight(line, fakerElement.offsetHeight, lineSpace)
    const { startEdgeYRatio, endEdgeYRatio } = this.calculateEdgeByCanvas('M', '100px', fontCSS.fontFamily, 100, 100)
    
    const fz = totalHeight / (1 - startEdgeYRatio - endEdgeYRatio )

    this.el.style.cssText = `float: left;font-size:${fz}px;line-height:1;padding:${lineSpace / 2}px 0;margin: -${fz * startEdgeYRatio}px 0 -${fz * endEdgeYRatio}px 0;`
  }
}