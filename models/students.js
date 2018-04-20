const Schema = require('mongoose').Schema

const StudentScheme = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

StudentScheme.statics = {
  find_all (options, cb) {
    this.find(options, cb)
  },
  remove_by_name (name, cb) {
    this.deleteOne({
      name
    }, cb)
  }
}

StudentScheme.methods = {
}

module.exports = global.db.model('student', StudentScheme)
