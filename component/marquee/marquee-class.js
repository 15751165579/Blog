import finalPropName from './util.js'
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
    p.style.display = 'inline-block'
    p.style.padding = '0 0 0 100%'
    p.style.whiteSpace = 'nowrap'
    
    const animationKey = finalPropName('animation')
    if(animationKey) {
      // 如果支持 CSS 动画
      const animationName = `marqueeAnimation-${Math.floor(Math.random() * 100000)}`
      const keyframeString = `
        @keyframes ${animationName} {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-100%, 0);
          }
        }
      `
      const $styles = Array.from(document.querySelectorAll('style'))
      if ($styles.length !== 0) {
        $styles[$styles.length - 1].innerHTML += keyframeString
      } else {
        document.querySelector('head').appendChild(`<style>${keyframeString}</style>`)
      }
      p.style[animationKey] = `${animationName} ${this.options.duration / 1000}s 0s infinite linear`
    }
  }
  isElement(selector) {
    let el = selector
    if (typeof selector === 'string') {
      el = document.querySelector(selector)
    }
    this.$el = el
    return (el !== null && typeof el === 'object' && el instanceof HTMLElement && el.nodeType === 1)
  }
}

export default Marquee