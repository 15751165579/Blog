const crypto = require('crypto')
const request = require('request')
const qs = require('qs')
const fs = require('fs')
const path = require('path')

/**
 * 美菜网获取JWT https://online.yunshanmeicai.com/entry/index#/index
 * 
 * (1) 分析登陆流程
 * (2) 找到接口 以及 需要上传的参数
 * (3) 数据如何加密的
 * (4) 获取重定向地址
 */

class LoginController {
  constructor ({ phone, password, type}) {
    this.jwtPath = path.resolve(__dirname, 'jwt.txt')
    /**
    * 基本参数
    */
    this.config = {
      'app_key': 'mall',
      'device_id': 'e58c8b84a3bcf62193fcb19c641cdcfd',
      'bp': 'MacIntel',
      'rs': '1680,1050', // 屏幕参数
      'os': 'Mac OS X',
      'ua': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
      'credential': {}
    }

    this.config.credential = { phone, password, type }

    // 盐
    this.salt = 'ZWFmZDUxMGI5MDNhMjRiZmM2MjFkZGI3'

    const config = this.config
    const ts =  Date.now() // 时间戳 毫秒级
    config.ts = ts
    const sign = this.getSign(config)
    config.sign = sign // 加密

    for (let key in config.credential) {
      config[`credential[${key}]`] = config.credential[key]
    }
    delete config.credential
  }
  transferObjectToString (data) {
    // 转换为加密需要用的字符串
    const temp = []
    for (let key in data) {
    temp.push(key)
    }
    temp.sort() // 字典序
    return this.transferArrayToString(data, temp)
  }
  transferArrayToString (obj, array) {
    let result = []
    for (let i = 0, max = array.length; i < max; i++) {
      const key = array[i]
      let value = obj[key]
      if (typeof value === 'object') {
        // 嵌套对象的情况
        value = this.transferObjectToString(value)
      }
      result.push(`${key}=${value}`)
    }
    return `{${result.join('&')}}`
  }
  getSign () {
    // 获取加密字符串
    const str = this.transferObjectToString(this.config) + this.salt
    const base64 = Buffer.from(str).toString('base64') // window.btoa()
    const md5 = crypto.createHash('md5')
    md5.update(base64)
    return md5.digest('hex')
  }
  login () {
    return new Promise((resolve, reject) => {
      request.post({
        url: 'https://passport.yunshanmeicai.com/pc/site/index',
        formData: this.config
      }, (err, res) => {
        if (err) {
          return reject(err)
        }
        const { location } = res.headers
        const did = res.headers['set-cookie'][0].split(';')[0].split('=')[1]
        const jwt = qs.parse(location.split('?')[1]).MC_ST
        resolve({
          jwt,
          did
        })
      })
    })
  }
  async getJWT () {
    const result = await this.login()
    fs.writeFileSync(this.jwtPath, JSON.stringify(result))
    return result
  }
}

const lc = new LoginController({
  phone: 'xxxx',
  password: 'xxxx',
  type: 'password'
})

lc.getJWT().then(console.log)
