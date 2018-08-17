const axios = require('axios')
const url = 'http://10.1.1.248:4000/'
!(async () => {

  const info = await axios.post(`${url}order`)
  console.log(info.data)
  await axios.post(`${url}pay`, {}, {
    params: {
      orderId: info.data.data.orderId
    }
  })
})()