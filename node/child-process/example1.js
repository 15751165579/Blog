const { spawn } = require('child_process')
const child = spawn('node', ['node/child-process/index.js']);

child.stdout.on('data', (data) => {
  console.log(`child stdout:\n${data}`);
});