const axios = require('axios')
const crypto = require('crypto')
const debug = require('debug')('meicai')
const fs = require('fs')
const path = require('path')

debug.enabled = true
const delayTimer = 1000
// salt
/* eslint-disable */
const saltList = {
  test: ["ff3J]K<y;kg<U'", "'ZDWR3F6fNY", "OBalO_=d<r)w", "reI*Xc7m^O", "a.>zbB2e62K7O", "8?;S4z3|)1Maq5Z", "UV<j#U2|,sq", "m,3EW4bNpkJ@x", "0n*},bp8QAv9G", "{W1@(J7Z5#C1Jx6", "`h)1=zQ!3B", "<8!,8l{]oMLfbw<", "T5cjl9-Zn,he),q", "6}KBybUyk@A>YX", "VS|Y2~w87uh&", "-Eiu6,SZT@[", "Ys%Ixi8yF`dBN", "_hX`_!WtELLI=xk", "9_a|lG.D>JO'g", "%rdfhaF(@|}AG", "d^BJF9>d6?", "apN_GR0tO10b*", "zdec!W-~f3A|B", "nlL)^|r)lR}y%t", "6xWbCa+Q*PJ4k", ")m=eSo{T,6", "Ol}Wb(PT*6iuho", "aM(i:nW>@sTMB", "e>!PmL}Qaj;?c", "V6JwDCD~Fhexf", "qvYT%O~{Q,y", "N_wUa=Q8f=VG_h", "n>f4Y2>0'{kII^7", "k|@,>PbV~=C*", "^[#~Z;SH=tQ", ",c0PzdR#!PvQ=.", "Du[ok8Zr>_5", "ZY=vE*__dRI", "h1#DB^7<(^2*", "oYf``|:>Nff%Mc#", "w!1=k|uk[ltRcw", "G~l}aR}|o%", "l-<9%!M40b>Xi", "ZZE7hUiEr`v", "tfnx;UpU&m+NR", "'(FNMAoP9xEQ@:", "iw)l&S6{T!", "I@m99pv771", "ZEyW]2OXmv", "b.cFE{5Xw+4EOF", "EAua37)(~kmU5", "-?Kl4v}~H%A1", "_86A3F`0Ah#", "?_w.x.zUxD[uL", ",)%sMXugNg.e?dC", "c;Yv,n%2BB]#*", "^R3@(}z#B~T)", "(~`FrUYkEUv=e?", ":FDdtkkPO*@", "5j,qT!P9^h}}@+m", "ZtIrlMZL#|7SY{", "rfeQ&:`]VmzL.W", "`7u%Hg4mX~K", "'fLnwn.7y-", "CS*T9Yhcc*N1)^Q", "WSU)htTODIa_*", "(=xR~;,s7[", "TU|,Fj9~_sB", "5sTy7S7z{Rpg1}", "-T<}`H+-,9v_>``", "%!abdv3:~.3A}a<", "-Y-pGU2Ae[", "O:,Ak5RaN,I", "Fg|)ivYN.+RYN", ";=Qh-wr+kWkz", "SleyT+]<M8N[pP", "b6F<<Q3h=dmApy)", "aXQeAC_CCqX", ":V#yl>FuMiUl>a", "B!?A9I*[pGn", "H1OGo39yD=2+[`h", "=H;}uc9[G[YS", "<zFW!pSWhCL", "k|991ahz*!-XR", "|2+Uo=4BrPxZO", "<DYra,!g3i", "40&vVd5UbEd", "a7Jo8j:lMR0Q_g", "7e<,X)lEfq", "y[ZwGChwEfIdO", "_~^tZP]<HQfTm~H", "AC`~5d_<E-", ",RT'wH;Z6l", "i6M,BZ~Z^SL60", "g'r|NIum{IV", "{S&{1YHX#]5PF", "0^#aVH#3_!_[-", "VSdkx|lThUp", "3CYuF{trceRG>1i", "Gl|ft{*#q=n6"],
  online: ["E6x(dyRm0Tu,DYj", "V7i@JcXHuM9e", "A}eSpm#2drq", "id}s'YKA#bI9Ws", "NjC<duNpXp4zP3", "A-D%FmX&a-", "cTFi0x|:dIS", "CX:(+?;d.R]?r;", "tHtT.dFMJc", "(0yLsq4`ql", "+?i&h<,!k{:q6hH", "{~Ng,T#Q!=86Y1", "7n2zb.f8e)%0TvF", "*('=C.dG~H1jk", "kh]Q;3I8),MBvh", "?dlEr=I0pF7]MO", ">j^V8.5)X7", "W88dd8fL!qoDW", "Z57#EqHq['3sYJM", "'gABfS-+qGrq", "SrG=a,t.Y^&'", "veR?NoWVFDHV", "Svg,]bb60!", "*!ix],:WqX", "[eX-0zn.:c", "!I5L!mUr1<&K", "fz<Ij#f.8&", "5t9D38f5M:", "yKN_#`AzW_A", "*Fxf)ae8%D|", "+(d>];xsoY07U", "lDZ!YAW4Ww#", ">)0_TnPtCg", "y[ZosvFa|k-Y", "3@>wQo]'SSl|r", "3P]+-aoQwlT=", "i{xfX)s1{q", "c{S)9YQN`1kTR", "rNhoLqpq?DWm", "BqKHjriKPi#7&6l", "T&&fv^f0?h7", "la)^Ri?n=H?zM0Y", "@x~[O9+}4m(8#", "`<I2jd+t=fvm;m", "lW!w}eMJ&4psSO!", "XX@@,r5u#qOTA", "el4I0F+Vc9", "ED)s{5YB^+r", "=yT`'2u%oxq", "^I&CRDz`1d~AgpZ", "#NF#)|E{S5`D", "K{l~8NyC.+.", "`lmpMRp-}<", "HA8g4S.5,Y+>Vl", "Y;VGwBn,DG", "lR^>6OWif#4<.", "Dr(D^'Cvy4G'", "znfmYvAn]B`l", "TWnXc!ICESFU", "94kfl(CB0sA:Z", "iVyUx|t@GCJ>!*=", "zFvMMkOsa9li!y", ":Nk[vTB@~*Q%Hc=", "u-*Zm.AS<{s", ">u&]Jhe%`e%f", "2kSg#>jpZa<%y'", "rD`hWQxgy-VbQ,", "J*3hjId@u>Pw[", "fa7:4oyWp*rNV", "oH#*7@l[uQ5mHD", "bZ}XaRHB=n", "}}XU7e!@!{8", "<fNa90.:@Ye|9[", "g7_;-CJik9", "uC;M3G_R2{Z}a@", "dFq%!96+`12l}il", "DjS>dNlW#^6AzF", "~I6YNdRo'!e", "3PI&W5aJVJs%t7|", "EzEh[lrnn'~&", "g]jtb|0y^.", "us+6aD|MD(LN", "fX{'WY*zXM-5P", ",m,ab#xc=H", "gwI5-'z5tOx", "HT+=qkIE!lfBy3", "_fgTLSjTKvaKyOh", "?Jx!e3]xD}", "5Bk`Bd']2evp}Q-", "uV1`*TVY[K'", "Pb2#4YFzi!s]x", "10yh;M)H*I", "#tJT64|M;ncn`P", "W}7&q=p:LYnX*", "sq[N&_p'F%", "#n@Rk^,w9E", "DoaBZ8TP>p40rY", "Q)EDX);UJ',3", "uk:{5(Pp.P)EJ", "=)~1u[k;Fa."]
}

/**
 * 基本数据
 */
const info = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'jwt.txt'), 'utf-8'))

// 设备ID进行编码
let t = []
for (let i = 0; i < 36; i++) {
  t[i] = '0123456789abcdef'.substr(Math.floor(16 * Math.random()), 1)
}
t[14] = '4'
t[19] = '0123456789abcdef'.substr(3 & t[19] | 8, 1)
t[8] = t[13] = t[18] = t[23] = '-'
const device_id = t.join('')

const globalData = {
  tickets: info.jwt, // jwt令牌
  city_id: '1',
  area_id: '592',
  company_id: '10333888',
  source: 'weixin',
  source_origin: 'pc',
  _ENV_: {
    source: 'weixin',
    distribute_channel: 'default',
    platform: '0',
    device_id, // 设备ID
    device_name: '',
    app_version: '2.6.0',
    os_version: '',
    appkey_version: '',
    net: '',
    mno: '',
    imei: '',
    open_id: 0,
    idfa: '',
    idfv: '',
    sn: '',
    mac: '',
    ssid: '',
    bssid: '',
    lat: 0,
    lng: 0,
  },
};

console.log(globalData)


async function fetchGoodsInfo () {
  debug(' ** 获取一级分类列表 ** ')
  const saleClass = await fetchSaleClass({})
  for (item of saleClass) {
    debug(` ** 【${item.name}】下的分类列表 ** `)
    const subSaleClass = await fetchSaleClass({ parent_id: item.id })
    for (sub of subSaleClass) {
      debug(` ** 【${sub.name}】下的商品列表 ** `)
      const goodsList = await handleGoodsList(sub.parent_id, sub.id)
      // 处理商品信息
      for (let goodsItem of goodsList) {
        debug(` ** 处理商品【${goodsItem.name}】** `)
        await saveGoodsInfo(goodsItem, item.name, sub.name)
      }
    }
  }
}

/**
 * 美菜网接口加密逻辑
 * @param {*} obj 接口所需对象
 */
function encodeMCData(obj) {
  const e = Math.round(99 * Math.random()); // 随机数
  const n = Date.now(); // 时间戳
  const salt = saltList['online'][e]; // 盐
  const data = Object.assign({}, globalData, obj); // 完整的对象
  
  const md5 = crypto.createHash('md5');
  md5.update(JSON.stringify(data) + salt);
  const s = md5.digest('hex').toUpperCase();
  const salt_sign = `${s},${e},${n}`;
  return Object.assign({}, data, {
    salt_sign
  })
}

/**
 * 获取分类列表
 * 1、空对象 获取一级分类
 * 2、{ parent_id: xx } 获取上一级分类下的分类
 * @param {*} condition 条件
 * @returns
 */
async function fetchSaleClass(condition) {
  const url = 'https://online.yunshanmeicai.com/mall/api/commodity/saleclass'
  const { data: info } = await axios.post(url, encodeMCData(condition), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (info && info.ret === 1) {
    return info.data
  } else {
    return []
  }
}

/**
 * 获取商品列表（分页）
 *
 * @param {*} page
 * @param {*} sale_c1_id
 * @param {*} sale_c2_id
 * @returns
 */
async function fetchGoodsList(page, sale_c1_id, sale_c2_id) {
  const url = 'https://online.yunshanmeicai.com/mall/api/search/getsearchlistbyc2';
  const data = Object.assign({}, {
    page,
    sale_c1_id,
    sale_c2_id,
    size: 20,
    score_type: 3
  });
  const { data: info } = await axios.post(url, encodeMCData(data), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return info.data // rows is_last_page
}

async function handleGoodsList(sale_c1_id, sale_c2_id) {
  const goodsList = [];
  const pageList = [1];
  let index = 1;
  for (let page of pageList) {
    await sleep(delayTimer);
    debug(` ** 【${page}】页 ** `)
    const { is_last_page, rows } = await fetchGoodsList(page, sale_c1_id, sale_c2_id);
    goodsList.push(...rows)
    if (is_last_page === 0 && rows.length !== 0) {
      // 表示还没结束
      index++
      pageList.push(index)
    }
  }
  return goodsList
}

/**
 * 保存商品信息
 *
 * @param {*} goodsInfo
 * @param {*} category
 * @param {*} sub_category
 */
async function saveGoodsInfo (goodsInfo, category, sub_category) {
  const { name, ssu_list } = goodsInfo;
  
  const ssu = ssu_list.map(item => {
    const { unique_id, total_format } = item
    return {
      unique_id,
      total_format,
      name,
      category,
      sub_category
    }
  })
  console.log(ssu_list)
}

/**
 * 休眠时间
 * @param {*} ms 毫秒数
 * @returns
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


fetchGoodsInfo()