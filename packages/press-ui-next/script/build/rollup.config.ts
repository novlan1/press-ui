import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import vuePlugin from 'rollup-plugin-vue';
import styles from 'rollup-plugin-styles';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
// import analyzer from 'rollup-plugin-analyzer';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import multiInput from 'rollup-plugin-multi-input';
import nodeResolve from '@rollup/plugin-node-resolve';
import staticImport from 'rollup-plugin-static-import';
import ignoreImport from 'rollup-plugin-ignore-import';
import copy from 'rollup-plugin-copy';
import deletePlugin from 'rollup-plugin-delete';
import { ifdefVitePlugin } from '@plugin-light/vite-plugin-ifdef';
// import renameNodeModules from 'rollup-plugin-rename-node-modules';
// import glob from 'glob';

import pkg from '../../package.json';

const name = 'press-ui';
const esExternalDeps = Object.keys(pkg.dependencies || {});
// @ts-ignore
const externalDeps = esExternalDeps.concat([/lodash/, /@babel\/runtime/]);
const externalPeerDeps = Object.keys(pkg.peerDependencies || {});
const banner = `/**
 * ${name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */
`;

// const input = 'src/index-lib.ts';
const inputList = [
  'src/**/*.ts',
  // 'src/**/press-*/index.js',
  'src/**/*.js',
  'src/**/*.vue',
  'src/**/*.tsx',
  '!src/**/demos',
  '!src/**/*.d.ts',
  '!src/**/__tests__',
  '!src/**/css/index.js',
];

const getPlugins = ({
  env = '',
  isProd = false,
  ignoreLess = true,
  extractOneCss = false,
  extractMultiCss = false,
} = {}) => {
  const plugins = [
    ifdefVitePlugin({
      context: { H5: true, VUE3: true },
      type: ['css', 'js', 'html'],
    }),
    vuePlugin({
      preprocessStyles: true,
      cssModulesOptions: {
        // https://github.com/css-modules/postcss-modules#usage
      },
    }),
    nodeResolve(),
    commonjs(),
    esbuild({
      target: 'esnext',
      minify: false,
      jsx: 'preserve',
      tsconfig: 'tsconfig.build.json',
    }),
    babel({
      babelHelpers: 'runtime',
      extensions: [...DEFAULT_EXTENSIONS, '.vue', '.ts', '.tsx'],
    }),
    json(),
    url(),
    replace({
      preventAssignment: true,
      values: {
        __VERSION__: JSON.stringify(pkg.version),
      },
    }),
  ];

  // css
  if (extractOneCss) {
    plugins.push(postcss({
      extract: `${isProd ? `${name}.min` : name}.css`,
      minimize: isProd,
      sourceMap: true,
      extensions: ['.sass', '.scss', '.css', '.less'],
    }));
  } else if (extractMultiCss) {
    console.log('abc');
    plugins.push(
      staticImport({
        include: ['src/**/css/css.mjs'],
      }),
      ignoreImport({
        // include: ['src/*/style/*'],
        include: ['**/*.scss', '**/*.css'],
        body: 'import "./css/css.mjs";',
      }),

      copy({
        targets: [
          {
            src: 'src/**/css/index.js',
            dest: 'es',
            rename: (name, extension, fullPath) => {
              console.log('fullPath', fullPath);
              const result = `${fullPath.substring(4, fullPath.length - 8)}css.mjs`;
              console.log('result', result);
              return result;
            },
            transform(contents, name) {
              console.log('contents', contents.toString(), name);
              return contents.toString().replace('index.scss', 'index.css');
            },
          },
        ],
        verbose: true,
      }),
      copy({
        targets: [
          {
            src: 'script/utils/rollup-empty-input.css',
            dest: [
              'es/press-overlay/css',
              'es/press-picker-plus-popup-plus/css',
              'es/press-teleport/css',
              'es/press-area/css',
            ],
            rename: 'index.css',
          },
        ],
        verbose: true,
      }),
    );
  } else if (ignoreLess) {
    plugins.push(ignoreImport({ include: ['**/*.scss', '**/*.css'] }));
  } else {
    plugins.push(
      staticImport({
        include: ['src/**/style/index.js', 'src/_common/style/mobile/**/*.less'],
      }),
      ignoreImport({
        include: ['**/*.scss', '**/*.css'],
        body: 'import "./style/index.js";',
      }),
    );
  }

  if (env) {
    plugins.push(replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(env),
      },
    }));
  }

  if (isProd) {
    plugins.push(terser({
      output: {
        /* eslint-disable */
          ascii_only: true,
          /* eslint-enable */
      },
    }));
  }

  return plugins;
};

/** @type {import('rollup').RollupOptions} */
const cssConfig = {
  input: ['src/**/css/index.js', 'src/common/**/*.scss'],
  plugins: [multiInput(), styles({ mode: 'extract' })],
  output: {
    banner,
    dir: 'es/',
    assetFileNames: '[name].css',
  },
};

const deleteEmptyJSConfig = {
  input: 'script/utils/rollup-empty-input.js',
  plugins: [deletePlugin({ targets: 'es/**/css/index.js', runOnce: true })],
};

const exception = ['dayjs'];
const esExternal = esExternalDeps.concat(externalPeerDeps).filter(value => !exception.includes(value));

/** @type {import('rollup').RollupOptions} */
const esConfig = {
  // input: inputList.concat('!src/index-lib.ts'),
  input: inputList,
  // 为了保留 style/css.js
  treeshake: false,
  external: esExternal,
  plugins: [multiInput()].concat(getPlugins({ extractMultiCss: true })), // .concat(renameNodeModules('ext')),
  output: {
    banner,
    dir: 'es/',
    format: 'esm',
    sourcemap: true,
    entryFileNames: '[name].mjs',
    // chunkFileNames: '_chunks/dep-[hash].mjs',
    // @ts-ignore
    chunkFileNames(chunkInfo) {
      console.log('chunkInfo', chunkInfo);
      const moduleIds = Object.keys(chunkInfo.modules);
      const reg = /\/(press-[\w-]+|swiper-item|swiper|scroll-view)\.vue$/;
      const vueFile = moduleIds.find(item => reg.test(item));
      if (vueFile) {
        const match = vueFile.match(reg);
        console.log('vueFile', vueFile);
        return `${match[1]}/dep-[hash].js`;
      }
      console.log('moduleIds', moduleIds);
      return '_chunks/dep-[hash].js';
    },
    // preserveModules: true,
  },
};

/** @type {import('rollup').RollupOptions} */
const esmConfig = {
  input: inputList,
  // input: inputList.concat('!src/index-lib.ts'),
  // 为了保留 style/index.js
  treeshake: false,
  external: externalDeps.concat(externalPeerDeps),
  plugins: [multiInput()].concat(getPlugins({ ignoreLess: false })),
  output: {
    banner,
    dir: 'esm/',
    format: 'esm',
    sourcemap: true,
    // chunkFileNames: '_chunks/dep-[hash].js',
    // @ts-ignore
    chunkFileNames(chunkInfo) {
      console.log('chunkInfo', chunkInfo);
      const moduleIds = Object.keys(chunkInfo.modules);
      const reg = /\/(press-[\w-]+|swiper-item|swiper|scroll-view)\.vue$/;
      const vueFile = moduleIds.find(item => reg.test(item));
      if (vueFile) {
        const match = vueFile.match(reg);
        return `${match[1]}/dep-[hash].js`;
      }
      console.log('moduleIds', moduleIds);
      return '_chunks/dep-[hash].js';
    },
  },
};

/** @type {import('rollup').RollupOptions} */
const libConfig = {
  input: inputList,
  external: externalDeps.concat(externalPeerDeps),
  plugins: [multiInput()].concat(getPlugins()),
  output: {
    banner,
    dir: 'lib/',
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/dep-[hash].js',
  },
};

/** @type {import('rollup').RollupOptions} */
const cjsConfig = {
  input: inputList,
  external: externalDeps.concat(externalPeerDeps),
  plugins: [multiInput()].concat(getPlugins()),
  output: {
    banner,
    dir: 'cjs/',
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
    chunkFileNames: '_chunks/dep-[hash].js',
  },
};

/** @type {import('rollup').RollupOptions} */
// const umdConfig = {
//   input,
//   external: externalPeerDeps,
//   plugins: getPlugins({
//     env: 'development',
//     extractOneCss: true,
//   }).concat(analyzer({ limit: 5, summaryOnly: true })),
//   output: {
//     name: 'TDesign',
//     banner,
//     format: 'umd',
//     exports: 'named',
//     globals: { vue: 'Vue' },
//     sourcemap: true,
//     file: `dist/${name}.js`,
//   },
// };

/** @type {import('rollup').RollupOptions} */
// const umdMinConfig = {
//   input,
//   external: externalPeerDeps,
//   plugins: getPlugins({
//     isProd: true,
//     extractOneCss: true,
//     env: 'production',
//   }),
//   output: {
//     name: 'TDesign',
//     banner,
//     format: 'umd',
//     exports: 'named',
//     globals: { vue: 'Vue' },
//     sourcemap: true,
//     file: `dist/${name}.min.js`,
//   },
// };

// 单独导出 reset.css 到 dist 目录，兼容旧版本样式
// const resetCss = {
//   input: 'src/_common/style/mobile/_reset.less',
//   output: {
//     file: 'dist/reset.css',
//   },
//   plugins: [postcss({ extract: true })],
// };

// 单独导出 plugin 相关组件的样式，支持修改类名前缀后因上下文暂时无法获取的情况导致组件样式失效的场景下使用
// const pluginCss = {
//   input: 'src/_common/style/mobile/_plugin.less',
//   output: {
//     file: 'dist/plugin.css',
//   },
//   plugins: [postcss({ extract: true })],
// };

export default [
  cssConfig,
  esConfig,
  esmConfig,
  libConfig,
  cjsConfig,
  // umdConfig,
  // umdMinConfig,
  // pluginCss,
  // resetCss,
  deleteEmptyJSConfig,
];
