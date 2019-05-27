const request = require('request')
const fs = require('fs')
const iconv = require('iconv-lite')
const path = require('path')
const readline = require('readline')
const debug = require('debug')('weiboLogin:')
const RsaEncrypt = require('./rsa').RSAKey

debug.enabled = true

class WeiBoLogin {
  constructor (username, password) {
    this.username = username
    this.password = password
    this.headers = {
      'Accept-Language': 'zh-cn',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
    }
    // 预登陆地址
    this.preLoginURL = `http://login.sina.com.cn/sso/prelogin.php?entry=weibo&callback=sinaSSOController.preloginCallBack&su=&rsakt=mod&checkpin=1&client=ssologin.js(v1.4.11)&_=${Date.now()}`
    // 登录接口地址
    this.loginURL = 'http://login.sina.com.cn/sso/login.php?client=ssologin.js(v1.4.18)'

  }
  async init () {
    try {
      this.preLoginData = await this.preLogin()
      if (this.preLoginData['showpin'] == 1) {
        // 处理验证码
        this.getPinImage()
        this.pinCode = await this.inputPinCode()
      }

      this.loginData = await this.login()

      await this.handleRedirectURL(this.loginData)

    } catch (err) {
      debug(err)
    }
  }
  /**
   * 请求登录的参数（第一步）
   * @returns {Promise} 登录参数
   */
  preLogin () {
    debug('第一步：预登陆获取加密用到的干扰数据')
    const { headers, preLoginURL } = this
    const options = {
      method: 'GET',
      url: preLoginURL,
      encoding: 'utf-8',
      headers
    }
    return new Promise((resolve, reject) => {
      request(options, (err, response, body) => {
        if (err) {
          reject(err)
        } else {
          const result = this.handleJSONPBody(body)
          debug(result)
          resolve(result)
        }
      })
    })
  }
  /**
   * 获取验证码地址
   */
  getPinImage () {
    const pinImageURL = `http://login.sina.com.cn/cgi/pin.php?r=${Math.floor(Math.random() * 1e8)}&s=0&p=${this.preLoginData['pcid']}`
    request(pinImageURL).pipe(fs.createWriteStream(path.join(__dirname, './pinCode.png')))
  }
  inputPinCode () {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    return new Promise((resolve) => {
      rl.question('请输入验证码', pinCode => {
        rl.close()
        resolve(pinCode)
      })
    })
  }
  /**
   * 处理JSONP返回的结果
   * @param {*} body
   * @returns
   */
  handleJSONPBody (body) {
    const reg = /({.+})/g
    let result = body.match(reg)
    result = result ? result[0] : '{}'
    return JSON.parse(result)
  }
  /**
   * 请求登录接口
   *
   * @param {*} username 用户名
   * @param {*} password 密码
   * @param {*} data 预登陆参数
   * 
   * @returns {Promise} 返回GBK格式的内容
   */
  login () {
    debug('第二步：请求登录接口')
    const loginPostData = {
      entry: 'weibo',
      gateway: '1',
      from: '',
      savestate: '7',
      useticket: '1',
      vsnf: '1',
      su: '',
      service: 'miniblog',
      servertime: '',
      nonce: '',
      pwencode: 'rsa2',
      rsakv: '1330428213',
      sp: '',
      sr: '1366*768',
      encoding: 'UTF-8',
      prelt: '282',
      url: 'http://weibo.com/ajaxlogin.php?framelogin=1&callback=parent.sinaSSOController.feedBackUrlCallBack',
      returntype: 'META'
    }

    loginPostData.su = Buffer.from(this.username).toString('base64')
    debug(`用户名采用base64加密: ${loginPostData.su}`)
    const { pubkey, servertime, nonce, rsakv } = this.preLoginData
    const rsakey = new RsaEncrypt()
    rsakey.setPublic(pubkey, '10001')
    
    const pwd = rsakey.encrypt([servertime, nonce].join('\t') + '\n' + this.password)
    debug(`密码采用RSA加密: ${pwd}`)
    loginPostData.sp = pwd
    loginPostData.servertime = servertime
    loginPostData.nonce = nonce
    loginPostData.rsakv = rsakv

    // 如果存在验证码
    if (this.pinCode) {
      loginPostData.door = this.pinCode
      loginPostData.pcid = this.preLoginData.pcid
    }

    const options = {
      method: 'POST',
      headers: this.headers,
      url: this.loginURL,
      encoding: null,
      form: loginPostData
    }

    return new Promise((resolve, reject) => {
      request(options, (err, response, body) => {
        if (err) {
          reject(err)
        } else {
          debug('登录接口返回的结果')
          resolve(body)
        }
      })
    })
  }
  /**
   * 处理登录接口返回的信息
   * @param {*} data
   * @returns {Promise} 返回重定向地址
   */
  handleRedirectURL (data) {
    return new Promise((resolve, reject) => {
      debug('第三步：处理登录接口的返回结果')
      data = iconv.decode(data, 'GBK')
      const errReasonReg = /retcode=(\d+?)&/g
      const errorLoginMatch = errReasonReg.exec(data)

      if (errorLoginMatch) {
        debug(errorLoginMatch[1])
        reject(this.getErrReason(errorLoginMatch[1]))
      } else {
        const urlReg = /location\.replace\('(.*?)'\)./g
        const urlLoginMatch = urlReg.exec(data)
        if (urlLoginMatch) {
          const j = request.jar()
          const targetURL = urlLoginMatch[1]
          const options = {
            method: 'GET',
            url: targetURL,
            encoding: 'utf-8',
            headers: this.headers,
            jar: j
          }
          request(options, (err) => {
            if (err) {
              reject(err)
            } else {
              let cookies = j.getCookieString(targetURL)
              debug(targetURL)
              debug(cookies)
              fs.writeFile(path.join(__dirname, './cookies.txt'), cookies, err => {
                if (err) {
                  reject('cookies写入失败')
                } else {
                  resolve()
                }
              })
            }
          })
        } else {
          reject('match login url fail')
        }
      }
    })
  }
  /**
   * 获取登录错误信息
   * @param {*} errCode
   * @returns 错误文案
   */
  getErrReason (errCode) {
    switch (errCode) {
      case '4038':
        return '登录次数过于频繁'
      case '4039':
        return '请填写验证码'
      case '4010':
        return '账号尚未激活'
      case '4090':
        return '此账号未激活，请登录原账号'
      case '5024':
        return '请填写正确的微盾动态码'
      case '5025':
        return '动态码有误，请重新输入'
      case '5':
        return '尚未注册微博'
      case '101':
        return '用户名密码错误'
      case '4098':
        return '您的账号还未设置密码'
      case '9999':
        return '当前网络超时，请稍后重试'
      default:
        return '未知登录错误'
    }
  }
}

module.exports = WeiBoLogin
