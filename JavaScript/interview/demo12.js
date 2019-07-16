// jsonp

const jsonp = (url, data, callback) => {
  // 创建 script 标签
  const script = document.createElement('script')

  const cbName = 'callback_' + Date.now()
  // 构建url

  let qs = url.indexOf('?') === -1 ? '?' : '&'

  for (let key in data) {
    qs += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}&`
  }
  qs += 'callback=' + cbName
  script.src = url + qs
  // 创建方法
  window[cbName] = function (data) {
    callback(data)
    document.body.removeChild(script)
  }
  document.body.appendChild(script)
}

console.log(jsonp)