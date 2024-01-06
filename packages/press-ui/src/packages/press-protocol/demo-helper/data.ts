import { parseProtocol } from 'src/packages/common/protocol/parse-protocol';
import { fetchData } from 'src/utils/index';

const INTRODUCE_URL = 'https://tip-components-1251917893.cos.ap-guangzhou.myqcloud.com/rb/front-open-config__match__default__press_ui_introduce_config.json';

export const DEFAULT_PRESS_UI_INTRODUCE = [
  {
    title: '一、开始',
    list: [
      [
        '1、“Press UI 组件库”（以下简称 Press UI）是基于 uni-app 的跨端组件库，旨在',
        {
          text: '提升开发效率、沉淀业务组件',
          light: true,
        },
        '，为开发者提供易用、灵活、高性能的组件库。',
      ],
      '2、Press UI 包含三部分内容，基础组件、业务组件、通用逻辑。',
    ],
  },
  {
    title: '二、功能介绍',
    list: [
      '1. 70+ 基础组件，覆盖移动端主流场景',
      '2. 支持基于 uni-app 的 H5、微信小程序、QQ小程序',
      [
        '3. 支持非 uni-app 环境的',
        {
          text: '普通 Vue 项目',
          light: true,
        },
      ],
      [
        '4. 支持 ',
        {
          text: 'Vue2 和 Vue3',
          light: true,
        },
      ],
      [
        '5. 基础组件',
        {
          text: '零外部依赖',
          light: true,
          underline: true,
        },
        '，不依赖三方 npm 包',
      ],
      '6. 提供丰富的中英文文档和组件示例',
      '7. 支持主题定制，内置 600+ 个主题变量',
      '8. 支持国际化，内置 16+ 种语言包',
    ],
  },
  {
    title: '三、解决痛点',
    list: [
      ' Press UI 作为基础组件库，解决了以下痛点：',
      '1. 支持包含 vant 的 H5 项目平滑迁移至 uni-app 项目，仅需改下引用地址和组件名称',
      '2. 丰富的组件类型，以及易用的API，让 uni-app 开发变得简单',
      '3. 支持国际化、主题定制等，组件灵活性更强',
      '4. 支持普通Vue项目，达到一套代码 n+1 端复用',
      '同时，将项目中业务组件沉淀到 Press UI 中，有以下好处：',
      [
        '1. ',
        {
          light: true,
          text: '减少业务和组件的耦合，降低各自复杂度',
        },
        '，并减少bug',
      ],
      [
        '2. ',
        {
          light: true,
          text: '增强组件可维护性',
        },
        '，提升开发效率',
      ],
      '  通过整理代码，合并属性，分离业务逻辑等，让组件变纯粹，增强可维护性，进而提升效率',
      [
        '3. ',
        {
          light: true,
          text: '封装核心逻辑，控制变化',
        },
      ],
      '  不用担心外部合作人员改乱代码，以及解决冲突时的覆盖问题',
      [
        '4. ',
        {
          light: true,
          text: 'UI问题定位简单',
        },
      ],
      '  三端代码同时发布，以及多种类型的示例，覆盖面全，容易发现UI问题，以及三端表现不一致问题',
      '5. 可提升性能',
      '  通过示例中的自定义变量，可定位性能瓶颈，并解决性能问题',
      '6. 提高可复用性，可应用到其他项目',
      '7. 技术沉淀，技术积累，不断打磨组件细节',
    ],
  },
  {
    title: '四、普通 Vue 项目',
    list: [
      'Press UI 支持非 uni-app 环境的普通 Vue 项目，已应用于多个项目中。',
      [
        '体验地址：',
        {
          text: '点击此处',
          light: true,
          link: 'https://novlan1.github.io/press-ui-pure/',
        },
      ],
    ],
  },
  {
    title: '四、Vue3',
    list: [
      [
        'Press UI 同时支持 Vue2 和 Vue3，具体使用方法请',
        {
          text: '参考文档',
          light: true,
          link: 'https://h5.igame.qq.com/pmd-mobile.support.press-ui.press-ui/quickstart.html#vue3-%E9%A1%B9%E7%9B%AE',
        },
        '。',
      ],
      [
        '体验地址：',
        {
          text: '点击此处',
          light: true,
          link: 'https://novlan1.github.io/press-ui-v3/',
        },
      ],
    ],
  },
];

export async function getPressUIIntroduce() {
  const res: any = await fetchData(INTRODUCE_URL);

  return parseProtocol(res);
}
