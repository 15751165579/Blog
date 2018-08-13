/**
 * 七牛云提供客户端和服务端上传
 * 
 * 获取图片缩略图的时候 
 * - 首先通过后台设置图片样式
 * - 访问图片加上querystring
 * 
 */
const qiniu = require('qiniu')

// 首先需要设置秘钥
qiniu.conf.ACCESS_KEY = 'xxxxx'
qiniu.conf.SECRET_KEY = 'xxxxx'

// 选择服务所在区域
const config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z0

// 获取uploadtoken
const bucket = 'xxxx'
const localFile = 'xxxxx'
const formUploader = new qiniu.form_up.FormUploader(config)
const putExtra = new qiniu.form_up.PutExtra()
const key = 'demodemodemo.jpeg'

function uptoken (bucket, key) {
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: `${bucket}:${key}`
  })
  return putPolicy.uploadToken()
}

function uploadFile (uploadToken, key, localFile, putExtra) {
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, (err, body, info) => {
      if (err) {
        return reject(err)
      }
      const { statusCode } = info
      if (statusCode === 200) {
        resolve(body)
      } else {
        reject(body)
      }
    })
  })
}

uploadFile(uptoken(bucket, key), key, localFile, putExtra).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

