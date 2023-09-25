<template>
  <div class="demo-wrap">
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
  </div>
</template>
<script>
import PressTeamSearch from 'src/packages/press-team-search/press-team-search.vue';
import { getHighLightHtml } from 'src/packages/press-team-search/utils';
import { justWait } from 't-comm/lib/e2e-test/element';

const MOCK_TEAM_LIST = Array.from({ length: 200 }).map((_, index) => {
  const teamName = `${index}_team_vue+_press_ui_vue?++_vue*_components_uni-app`;
  return {
    team_name: index % 5 === 0 ? teamName.slice(0, 10) : teamName,
    team_id: index,
    team_logo: 'https://image-1251917893.file.myqcloud.com/Esports/user/img/default-avatar.png',
  };
});


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
  components: {
    PressTeamSearch,
  },
  data() {
    return {
      teamList: [],
      loading: false,
      finished: false,
      searchValue: '',
      loadTime: 0,
    };
  },
  methods: {
    async onSearch(value) {
      console.log('[search]', value);

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
      this.onGTip(`[clickTeam] ${team.team_id}`);
    },
    onClear() {
      this.onGTip('[clear]');
      console.log('[clear]');
      this.searchValue = '';
    },
    onFocus() {
      this.onGTip('[focus]');
      console.log('[focus]');
    },
    onBlur() {
      this.onGTip('[blur]');
      console.log('[blur]');
    },
    async onLoadMore() {
      console.log('[onLoadMore]');
      this.loadTime += 1;
      const { teamList, finished } = await getDemoTeamList(this.loadTime, this.searchValue);

      this.finished = finished;
      this.teamList = this.teamList.concat(teamList);
      this.loading = false;
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  background: #f5f6fa;
  background: url(https://image-1251917893.file.myqcloud.com/Esports/new/user/fullpage-light-bg.png) no-repeat center 0.88rem;
  background-size: 100% auto;
  display: flex;
  overflow: hidden;

  ::v-deep press-team-search {
    // QQ小程序需要加，否则无法撑开高度
    display: flex;
    height: 100%;

    // QQ小程序需要加，否则队伍名称宽度过大
    width: 100%;
  }
}
</style>
