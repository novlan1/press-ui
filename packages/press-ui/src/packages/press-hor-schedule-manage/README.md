---
url : pages/press/hor-schedule-manage/hor-schedule-manage
type: horizontal
horWidth: 725
marginRight: -56
---

## HorScheduleManage 横版赛程管理


## 引入

```ts
import PressHorScheduleManage from 'press-ui/press-hor-schedule-manage/press-hor-schedule-manage';

export default {
  components: {
    PressHorScheduleManage,
  }
}
```

## 代码演示

### 基础用法

```html
<PressHorScheduleManage
  :tab-index="curTab"
  :team-map="teamMap"
  :search-team-list="searchTeamList"
  :num-per-group="numPerGroup"
  :to-select-num-list="toSelectNumList"
  :is-all-confirmed="isAllConfirmed"
  @close="close"
  @changeTab="changeTab"
  @search="search"
  @selectNumPerGroup="selectNumPerGroup"
  @confirmAdjustGroup="confirmAdjustGroup"
  @toggleAllQualification="toggleAllQualification"
  @doneConfirmSignUp="doneConfirmSignUp"
  @publishScore="publishScore"
  @startGame="startGame"
  @startAllGame="startAllGame"
/>
```

```ts
import { MOCK_USER_META } from 'src/packages/press-message-detail/demo-helper/data';
const ROUND_TOTAL = 5;

export const getTeamList = (length, start = 0) => Array.from({ length }).map((_, index) => ({
  teamavatar: MOCK_USER_META.avatar,
  teamname: `name-${index + 1 + start}`,
  memnum: 2,
  isPass: index % 5 !== 0,
  checked: true,
  disabled: index % 5 === 0,
  members: Array.from({ length: 3 }).map((_, idx) => ({
    head: MOCK_USER_META.avatar,
    nick: `${MOCK_USER_META.nick} - ${idx + 1}`,
    uid: `${index}-${idx}`,
  })),
}));


const getGroupTeamList = len => Array.from({ length: len }).map(() => ({
  teamAvatar: MOCK_USER_META.avatar,
}));

export const getGroupList = (length = 9, start = 0) => Array.from({ length }).map((_, index) => ({
  groupSeq: index + 1 + start,
  teamLen: index + 1,
  teamList: getGroupTeamList(index + 1),
  started: true,
}));

function getGroupMap(): any {
  return Array.from({ length: ROUND_TOTAL }).reduce((acc: any, item, index) => {
    acc[index + 1] = {
      list: getGroupList(),
      finished: false,
      loading: false,
    };
    return acc;
  }, {});
}

function getRoundList() {
  return Array.from({ length: ROUND_TOTAL }).map((_, index) => ({
    roundId: index + 1,
    started: index % 2 === 0,
  }));
}

export function getTeamScoreList() {
  return Array.from({ length: 12 }).map((_, index) => ({
    teamName: `A-${index + 1}`,
    totalScore: 1,
    scoreStr: '1 | 2 | 3',
    rank: index + 1,
    historyScoreList: [
      {
        roundStr: '第一场',
        rank: 1,
        score: 2,
      },
      {
        roundStr: '第二场',
        rank: 1,
        score: 2,
      },
    ],
  }));
}

export function getDemoData() {
  const teamList = getTeamList(10);
  const groupMap = getGroupMap();
  const roundList = getRoundList();
  const toSelectNumList = Array.from({ length: teamList.length }).map((_, index) => index + 1);

  return {
    teamList,
    groupMap,
    groupList: groupMap[1].list,
    roundList,
    toSelectNumList,
  };
}

function resumeViewPort() {
  // #ifdef H5
  document.querySelector('meta[name=\'viewport\']').content = 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover';
  // #endif
}

function setViewport() {
  // #ifdef H5
  document.querySelector('meta[name=\'viewport\']').content = 'width=821, user-scalable=no, viewport-fit=cover';
  // #endif
}

export default {
  data() {
    return {
      curTab: 0,
      teamMap: {
        list: [],
        finished: false,
        loading: false,
      },
      searchTeamMap: {
        list: [],
        finished: false,
        loading: false,
      },
      groupListMap: {
        list: [],
        finished: false,
        loading: false,
      },
      groupMap: {
        1: {
          list: [],
          finished: false,
          loading: false,
        },
      },
      searchTeamMapInGroup: {
        list: [],
        finished: false,
        loading: false,
      },

      isAllConfirmed: true,
      toSelectNumList: [1],

      numPerGroup: 1,
      curStartRoundId: 1,
      curScoreRoundId: 1,
      roundList: [],
      teamScoreMap: { ['1-1']: { list: getTeamScoreList() } },
    };
  },
  mounted() {
    const { teamList, groupMap, roundList, toSelectNumList, groupList } = getDemoData();

    setTimeout(() => {
      this.teamMap.list = teamList;
      this.groupMap = groupMap;
      this.roundList = roundList;
      this.toSelectNumList = toSelectNumList;
      this.groupListMap.list = groupList;
    }, 1000);

    setViewport();
  },
  beforeDestroy() {
    resumeViewPort();
  },
  methods: {
    close() {
      routerBack.call(this);
    },
    changeTab(tab) {
      console.log('changeTab', tab);
      this.curTab = tab;
    },
    search(value) {
      console.log('[search] ', value);
      this.searchTeamMap.list = this.teamMap.list.filter(item => item.teamname.indexOf(value) > -1);
    },
    searchTeamGroup(value) {
      console.log('[searchTeamGroup] ', value);
      this.searchTeamMapInGroup.list = this.teamMap.list.filter(item => item.teamname.indexOf(value) > -1);
    },
    selectNumPerGroup(num) {
      console.log('[selectNumPerGroup]', num);
      this.numPerGroup = num;
    },
    confirmAdjustGroup() {
      this.onGTip('[confirmAdjustGroup]');
    },
    toggleAllQualification() {
      this.onGTip('[toggleAllQualification]');
      this.isAllConfirmed = !this.isAllConfirmed;
    },
    doneConfirmSignUp() {
      this.onGTip('[doneConfirmSignUp]');
    },
    publishScore() {
      this.onGTip('[publishScore]');
    },
    startGame() {
      this.onGTip('[startGame]');
    },
    startAllGame() {
      this.onGTip('[startAllGame]');
    },
    changeScoreRoundId(roundId) {
      console.log('[changeScoreRoundId] roundId', roundId);
      this.onGTip(`[changeScoreRoundId] ${roundId}`);
      this.curScoreRoundId = roundId;
    },
    changeStartRoundId(roundId) {
      console.log('[changeStartRoundId] roundId', roundId);
      this.onGTip(`[changeStartRoundId] ${roundId}`);
      this.curStartRoundId = roundId;
    },
    selectGroupInScore(groupSeq) {
      console.log('[selectGroupInScore] groupSeq', groupSeq);
      this.onGTip(`[selectGroupInScore] ${groupSeq}`);
    },
    checkTeam(team) {
      this.$set(team, 'checked', !team.checked);
    },
    loadMore(key) {
      console.log('[demo loadMore]');
      const loadMoreMap = {
        teamMap: this.loadMoreTeamList,
        searchTeamMap: this.loadMoreSearchTeamList,
        groupListMap: this.loadMoreGroupListMap,
        groupMap: this.loadMoreGroupMap,
        searchTeamMapInGroup: this.loadMoreSearchTeamMapInGroup,
      };
      if (typeof loadMoreMap[key] === 'function') {
        loadMoreMap[key]();
      }
    },
    loadMoreTeamList() {
      this.loadMoreCommon(
        'teamMap',
        getTeamList(10, this.teamMap.list.length),
      );
    },
    loadMoreSearchTeamList() {
      this.loadMoreCommon(
        'searchTeamMap',
        getTeamList(10, this.searchTeamMap.list.length),
      );
    },
    loadMoreSearchTeamMapInGroup() {
      this.loadMoreCommon(
        'searchTeamMapInGroup',
        getTeamList(10, this.searchTeamMapInGroup.list.length),
      );
    },
    loadMoreCommon(key, moreList, key2) {
      let data = this[key];
      if (key2) {
        data = data[key2];
      }
      setTimeout(() => {
        data.list = data.list.concat(moreList);
        data.loading = false;
        data.finished =  data.list.length >= 50;
      }, 300);
    },
    loadMoreGroupListMap() {
      this.loadMoreCommon(
        'groupListMap',
        getGroupList(10, this.groupListMap.list.length),
      );
    },
    loadMoreGroupMap() {
      this.loadMoreCommon(
        'groupMap',
        getGroupList(10, this.groupMap[this.curStartRoundId].list.length),
        this.curStartRoundId,
      );
    },
    updateLoading(key, value) {
      if (key === 'groupMap') {
        this.groupMap[this.curStartRoundId].loading = value;
        return;
      }
      this[key].loading = value;
    },
  }
}
```

## API

### Props


| 参数                     | 说明                     | 类型      | 默认值  |
| ------------------------ | ------------------------ | --------- | ------- |
| tab-index                | 当前 `tab` 索引          | _number_  | `0`     |
| cur-going-tab            | 正在进行中的 `tab` 索引  | _number_  | `0`     |
| team-map                 | 队伍列表信息             | _object_  | -       |
| search-team-map          | 搜索队伍信息             | _object_  | -       |
| is-all-confirmed         | 是否已全部确认           | _boolean_ | `false` |
| team-total               | 队伍总数                 | _number_  | `0`     |
| checked-team-total       | 已确认到场的队伍数目     | _number_  | `0`     |
| num-per-group            | 每组队伍数               | _number_  | `1`     |
| to-select-num-list       | 可分配的每组队伍数目列表 | _array_   | `[1]`   |
| group-num                | 分组总数                 | _number_  | `0`     |
| group-list-map           | 全部分组信息             | _object_  | -       |
| round-total              | 轮次数                   | _number_  | `1`     |
| group-map                | 分组对象                 | _object_  | -       |
| cur-start-round-id       | 确认开赛的当前轮次 Id    | _number_  | `1`     |
| cur-score-round-id       | 公布成绩的当前轮次 Id    | _number_  | `1`     |
| team-score-map           | 队伍比分对象             | _object_  | -       |
| search-team-map-in-group | 分组中的搜索队伍信息     | _object_  | -       |
| round-list               | 轮次列表                 | _array_   | -       |
| published-score          | 是否已公布成绩           | _boolean_ | `false` |


### Events

| 事件名                 | 说明                     | 参数                |
| ---------------------- | ------------------------ | ------------------- |
| close                  | 关闭本页面               | -                   |
| changeTab              | 切换 tab                 | `tabIndex`          |
| toggleAllQualification | 全部确认或取消资格       | -                   |
| doneConfirmSignUp      | 确认资格完毕，进入下一步 | -                   |
| checkTeam              | 确认或取消单个队伍的资格 | `team`, `teamIndex` |
| selectNumPerGroup      | 选择每组队伍数           | `num`               |
| confirmAdjustGroup     | 确认调整分组             | -                   |
| changeStartRoundId     | 确认开赛中的切换轮次 Id  | `roundId`           |
| changeScoreRoundId     | 公布成绩中的切换轮次 Id  | `roundId`           |
| startGame              | 单场开赛                 | `item`              |
| startAllGame           | 整轮开赛                 | -                   |
| publishScore           | 公布成绩                 | -                   |
| clickSearch            | 确认资格中，点击搜索     | -                   |
| search                 | 确认资格中，搜素队伍     | `value`             |
| searchTeamGroup        | 确认开赛中，搜素队伍     | `value`             |
| selectGroupInScore     | 公布成绩中，切换分组     | `groupSeq`          |
| loadMore               | 加载更多                 | `key`, `value`      |


### teamMap

```ts
// 队员信息
type IMember = {
  head: string; // 头像
  is_cap: boolean; // 是否为队长
  uid: string;
  nick: string;
}

// 队伍信息
type ITeamInfo = {
  teamavatar: string;
  teamname: string;
  memnum: number; // 队伍人数

  isPass: boolean; // 是否满足参赛人数
  checked: boolean; // 是否已确认资格
  disabled: boolean; // 是否禁用
  members: Array<IMember>; // 队员信息
}

// teamMap
type ITeamMap = {
  list: ITeamList;
  finished: boolean;
  loading: boolean;
}

// teamList
type ITeamList = Array<ITeamInfo>

// searchTeamMap
type ISearchTeamMap = {
  list: Array<ITeamInfo>;
  finished: boolean;
  loading: boolean;
}
```

### groupListMap & groupMap

`groupListMap` 是所有轮次的分组信息，`groupMap` 是某一轮的分组信息。

```ts
// 分组信息
type IGroupInfo = {
  title: string; // 标题名称，默认为 第 x 组
  groupSeq: number; // 第几组，从 1 开始
  roundId: number; // 第几轮，从 1 开始
  teamLen: number; // 队伍数目

  started: boolean; // 是否已开赛
  finished: boolean; // 是否已结束
  teamList: Array<{
    teamAvatar: string; // 队伍头像
  }>;
}

// groupListMap
type IGroupListMap = {
  list: Array<GroupInfo>;
  finished: boolean;
  loading: boolean;
}

// groupMap
type IGroupMap = Record<number, {
  list: Array<GroupInfo>;
  finished: boolean;
  loading: boolean;
}>

// searchTeamMapInGroup
type ISearchTeamMapInGroup = {
  list: Array<ITeamInfo>;
  finished: boolean;
  loading: boolean;
}
```


### teamScoreMap

```ts
// teamScoreMap, key 为 `${curScoreRoundId}-${curGroupSeq}`
type ITeamScoreMap = Record<string, {
  list: Array<{
    rank: number; // 排名
    teamAvatar: string; 
    teamName: string;

    scoreStr: string; // 比分，可以为如下形式： 1 | 2 | 1 
    totalScore: number; // 总积分

    historyScoreList: Array<{
      roundStr: string; // 轮次描述，比如 第一场
      rank: number;
      score: number; // 比分
    }>
  }>;
}>
```

### roundList

```ts
type IRoundList = Array<{
  roundId: number;
  started: boolean; // 是否已开赛
}>
```
