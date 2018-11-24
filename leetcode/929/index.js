/**
 * 首先转化规则
 * 再去重
 */
const numUniqueEmails = (emails) => {
  const set = new Set()
  for (let i = 0, max = emails.length; i < max; i++) {
    let email = emails[i]
    const s = email.slice(0, email.indexOf('@'))
    let temp = ''
    for (let j = 0; j < s[0].length; j++) {
      const item = s[0][j]
      if (item === '.') {
        continue
      } else if (item === '+') {
        break
      } else {
        temp += item
      }
    }
    set.add(temp + email.slice(email.indexOf('@')))
  }
  return set.size
}

const testCase = ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]
console.log(numUniqueEmails(testCase))