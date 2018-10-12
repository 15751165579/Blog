const readline = require('readline');
const question = ['请输入您的姓名', '请输入您的年龄']
const result = []
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `？${question[result.length]} `
});
rl.prompt();

rl.on('line', (line) => {
  result.push(line.trim())
  const max = result.length
  if (max === question.length) {
    rl.close()
    return true
  }
  rl.setPrompt(`？${question[result.length]} `)
  rl.prompt();
}).on('close', () => {
  console.log('谢谢参与问答');
  process.exit(0);
}); 