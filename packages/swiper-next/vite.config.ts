// import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import replace from '@rollup/plugin-replace';
import dts from 'vite-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import copy from 'rollup-plugin-copy';
import cssnano from 'cssnano';
import del from 'rollup-plugin-delete';
// import { isAppNVueNativeTag } from '@dcloudio/uni-shared'

// function resolve(file: string) {
//   return path.resolve(__dirname, file);
// }

export default defineConfig({
  // root: __dirname,
  define: {
    global: 'window',
    __PLATFORM__: '\'h5\'',
    __NODE_JS__: false,
    __APP_VIEW__: false,
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    __UNI_FEATURE_WX__: true,
    __UNI_FEATURE_PROMISE__: false,
    __UNI_FEATURE_I18N_EN__: true,
    __UNI_FEATURE_I18N_ES__: true,
    __UNI_FEATURE_I18N_FR__: true,
    __UNI_FEATURE_I18N_ZH_HANS__: true,
    __UNI_FEATURE_I18N_ZH_HANT__: true,
    __PLUS__: false,
    __X__: false,
  },
  resolve: {
    alias: [
      // {
      //   find: '@dcloudio/uni-core',
      //   replacement: resolve('../uni-core/src'),
      // },
    ],
  },
  build: {
    minify: false,
    lib: {
      entry: './index.ts',
      name: 'swiper-next',
      fileName: 'swiper-next',
      formats: ['es', 'umd', 'cjs'],
    },
    rollupOptions: {
      external: ['uni', 'vue', 'weex', '@vue/shared', '@dcloudio/uni-shared'],
      // output: {
      //   entryFileNames: 'components.js',
      // },

      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          // 让打包目录和我们目录对应
          preserveModules: true,
          // 配置打包根目录
          dir: 'es',
        },
        {
          // 打包格式
          format: 'cjs',
          // 打包后文件名
          entryFileNames: '[name].js',
          // 让打包目录和我们目录对应
          preserveModules: true,
          // 配置打包根目录
          dir: 'lib',
        },
      ],
    },
  },
  plugins: [
    vue(),
    vueJsx({
      isCustomElement: (tag) => {
        if (tag === 'slider') {
          return true;
        }
        return false;
        // return isAppNVueNativeTag(tag)
      },
    }),
    dts({
      // insertTypesEntry: true,
      // staticImport: true,
      // skipDiagnostics: true,

      // 参考： https://github.com/lastertd/sss-ui-plus/blob/dev/vite.config.ts
      outDir: ['es', 'lib'],
      tsconfigPath: './tsconfig.json',
    }),
    replace({
      preventAssignment: true,
      values: {
        __DEV__: '(process.env.NODE_ENV !== \'production\')',
      },
    }),
    postcss({
      extract: true,
      plugins: [autoprefixer(), cssnano()],
    }),
    copy({
      targets: [{ src: 'es/*.css', dest: 'dist' }],
      verbose: true,
      hook: 'generateBundle',
    }),
    del({
      targets: [
        // 设置删除规则，删除原来位置的 CSS 文件
        'es/*.css',
        'lib/*.css',
        'dist/style.css',
      ],
      hook: 'closeBundle', // 在 writeBundle 钩子时执行删除操作
    }),
  ],
  css: {
    // preprocessorOptions: {
    //   sass: {
    //     options: {
    //       javascriptEnabled: true,
    //     },
    //   },
    // },
  },
});
