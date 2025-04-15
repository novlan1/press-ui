// 一次性脚本，用于在文档中插入组件引用路径

const fs = require('fs');
const { pascalCase } = require('t-comm');

function main() {
  const DIR = 'src/packages';
  const dirs = fs.readdirSync(DIR);
  dirs.forEach((dir) => {
    const readme = `${DIR}/${dir}/README.md`;
    console.log(readme);
    const exist = fs.existsSync(readme);
    console.log('exist', exist);
    if (exist) {
      const data = fs.readFileSync(readme, {
        encoding: 'utf-8',
      });

      if (!data.includes('## 引入') && data.includes('## 代码演示')) {
        const comName = pascalCase(dir);
        const newData = data.replace('## 代码演示', `## 引入

\`\`\`ts
import ${comName} from 'press-ui/${dir}/${dir}';

export default {
  components: {
    ${comName},
  }
}
\`\`\`

## 代码演示`);

        fs.writeFileSync(readme, newData, {
          encoding: 'utf-8',
        });
      }
    }
  });
}

main();
