import { parseProtocol } from 'src/packages/common/protocol/parse-protocol';


const MOCK_DATA = [
  {
    title: '一、序言',
    list: [
      [
        '1、“Press UI组件库”（以下简称 Press UI）是基于uni-app的跨端组件库，旨在',
        {
          text: '提升开发效率、沉淀业务组件',
          light: true,
        },
        '，为开发者提供易用、灵活、高性能的组件库。',
      ],
      '2、为规范用户行为，保障用户的合法权益，提升产品服务信息质量，特制定本规范。',
      [
        '3、本规范适用于所有使用者。',
        {
          text: '用户不得是未满18周岁的未成年人。',
          light: true,
        },
      ],
    ],
  },
  {
    title: '二、隐私政策',
    list: [
      [
        '您可以填写',
        {
          light: true,
          text: '个人信息保护和隐私问题反馈问卷',
          link: 'https://privacy.qq.com/questionnaire',
        },
        '与我们联系。',
      ],
    ],
  },
];


export function getMockProtocol() {
  const res =  parseProtocol(MOCK_DATA);
  return res;
}
