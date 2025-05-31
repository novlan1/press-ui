const fs = require('fs');
const path = require('path');

/**
 * 批量重命名文件和文件夹（同步版本）
 * @param {string} dirPath - 要处理的目录路径
 * @param {Object} renameConfig - 重命名配置对象 { 旧名称: 新名称 }
 * @param {boolean} recursive - 是否递归处理子目录
 */
function batchRenameSync(dirPath, renameConfig, recursive = true) {
  try {
    // 读取目录内容（同步）
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const item of items) {
      const oldPath = path.join(dirPath, item.name);
      let newName = item.name;

      // 检查当前名称是否需要重命名
      for (const [oldName, newNamePart] of Object.entries(renameConfig)) {
        // if (item.name.includes(oldName)) {
        //   newName = item.name.replace(new RegExp(oldName, 'g'), newNamePart);
        //   break;
        // }
        const oldNameReg = new RegExp(`^${oldName}(\\.\\w+)$`);
        if (item.name === oldName) {
          newName = newNamePart;
          break;
        } else if (oldNameReg.test(item.name)) {
          newName = item.name.replace(oldNameReg, (_, postfix) => newNamePart + postfix);
          break;
        }
      }

      // 如果名称有变化，则执行重命名
      if (newName !== item.name) {
        const newPath = path.join(dirPath, newName);
        console.log(`Renaming: ${oldPath} -> ${newPath}`);
        fs.renameSync(oldPath, newPath);
      }

      // 如果是目录且需要递归处理
      if (recursive && item.isDirectory()) {
        const currentPath = newName !== item.name
          ? path.join(dirPath, newName) : oldPath;
        batchRenameSync(currentPath, renameConfig, recursive);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error);
  }
}


module.exports = {
  batchRenameSync,
};
// // 使用示例
// const config = {
//     // 旧名称: 新名称
//     'old_prefix': 'new_prefix',
//     'OLD_TEXT': 'NEW_TEXT',
//     '2020': '2023'
// };

// // 要处理的根目录
// const targetDirectory = './test_folder';

// // 执行批量重命名
// console.log('开始批量重命名...');
// batchRenameSync(targetDirectory, config, true);
// console.log('批量重命名完成!');
