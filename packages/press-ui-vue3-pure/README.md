## Press UI 

Press UI 的 Vue3 项目，非 uni-app 环境。

该项目有两个作用：

- 查看非 uni-app 的 Vue3 示例
- 对 Press UI 的 Vue3 适配进行打包

为什么不直接在 Press UI 主工程中进行 Vue3 的打包？因为那个环境的 Vue 版本是 2.x，vue-loader 会打包失败。

### 发布 Vue3

```bash
npm run init
npm run build:vue3
npm publish
```
