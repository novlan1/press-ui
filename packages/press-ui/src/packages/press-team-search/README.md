---
url : pages/press/team-search/team-search
---

## TeamSearch 队伍搜索


## 引入

```ts
import PressTeamSearch from 'press-ui/press-team-search/press-team-search';

export default {
  components: {
    PressTeamSearch,
  }
}
```

## 代码演示

### 基础用法


```html
<PressTeamSearch
  :team-list="teamList"
  :loading="loading"
  :finished="finished"
  @load="onLoadMore"
  @update:loading="value => loading = value"
  @search="onSearch"
  @clickTeam="onClickTeam"
  @clear="onClear"
  @focus="onFocus"
  @blur="onBlur"
/>
```

```ts
async function getDemoTeamList(loadTime, searchValue) {
  const BATCH = 20;

  const teamList = MOCK_TEAM_LIST
    .filter(item => item.team_name.indexOf(searchValue) > -1)
    .slice(loadTime * BATCH, (loadTime + 1) * BATCH)
    .map(item => ({
      ...item,
      teamNameHtml: getHighLightHtml(item.team_name, searchValue),
    }));
  await justWait(600 - loadTime * 100);

  return {
    teamList,
    finished: !teamList.length,
  };
}

export default {
  data() {
    return {
      teamList: [],
      loading: false,
      finished: false,
      searchValue: '',
      loadTime: 0,
    }
  },
  methods: {
    async onSearch(value) {
      this.searchValue = value;
      this.teamList = [];
      this.loadTime = 0;
      this.loading = true;

      const { teamList, finished } = await getDemoTeamList(this.loadTime, value);

      this.teamList = teamList;
      this.finished = finished;
      this.loading = false;
    },
    onClickTeam(team) {
      console.log('[clickTeam]', team);
    },
    onClear() {
      this.searchValue = '';
    },
    onFocus() {
    },
    onBlur() {
    },
    async onLoadMore() {
      this.loadTime += 1;
      const { teamList, finished } = await getDemoTeamList(this.loadTime, this.searchValue);

      this.finished = finished;
      this.teamList = this.teamList.concat(teamList);
      this.loading = false;
    },
  }
}
```


## API

### Props

| 参数                 | 说明                                         | 类型      | 默认值         |
| -------------------- | -------------------------------------------- | --------- | -------------- |
| placeholder          | 占位文字                                     | _string_  | `搜索赛事名称` |
| custom-style         | 自定义样式                                   | _string_  | -              |
| default-search-words | 默认搜索内容                                 | _string_  | -              |
| loading              | 是否为加载中                                 | _boolean_ | `false`        |
| loading-text         | 加载过程中的提示文案                         | _string_  | `加载中...`    |
| finished             | 是否已加载完成，加载完成后不再触发`load`事件 | _boolean_ | `false`        |
| finished-text        | 加载完成后的提示文案                         | _string_  | -              |
| immediate-check      | 是否在初始化时立即执行滚动位置检查           | _boolean_ | `false`        |
| show-content         | 是否展示搜索结果，默认为列表形式             | _boolean_ | `true`         |
| team-list            | 队伍列表                                     | _array_   | -              |



### Events

| 事件名         | 说明           | 参数        |
| -------------- | -------------- | ----------- |
| focus          | 输入框聚焦     | searchWords |
| blur           | 输入框失焦     | searchWords |
| search         | 点击搜索       | searchWords |
| clear          | 清除搜索内容   | -           |
| clickTeam      | 点击队伍       | team        |
| load           | 加载更多       | -           |
| update:loading | 更新加载中状态 | loading     |

### Slot

| 名称    | 说明         |
| ------- | ------------ |
| content | 搜索队伍列表 |
| other   | 其他搜索结果 |



### teamList 类型

```ts
type ITeamList = Array<{
  team_id: string; // 需要唯一，作为key
  team_logo: string; // 队伍图片
  teamNameHtml: string; // 队伍名称高亮处理后的html
}>
```


### getHighLightHtml

这里提供了一个获取高亮 `html` 的 方法，可以根据之前的内容和搜索内容，生成高亮的 `html`。

```ts
import { getHighLightHtml } from 'press-ui/press-team-search/utils';

const teamName = '123123';
const searchWords = '1';


getHighLightHtml(teamName, searchWords, '#1181d7');
// <span style="color: #1181d7;">1</span>23<span style="color: #1181d7;">1</span>23
```


## 常见问题

### virtualHost

由于QQ小程序不支持 `virtualHost`，可以在父组件样式文件中，增加如下代码来兼容：

```scss
::v-deep press-team-search {
  flex: 1;
  display: flex;
  overflow: hidden;
}
```
