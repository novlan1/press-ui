const CssHandler = require('./handler/CssHandler');

class RemToRpxPlugin {
  apply(complier) {
    console.log('RemToRpxPlugin 插件加载成功');
    complier.hooks.emit.tapAsync('RemToRpxPlugin', (compliation, cb) => {
      const fileNames = Object.keys(compliation.assets);
      for (const fileName of fileNames) {
        if (/\.(css|scss|less|wxss|qss)$/.test(fileName) === false) {
          continue;
        }
        const asset = compliation.assets[fileName];
        if (asset._valueIsBuffer) {
          continue;
        }

        const sourceCode = asset.source() || asset._valueAsString || asset._value || asset._cachedSource;
        if (sourceCode != null) {
          asset.source = () =>
            // console.log('source', fileName, sourceCode)
            // 这里返回null或者undefined会导致编译过程无法结束，所以sourceCode需要判空才给asset.source赋值
            CssHandler.handleRem(sourceCode)
          ;
        }
      }
      cb && cb();
    });
  }
}

module.exports = RemToRpxPlugin;
