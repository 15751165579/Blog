const uuidv1 = require('uuid/v1')
const uuidv3 = require('uuid/v3')
const uuidv4 = require('uuid/v4')
const uuidv5 = require('uuid/v5')

// v1
console.log(uuidv1())

// v3
console.log(uuidv3('hello.example.com', uuidv3.URL))

// v4 
console.log(uuidv4())

// v5
console.log(uuidv5('hello.example.com', uuidv5.URL))