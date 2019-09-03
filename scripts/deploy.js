const shell = require('shelljs')

// 检查控制台是否可以运行 `git `开头的命令
if (!shell.which('git')) {
  shell.echo('请先安装 git 命令行工具')
  shell.exit(1)
}

// 执行 npm run build 命令
// if (shell.exec('npm run build').code !== 0) {
//   shell.echo('npm run build 失败')
//   shell.exit(1)
// }

// npm run deploy '第一次发布'
const commitMsg = process.argv[2]

const releaseRepo = '../../demo-shelljs-release'
if (shell.cd(releaseRepo).code !== 0) {
  shell.echo(`仓库 ${releaseRepo} 不存在`)
  shell.exit(1)
}

if (shell.exec('git checkout dev').code !== 0) {
  shell.echo('git checkout dev 失败')
  shell.exit(1)
}

// shell.rm('-rf', '!(.git|README.md)')
shell.rm('-rf', '!(.git)')
shell.cp('-r', '../demo-shelljs/demo-shelljs/dist/*', './')

shell.exec('git add .')
shell.exec(`git commit -m ${commitMsg}`)

if (shell.exec('git push').code !== 0) {
  shell.echo('git push 失败')
  shell.exit(1)
}

shell.echo('发布成功')
