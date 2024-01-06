import PressDialog from '../../packages/press-dialog';
import PressToast from '../../packages/press-toast';
import {
  gotoDzGame,
  gotoGPGame,
  gotoLOLMGame,
  gotoMJGame,
  gotoTDGame,
  gotoTLBBGame,
  gotoWzCommunity,
  gotoWzGame,
  gotoX5MGame,
  gotoNarutoGame,
} from 't-comm/lib/launch-app/launch-app';
import { GAME_MAP as ORIGIN_GAME_MAP } from 't-comm/lib/launch-app/config';


export const SCHEME_MAP = {
  [ORIGIN_GAME_MAP.PVP.GID]: {
    default: 'wx95a3a4d7c627e07d://',
    qqAppScheme: 'tencent1104466820://',
    browserApkScheme: 'smoba://',
    community: 'tencentmsdk1104466820://',
  },
  [ORIGIN_GAME_MAP.GP.GID]: {
    default: 'pubgmhd1106467070://',
  },
  [ORIGIN_GAME_MAP.HLDDZ.GID]: {
    default: 'tencent363://',
    android: 'qqgame.hlddz.scheme://',
    iOS: 'tencent363://',
  },
  [ORIGIN_GAME_MAP.MJ.GID]: {
    default: 'happymjscheme://',
  },
  [ORIGIN_GAME_MAP.LOLM.GID]: {
    default: 'lolm://',
  },
  [ORIGIN_GAME_MAP.TY.GID]: {
    default: 'tencent1105636778://',
  },
  [ORIGIN_GAME_MAP.TLBB.GID]: {
    default: 'tencent1105245568://',
  },
  [ORIGIN_GAME_MAP.X5M.GID]: {
    default: 'tencent1105483033://',
  },
  [ORIGIN_GAME_MAP.NARUTO.GID]: {
    default: 'tencentmsdk1104307008://',
  },
};


const baseParams = {
  SCHEME_MAP,
  redirectUrl: 'https://baidu.com',
  appid: 'wx3d0d33def060a347',
  Toast: {
    showLoading: (str: string) => {
      PressToast.loading({
        message: str,
        duration: 0,
        forbidClick: true,
      });
    },
    dismissLoading: () => {
      PressToast.clear();
    },
  },
  Dialog: {
    showTipsDialog: (str: string) => {
      PressDialog.show({
        title: '',
        content: str,
        cancelText: '',
      });
    },
  },
};

export const GAME_MAP = {
  WZ: {
    zh: '王者荣耀',
    en: 'SMOBA',
    launchFunction: (params = {}) => {
      gotoWzGame({
        ...baseParams,
        ...params,
      });
    },
  },
  WZ_COMMUNITY: {
    zh: '王者荣耀微社区',
    en: 'SMOBA COMMUNITY',
    launchFunction: (params = {}) => {
      gotoWzCommunity({
        pageUrl: 'https://igame.qq.com/tip/ingame-page/ingame-pvp/index.html',
        ...baseParams,
        ...params,
      });
    },
  },
  GP: {
    zh: '和平精英',
    en: 'GP',
    launchFunction: (params = {}) => {
      gotoGPGame({
        ...baseParams,
        ...params,
      });
    },
  },
  DDZ: {
    zh: '斗地主',
    en: 'DDZ',
    launchFunction: (params = {}) => {
      gotoDzGame({
        ...baseParams,
        ...params,
      });
    },
  },
  MJ: {
    zh: '麻将',
    en: 'MJ',
    launchFunction: (params = {}) => {
      gotoMJGame({
        ...baseParams,
        ...params,
      });
    },
  },
  TLBB: {
    zh: '天龙八部',
    en: 'TLBB',
    launchFunction: (params = {}) => {
      gotoTLBBGame({
        ...baseParams,
        ...params,
      });
    },
  },
  TYMMD: {
    zh: '天涯明月刀',
    en: 'TYMMD',
    launchFunction: (params = {}) => {
      gotoTDGame({
        ...baseParams,
        ...params,
      });
    },
  },
  LOLM: {
    zh: '英雄联盟手游',
    en: 'LOLM',
    launchFunction: (params = {}) => {
      gotoLOLMGame({
        ...baseParams,
        ...params,
      });
    },
  },
  X5M: {
    zh: 'QQ炫舞',
    en: 'X5M',
    launchFunction: (params = {}) => {
      const allParams = {
        ...baseParams,
        ...params,
      };
      console.log('[allParams]', allParams);
      gotoX5MGame(allParams);
    },
  },
  NARUTO: {
    zh: '火影忍者',
    en: 'NARUTO',
    launchFunction: (params = {}) => {
      gotoNarutoGame({
        ...baseParams,
        ...params,
      });
    },
  },
};

export const LAUNCH_APP_STORAGE = {
  kEY: 'SHOW_LAUNCH_APP',
  VALUE: '1',
};
