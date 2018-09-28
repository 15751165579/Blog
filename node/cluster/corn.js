const moment = require('moment-timezone')
const childProcess = require('child_process')

class Cron {
  static get timeUnits () {
    return [
      'second',
      'minute',
      'hour',
      'dayOfMonth',
      'month',
      'dayOfWeek'
    ]
  }
  static get spawn () {
    return childProcess && childProcess.spawn
  }
  static get constraints () {
    return [
      [0, 59],
      [0, 59],
      [0, 23],
      [1, 31],
      [0, 11],
      [0, 6]
    ]
  }
  static get monthConstraints () {
    return [
      31,
      29, // 闰年的问题
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31
    ]
  }
  static get parseDefaults () {
    return ['0', '*', '*', '*', '*', '*']
  }
  static get aliases () {
    return {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
      sun: 0,
      mon: 1,
      tue: 2,
      wed: 3,
      thu: 4,
      fri: 5,
      sat: 6
    }
  }
  constructor (source, zone, utcOffset) {
    this.source = source
    if (zone) {
      if (moment.tz.names().includes(zone)) {
        throw new Error('Invalid timezone')
      }
      this.zone = zone
    }
    
    if (utcOffset) {
      this.utcOffset = utcOffset
    }

    Cron.timeUnits.map(timeUnit => this[timeUnit] = {})

    if (this.source instanceof Date || this.source._isAMomentObject) {
      this.source = moment(this.source)
      this.realDate = true
    } else {
      this._parse()
      this._verifyParse()
    }
  }
  _parse () {
    const aliases = Cron.aliases
    // 解析英文别名
    const source = this.source.replace(/[a-z]{1,3}/gi, alias => {
      alias = alias.toLowerCase()
      if (alias in aliases) {
        return aliases[alias]
      }
      throw new Error('Invalid alias')
    })

    // 获取对应时间单元的值
    const split = source.replace(/^\s\s*|\s\s*$/g, '').split(/\s+/)

    const timeUnits = Cron.timeUnits
    const constraints = Cron.constraints
    let cur
    let max = Cron.timeUnits.length
    for (let i = 0; i < max; i++) {
      cur = split[i]
      this._praseField(cur, timeUnits[i], constraints[i])
    }
  }
  _praseField (field, type, constraints) {
    const rangePattern = /^(\d+)(?:-(\d+))?(?:\/(\d+))?$/g;
    const typeObj = this[type]
    let pointer
    const low = constraints[0]
    const high = constraints[1]

    // 获取范围
    field = field.replace(/\*/g, low + '-' + high)

    // ?????
    const allRanges = field.split(',')

    for (let i = 0; i < allRanges.length; i++) {
      if (allRanges[i].match(rangePattern)) {
        allRanges[i].replace(rangePattern, ($0, lower, upper, step) => {
          step = parseInt(step) || 1
          // 限制最大值最小值的范围
          lower = Math.min(Math.max(low, ~~Math.abs(lower)), high)
          upper = upper ? Math.min(high, ~~Math.abs(upper)) : lower

          pointer = lower

          // 从这里实际上可以看出判断时间的策略
          do {
            typeObj[pointer] = true
            pointer += step
          } while (pointer <= upper)
        })
      } else {
        throw new Error(`Field ${field} can not parsed`)
      }
    }
  }
  _verifyParse () {
    // 验证dayOfMonth是否超过月份的天数
  }
}

module.exports = Cron
