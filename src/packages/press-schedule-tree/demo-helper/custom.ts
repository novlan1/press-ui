import {
  // FUNCTIONAL_ID_MAP,
  showPopupCell,
  showPicker,
} from 'src/packages/press-popup-cell/demo-helper/helper';
import {
  DEFAULT_TEAM_NUMBER,
  TEAM_LIST,
  TEAM_MAP,
  STATUS_TITLE_MAP,
  STATUS_MAP,
  STATUS_LIST,
  GROUP_TYPE_LIST,
  GROUP_TYPE_MAP,
} from './helper';

export const local = {
  teamNumber: DEFAULT_TEAM_NUMBER,
  status: STATUS_MAP.NOT_START,
  isAdmin: false,
  groupType: GROUP_TYPE_LIST[0].value,
};


export function showCustomPopup({ context, callback }) {
  showPopupCell({
    title: '自定义设置',
    closeIcon: true,
    cellList: [
      {
        label: '队伍个数',
        value: TEAM_MAP[local.teamNumber],
        click: ({ context: popupContext }) => {
          popupContext.closeDialog();
          showPicker({
            title: '队伍个数',
            closeIcon: true,
            list: TEAM_LIST,
            current: {
              value: local.teamNumber,
            },
          }).then(({ item }: any) => {
            local.teamNumber  = item.value;
            context.onGTip('设置成功');
            if (typeof callback.changeTeamNumber === 'function') {
              callback.changeTeamNumber.call(context, item.value);
            }
          })
            .catch(() => {

            });
        },
      },
      {
        label: '当前状态',
        value: STATUS_TITLE_MAP[local.status],
        click: ({ context: popupContext }) => {
          popupContext.closeDialog();

          showPicker({
            title: '当前状态',
            closeIcon: true,
            list: STATUS_LIST,
            current: {
              value: local.status,
            },
          }).then(({ item }: any) => {
            local.status = item.value;
            context.onGTip('设置成功');

            if (typeof callback.changeStatus === 'function') {
              callback.changeStatus.call(context, item.value);
            }
          })
            .catch(() => {

            });
        },
      },
      {
        label: '赛制',
        value: GROUP_TYPE_MAP[local.groupType].title,
        click: ({ context: popupContext }) => {
          popupContext.closeDialog();

          showPicker({
            title: '当前状态',
            closeIcon: true,
            list: GROUP_TYPE_LIST,
            current: {
              value: local.groupType,
            },
          }).then(({ item }: any) => {
            local.groupType = item.value;
            context.onGTip('设置成功');

            if (typeof callback.changeGroupType === 'function') {
              callback.changeGroupType.call(context, item.value);
            }
          })
            .catch(() => {

            });
        },
      },
      {
        label: '是否为管理员',
        type: 'switch',
        open: local.isAdmin,
        click: ({ context: popupContext }) => {
          // if (value === undefined) return;
          popupContext.closeDialog();
          local.isAdmin = !local.isAdmin;
          context.onGTip('设置成功');

          if (typeof callback.changeAdmin === 'function') {
            callback.changeAdmin.call(context, local.isAdmin);
          }
        },
      },
    ],
  }).then((resp: any) => {
    const { context: popupContext = {} } = resp || {};
    popupContext.closeDialog();
  })
    .catch((err) => {
      const { context: popupContext = {} } = err || {};
      console.log('[showCustomPopup] err', err);
      popupContext.closeDialog();
    });
}
