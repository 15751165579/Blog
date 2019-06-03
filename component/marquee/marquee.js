import {finalPropName, linear, animate} from './util.js'
const defaultOptions = {
  duration: 5000,
}

class Marquee {
  constructor(selector, options) {
    if (!this.isElement(selector)) {
      throw new Error('selector must be String or HTMLElement')
    }
    if (options !== undefined && typeof options !== 'object') {
      throw new Error('options must be object')
    }
    this.options = Object.assign({}, defaultOptions, options)

    // 配置项设置在元素的自定义属性中
    Object.keys(this.options).forEach(option => {
      let attr = this.$el.dataset[option]
      if (attr !== undefined) {
        // 处理 Boolean
        switch(attr) {
          case 'true':
            attr = true
            break
          case 'false':
            attr = false
            break
        }
        this.options[option] = attr
      }
    })

    const p = this.$el.querySelector('p')
    if (!p) {
      throw new Error('HTML tag error')
    }
    p.style.cssText = 'display:inline-block;padding: 0 0 0 100%;white-space:nowrap;'
    animate({
      timingFunction: linear,
      updateDOM: this.updateDOM,
      duration: this.options.duration,
      el: p,
      infinite: true
    })
  }
  isElement(selector) {
    let el = selector
    if (typeof selector === 'string') {
      el = document.querySelector(selector)
    }
    this.$el = el
    return (el !== null && typeof el === 'object' && el instanceof HTMLElement && el.nodeType === 1)
  }
  updateDOM(progress, el) {
    el.style[finalPropName('transform')] = `translate3d(-${progress}%,0,0)`
  }
}

export default Marquee