const EventEmitter = require('events')

class Download extends EventEmitter {
  constructor (url, filename = 'default') {
    super()
    if (!url || typeof url !== 'string') {
      throw new Error('url must be string')
    }
    this.url = url
    this.filename = filename
  }
  init () {
    this.downloadBlob(this.url, (blob) => {
      const suffix = this.getFileSuffix(this.url)
      const url = this.createObjectURL(blob)
      this.createFakerA(url, this.filename, suffix)
      this.fakerA.click()
      this.destroy()
    })
  }
  downloadBlob (url, callback) {
    const self = this
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'blob'
    xhr.open('get', url, true)
    xhr.onload = function () {
      if (this.status === 200) {
        callback && callback(this.response)
      }
    }
    xhr.onerror = function () {
      self.emit('error', this)
    }
    xhr.onprogress = function ({ lengthComputable, loaded, total}) {
      if (lengthComputable) {
        self.emit('progress', { total, loaded })
      }
    }
    xhr.send()
  }
  getFileSuffix (url) {
    const index = url.lastIndexOf('.')
    return url.substring(index + 1)
  }
  createObjectURL (blob) {
    if (window.URL) {
      return this.objectURL = window.URL.createObjectURL(blob)
    } else if (window.webkitURL) {
      return this.objectURL = window.webkitURL.createObjectURL(blob)
    }
  }
  revokeObjectURL (url) {
    if (window.URL) {
      return window.URL.revokeObjectURL(url)
    } else if (window.webkitURL) {
      return window.webkitURL.revokeObjectURL(url)
    }
  }
  createFakerA (url, name, suffix) {
    const fakerA = document.createElement('a')
    fakerA.href = url
    fakerA.download = `${name}.${suffix}`
    fakerA.display = 'none'
    document.documentElement.appendChild(fakerA)
    return this.fakerA = fakerA
  }
  destroy () {
    setTimeout(() => {
      if (this.fakerA) {
        document.documentElement.removeChild(this.fakerA)
        this.fakerA = null
      }
      if (this.objectURL) {
        this.revokeObjectURL(this.objectURL)
        this.objectURL = null
      }
      this.emit('complete')
    }, 0)
  }
}

export default Download