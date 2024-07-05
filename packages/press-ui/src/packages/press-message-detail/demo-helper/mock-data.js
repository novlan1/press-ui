import { MOCK_MESSAGE_DETAIL_LIST } from '../../press-message-detail/demo-helper/data';
export function genMockData(index = 0) {
  return [
    MOCK_MESSAGE_DETAIL_LIST[0],
    {
      ...MOCK_MESSAGE_DETAIL_LIST[1],
      textList: [
        {
          value: index + 1,
          key: 729218,
        },
      ],
    },
    ...MOCK_MESSAGE_DETAIL_LIST.slice(2),
  ];
}

export function getLessList() {
  return MOCK_MESSAGE_DETAIL_LIST.slice(0, 2);
}
