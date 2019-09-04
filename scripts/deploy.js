const shell = require("shelljs");
const path = require("path");

// 检查控制台是否可以运行 `git `开头的命令
if (!shell.which("git")) {
  shell.echo("请先安装 git 命令行工具");
  shell.exit(1);
}

// 执行 npm run build 命令
// if (shell.exec('npm run build').code !== 0) {
//   shell.echo('npm run build 失败')
//   shell.exit(1)
// }

const configs = {
  base: {
    releaseRepo: "../demo-shelljs-release",
    sourceRepo: "../demo-shelljs",
    copyFiles: "dist/*"
  },
  dev: {
    branch: "dev"
  },
  master: {
    branch: "master"
  }
};

// npm run deploy 'dev' '第一次发布'
if (process.argv.length < 4) {
  shell.echo(
    `请传入至少两个参数 分支、commitMessage。如：npm run deploy 'dev' '第一次发布'`
  );
  shell.exit(1);
}
const curMode = process.argv[2];
const commitMsg = process.argv[3];
const curConfig = Object.assign({}, configs.base, configs[curMode]);

// shell.echo(`进入仓库 ${curConfig.releaseRepo}`)
if (shell.cd(curConfig.releaseRepo).code !== 0) {
  shell.echo(`仓库 ${curConfig.releaseRepo} 不存在`);
  shell.exit(1);
}

if (shell.exec(`git checkout ${curConfig.branch}`).code !== 0) {
  shell.echo(`git checkout ${curConfig.branch} 失败`);
  shell.exit(1);
}
shell.exec(`git pull origin ${curConfig.branch}`);

// shell.rm('-rf', '!(.git|README.md)')
shell.rm("-rf", "!(.git)");
shell.cp("-r", path.join(curConfig.sourceRepo, curConfig.copyFiles), "./");

shell.exec("git add .");
shell.exec(`git commit -m ${commitMsg}`);

if (shell.exec("git push").code !== 0) {
  shell.echo("git push 失败");
  shell.exit(1);
}

shell.echo("发布成功");
