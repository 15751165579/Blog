const crypto = require('crypto')

const hash = crypto.createHash('md5') // MD5 sha256 sha512

hash.update('Hello World')

console.log(hash.digest('hex')) // 1位16进制等于4位二进制 输出16进制

const sha256 = crypto.createHash('sha256')

sha256.update('Hello World')

console.log(sha256.digest('base64')) // 输出base64 


const hmac = crypto.createHmac('sha256', 'secret')

hmac.update('Hello World')

console.log(hmac.digest('hex'))