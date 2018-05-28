function strTransferToBuffer (str) {
  const buffer = new ArrayBuffer(str.length * 2)
  let bufferView = new Uint16Array(buffer)

  for (let i = 0; i < str.length; i++) {
    bufferView[i] = str.charCodeAt(i)
  }
  return buffer
}

function bufferTransferToStr (buffer) {
  return String.fromCharCode.apply(null, new Uint16Array(buffer))
}
const buffer = strTransferToBuffer('二进制数组与字符串之间的转化')
console.log(buffer)
console.log(bufferTransferToStr(buffer))