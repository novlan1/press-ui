const fs = require('fs');
const path = require('path');
const { getAdapterDir } = require('../adapter-config');
const CopyHandler = require('./handler/CopyHandler');

const adapterDirs = getAdapterDir();

String.prototype.replaceAll = function (s1, s2) {
  return this.replace(new RegExp(s1, 'gm'), s2);
};

class myTestPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    // 编译后处理
    compiler.hooks.done.tap('CommAdapterPlugin', () => {
      // 迁移公共库目录
      this.move();
      // 修改公共库引用
      this.modifyRef();
    });
  }
  move() {
    const handle = new CopyHandler();
    const defaultOutputDir = `/dist/${
      process.env.NODE_ENV === 'production' ? 'build' : 'dev'}/${
      process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM}`;
    adapterDirs.forEach((item) => {
      handle.run(`../../../dist/${item}`, `../../..${defaultOutputDir}/`);
    });
    if (adapterDirs.includes('static')) {
      // 拷贝子仓库static
      handle.run('../../../src/static', `../../..${defaultOutputDir}/`);
    }
  }
  getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
      if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
        arrayOfFiles = this.getAllFiles(`${dirPath}/${file}`, arrayOfFiles);
      } else {
        if (file.endsWith('.json') || file.endsWith('.js')) {
          arrayOfFiles.push(path.join(dirPath, '/', file));
        }
      }
    });

    return arrayOfFiles;
  }
  modifyRef() {
    const jsonFiles = this.getAllFiles(path.resolve(process.env.UNI_OUTPUT_DIR));
    jsonFiles.forEach((file) => {
      let source = fs.readFileSync(file).toString();
      const oldSource = source;
      adapterDirs.forEach((item) => {
        source = source.replaceAll(`/././//././/${item}`, item);
      });
      if (oldSource !== source) {
        console.log('file changes', file);
      }
      fs.writeFileSync(file, source);
    });
  }
}

module.exports = myTestPlugin;
