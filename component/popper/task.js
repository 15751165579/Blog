const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined'
    
const timeoutDuration = 1

function microTask(fn) {
  let called = false
  return function _microTask() {
    if (called) {
      return
    }
    called = true
    window.Promise.resolve().then(() => {
      called = false
      fn()
    })
  }
}

function macroTask(fn) {
  let called = false
  return function _macroTask() {
    if (called) {
      return
    }
    called = true
    setTimeout(() => {
      called = false
      fn()
    }, timeoutDuration)
  }
}

const supportMicroTask = isBrowser && window.Promise

const task = supportMicroTask ? microTask : macroTask

export default task