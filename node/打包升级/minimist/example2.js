const readline = require('readline');
const question = ['请输入您的姓名', '请输入您的年龄']
const result = []
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `？${question[0]} `
});
rl.prompt();

rl.on('line', (line) => {
  result.push(line.trim())
  const max = result.length
  if (max === question.length) {
    rl.close()
  }
  rl.setPrompt(`？${question[max]} `)
  rl.prompt();
}).on('close', () => {
  console.log(`谢谢参与问答 *** 姓名: ${result[0]} 年龄: ${result[1]}`);
  process.exit(0);
}); 