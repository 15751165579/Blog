const EventUtil = {
  addHandler (el, type, handle) {
    if (el.addEventListener) {
      el.addEventListener(type, handle, false) // 采用普遍支持的冒泡处理
    } else if (el.attachEvent) {
      el.attachEvent(`on${type}`, handle)
    } else {
      el[`on${type}`] = handle // 如果两种方式都不支持，只能采用DOM0级事件处理
    }
  },
  removeHandle (el, type, handle) {
    if (el.removeEventListener) {
      el.removeEventListener(type, handle, false)
    } else if (el.detachEvent) {
      el.detachEvent(`on${type}`, handle)
    } else {
      el[`on${type}`] = null
    }
  },
  getEvent (event) {
    return event ? event.target : window.event
  },
  getTarget (event) {
    return event.target || event.srcElement
  },
  preventDefault (event) {
    if (event.preventDefault) {
      event.preventDefault()
    } else {
      event.returnValue = false
    }
  },
  stopPropagation (event) {
    if (event.stopPropagation) {
      event.stopPropagation()
    } else {
      event.cancelBubble = true
    }
  }
}

console.log(EventUtil)