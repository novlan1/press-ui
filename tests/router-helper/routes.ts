export const ROUTES = [
  {
    path: '/views/index/index-home',
    name: 'home',
    aliasPath: '/',
    meta: {
      keepPosition: true,
      useDefaultTitle: true,
      rawPath: [
        '/home',
      ],
    },
  },
  {
    path: '/views/webview/webview',
    name: 'webview',
  },
  {
    path: '/views/douyu-channel-match/index',
    aliasPath: '/douyu-channel-match',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/douyu-channel-match',
      ],
    },
  },
  {
    path: '/views/qq-channel-match/index',
    aliasPath: '/qq-channel-match',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/qq-channel-match',
      ],
    },
  },
  {
    path: '/views/environment-tips/index',
    aliasPath: '/environment-tips',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/environment-tips',
      ],
    },
  },
  {
    path: '/views/debug/index',
    aliasPath: '/debug',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/debug',
      ],
    },
  },
  {
    path: '/views/cycle-set/cycle-set',
    name: 'sche-cycle-set',
    aliasPath: '/sche/cycle-set/:siteid/:childid',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/sche/cycle-set/:siteid/:childid',
      ],
    },
  },
  {
    path: '/views/cup-set/cup-set',
    name: 'sche-cup-set',
    aliasPath: '/sche/cup-set/:siteid/:childid',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/sche/cup-set/:siteid/:childid',
      ],
    },
  },
  {
    path: '/views/select-promotion-team/select-promotion-team',
    name: 'select-promotion-team',
    aliasPath: '/sche/select-promotion-team/:siteid/:childid',
    meta: {
      title: '选择晋级队伍',
      rawPath: [
        '/sche/select-promotion-team/:siteid/:childid',
      ],
    },
  },
  {
    path: '/views/sche-set/sche-set',
    name: 'set-sche',
    aliasPath: '/sche/set/:childid',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/sche/set/:childid',
      ],
    },
  },
  {
    path: '/views/sche/sche',
    name: 'sche',
    aliasPath: '/sche/:childid',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/sche/:childid',
      ],
    },
  },
  {
    path: '/views/invite-letter/invite-letter',
    name: 'invite-letter',
    meta: {
      useDefaultTitle: false,
      rawPath: [

      ],
    },
  },
  {
    path: '/views/match/match-detail-index',
    name: 'match-detail-index',
    aliasPath: '/match/match-detail-index/:childid/:inviteteamid?',
    meta: {
      useDefaultTitle: false,
      keepPosition: true,
      rawPath: [
        '/match/match-detail-index/:childid/:inviteteamid?',
      ],
    },
  },
  {
    path: '/views/match-data/match-data',
    name: 'match-data',
    aliasPath: '/match-data/:childid/:grouptype?',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/match-data/:childid/:grouptype?',
      ],
    },
  },
  {
    path: '/views/match-rule-detail/match-rule-detail',
    name: 'match-rule-detail',
    aliasPath: '/match/match-rule-detail/:childid',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/match/match-rule-detail/:childid',
      ],
    },
  },
  {
    path: '/views/poster/poster',
    name: 'poster',
    aliasPath: '/poster/:childid/:postertype',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/poster/:childid/:postertype',
      ],
    },
  },
  {
    path: '/views/match-config/tip-match-game-record',
    name: 'tip-match-game-record',
    aliasPath: '/match/tip-match-game-record/:childid',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/match/tip-match-game-record/:childid',
      ],
    },
  },
  {
    path: '/views/match-config/reward-cfg',
    name: 'reward-cfg',
    aliasPath: '/match/work-bench/reward-cfg/:childid?',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/match/work-bench/reward-cfg/:childid?',
      ],
    },
  },
  {
    path: '/views/match-config/image-crop',
    name: 'image-crop',
    aliasPath: '/match/work-bench/image-crop',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/match/work-bench/image-crop',
      ],
    },
  },
  {
    path: '/views/match-config/match-ob-room',
    name: 'match-ob-room',
    aliasPath: '/match-ob-room/:battleid',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/match-ob-room/:battleid',
      ],
    },
  },
  {
    path: '/views/match-config/match-manager',
    name: 'match-manager',
    aliasPath: '/match-manager/:childid',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/match-manager/:childid',
      ],
    },
  },
  {
    path: '/views/match-config/match-manager-apply',
    name: 'match-manager-apply',
    aliasPath: '/match-manager-apply/:childid',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/match-manager-apply/:childid',
      ],
    },
  },
  {
    path: '/views/match-config/match-manager-apply-list',
    name: 'match-manager-apply-list',
    aliasPath: '/match-manager-apply-list/:childid',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/match-manager-apply-list/:childid',
      ],
    },
  },
  {
    path: '/views/match-config/schedule-list',
    name: 'schedule-list',
    aliasPath: '/schedule-list/:childid',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/schedule-list/:childid',
      ],
    },
  },
  {
    path: '/views/ai-room/ai-room',
    name: 'ai-room',
    aliasPath: '/ai-room/:childid/:schid',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/ai-room/:childid/:schid',
      ],
    },
  },
  {
    path: '/views/ai-room/battle-ai-room',
    name: 'battle-ai-room',
    aliasPath: '/battle/:childid/:schid',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/battle/:childid/:schid',
      ],
    },
  },
  {
    path: '/views/video-room/video-room',
    name: 'video-room',
    aliasPath: '/video-room/:childid/:schid/:battleid/:curbo?',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/video-room/:childid/:schid/:battleid/:curbo?',
      ],
    },
  },
  {
    path: '/views/test-join-room/test-join-room',
    name: 'test-join-room',
    aliasPath: '/test-join-room',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/test-join-room',
      ],
    },
  },
  {
    path: '/views/room/room',
    name: 'room',
    aliasPath: '/room/:childid/:schid',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/room/:childid/:schid',
      ],
    },
  },
  {
    path: '/views/room/room-quick',
    name: 'room-quick',
    aliasPath: '/room-quick/:childid',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/room-quick/:childid',
      ],
    },
  },
  {
    path: '/views/battle/battle-detail',
    name: 'battle-detail',
    aliasPath: '/battle/battle-detail/:childid/:schid',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/battle/battle-detail/:childid/:schid',
      ],
    },
  },
  {
    path: '/views/battle/battle-detail-undetermined',
    name: 'battle',
    aliasPath: '/battle/:round_stage/:round_type/:round_id/:partition_id/:group_id/:child_id',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/battle/:round_stage/:round_type/:round_id/:partition_id/:group_id/:child_id',
      ],
    },
  },
  {
    path: '/views/create/create-preview',
    name: 'create-preview',
    aliasPath: '/create/create-preview',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/create/create-preview',
      ],
    },
  },
  {
    path: '/views/create/create',
    name: 'create',
    aliasPath: '/create',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/create',
      ],
    },
  },
  {
    path: '/views/create/create-rule',
    name: 'create-rule',
    aliasPath: '/create/create-rule',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/create/create-rule',
      ],
    },
  },
  {
    path: '/views/create/create-custom-group-type',
    name: 'create-custom-group-type',
    aliasPath: '/create/custom-group-type',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/create/custom-group-type',
      ],
    },
  },
  {
    path: '/views/create/create-complete',
    name: 'create-complete',
    aliasPath: '/create/create-complete/:childid/:parentid',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/create/create-complete/:childid/:parentid',
      ],
    },
  },
  {
    path: '/views/history/index-history',
    name: 'history',
    aliasPath: '/history',
    meta: {
      useDefaultTitle: true,
      keepPosition: true,
      rawPath: [
        '/history',
      ],
    },
  },
  {
    path: '/views/edit/edit-rule',
    name: 'edit-rule',
    aliasPath: '/match-edit/edit-rule',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/match-edit/edit-rule',
      ],
    },
  },
  {
    path: '/views/edit/match-edit',
    name: 'match-edit',
    aliasPath: '/match-edit/:childid',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/match-edit/:childid',
      ],
    },
  },
  {
    path: '/views/edit/match-edit-reward',
    name: 'match-edit-reward',
    aliasPath: '/match-edit-reward',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/match-edit-reward',
      ],
    },
  },
  {
    path: '/views/edit/edit-custom-group-type',
    name: 'edit-custom-group-type',
    aliasPath: '/edit/custom-group-type',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/edit/custom-group-type',
      ],
    },
  },
  {
    path: '/views/team/team-list/index',
    name: 'team-list',
    aliasPath: '/team/team-list/:actid',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/team/team-list/:actid',
      ],
    },
  },
  {
    path: '/views/team/team-member/index',
    name: 'team-member',
    aliasPath: '/team-member/:actid',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/team-member/:actid',
      ],
    },
  },
  {
    path: '/views/team/team-member/team-index',
    name: 'team-team-member',
    aliasPath: '/team/team-member/:actid',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/team/team-member/:actid',
      ],
    },
  },
  {
    path: '/views/team-zone/team-zone',
    name: 'team-zone',
    aliasPath: '/team-zone/:childid/:teamid',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/team-zone/:childid/:teamid',
      ],
    },
  },
  {
    path: '/views/match-detail/match-detail',
    name: 'match-detail',
    aliasPath: '/match/match-detail/:childid',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/match/match-detail/:childid',
      ],
    },
  },
  {
    path: '/views/match-detail/publish-news',
    name: 'publish-news',
    aliasPath: '/match/publish-news/:childid',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/match/publish-news/:childid',
      ],
    },
  },
  {
    path: '/views/phone/bind-phone',
    name: 'user-bind-phone',
    aliasPath: '/user-bind-phone/:mode',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/user-bind-phone/:mode',
      ],
    },
  },
  {
    path: '/views/message-center/message-center-index',
    name: 'message-center-index',
    aliasPath: '/message-center-index',
    meta: {
      rawPath: [
        '/message-center-index',
      ],
    },
  },
  {
    path: '/views/message-center/message-center-detail',
    name: 'message-center-detail',
    aliasPath: '/message-center-detail/:id',
    meta: {
      rawPath: [
        '/message-center-detail/:id',
      ],
    },
  },
  {
    path: '/views/homepage/account-manage',
    name: 'account-manage',
    aliasPath: '/account-manage',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/account-manage',
      ],
    },
  },
  {
    path: '/views/homepage/protocol',
    name: 'protocol',
    aliasPath: '/protocol',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/protocol',
      ],
    },
  },
  {
    path: '/views/homepage/homepage',
    name: 'homepage',
    aliasPath: '/homepage/:uid?',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/homepage/:uid?',
      ],
    },
  },
  {
    path: '/views/homepage/login',
    name: 'login',
    aliasPath: '/login',
    meta: {
      needLogin: false,
      rawPath: [
        '/login',
      ],
    },
  },
  {
    path: '/views/homepage/test-whitelist',
    name: 'test-whitelist',
    aliasPath: '/test-whitelist',
    meta: {
      rawPath: [
        '/test-whitelist',
      ],
    },
  },
  {
    path: '/views/setting/match-setting',
    name: 'match-setting',
    aliasPath: '/match-setting/:childid',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/match-setting/:childid',
      ],
    },
  },
  {
    path: '/views/owner/owner-introduce',
    name: 'owner-introduce',
    aliasPath: '/owner-introduce',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/owner-introduce',
      ],
    },
  },
  {
    path: '/views/owner/owner-apply',
    name: 'owner-apply',
    aliasPath: '/owner-apply',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/owner-apply',
      ],
    },
  },
  {
    path: '/views/owner/owner-share',
    name: 'owner-share',
    aliasPath: '/owner-share',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/owner-share',
      ],
    },
  },
  {
    path: '/views/owner/owner-save',
    name: 'owner-save',
    aliasPath: '/owner-save',
    meta: {
      useDefaultTitle: false,
      rawPath: [
        '/owner-save',
      ],
    },
  },
  {
    path: '/views/owner/owner-mp-save',
    name: 'owner-mp-save',
    meta: {
      useDefaultTitle: false,
      rawPath: [

      ],
    },
  },
  {
    path: '/views/third-plat-login/index',
    name: 'third-plat-login',
    aliasPath: '/third-plat-login',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/third-plat-login',
      ],
    },
  },
  {
    path: '/views/third-plat-login/phone-login',
    name: 'phone-login',
    aliasPath: '/phone-login',
    meta: {
      useDefaultTitle: true,
      rawPath: [
        '/phone-login',
      ],
    },
  },
];
