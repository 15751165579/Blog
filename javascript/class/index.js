/* eslint-disable */
class Student {
  constructor (name) {
    this.name = name
  }
  name () {
    console.log('name')
  }
}
const s = new Student()

console.log(s.name)