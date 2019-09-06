module.exports = {
  base: {
    releaseRepo: "../demo-shelljs-release",
    copyFiles: "dist/*",
    beforeDeploy: 'npm run build',
    afterDeploy: function (shell, configs) {
      // shell.echo('执行 afterDeploy 成功')
    }
  },
  dev: {
    branch: "dev"
  },
  master: {
    branch: "master"
  }
};
