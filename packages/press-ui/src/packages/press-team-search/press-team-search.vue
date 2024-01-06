<template>
  <div
    class="press-search"
    :style="customStyle"
  >
    <div class="press-search__box">
      <div class="press-search__input-box">
        <div class="iconfont icon-search press-search__icon-search" />
        <div class="press-search__input-wrap">
          <div
            v-if="showFakePlaceholder"
            class="press-search__placeholder"
          >
            {{ placeholder }}
          </div>

          <input
            ref="searchInput"
            v-model="searchWords"
            class="press-search__input"
            placeholder-style="color: #c2c4c9;"
            :placeholder="innerPlaceholder"
            confirm-type="search"
            :focus="false"
            @keypress="onKeyPress"
            @blur="onBlur"
            @focus="onFocus"
            @confirm="onSearch"
          >
        </div>

        <div
          v-if="searchWords"
          class="iconfont icon-clear press-search__icon-clear"
          @click.stop="clearInput"
        />
      </div>
      <div
        class="press-search__confirm"
        @click="onSearch"
      >
        搜索
      </div>
    </div>
    <slot
      v-if="showContent"
      name="content"
    >
      <PressLoading
        v-if="loading && !teamList.length"
      />

      <div
        v-else-if="teamList.length"
        class="press-search__result"
      >
        <PressList
          v-model="innerLoading"
          :finished="finished"
          :immediate-check="immediateCheck"
          :loading-text="loadingText"
          :finished-text="finishedText"
          @load="load"
        >
          <div
            v-for="team in teamList"
            :key="team.team_id"
            class="press-search__team"
            @click="clickTeam(team)"
          >
            <div class="press-search__team-info">
              <img
                v-if="team.team_logo"
                v-lazy="team.team_logo"
                class="press-search__team-logo"
                size="32"
              >
              <div
                class="press-search__team-name press-ellipsis"
                v-html="team.teamNameHtml"
              />
            </div>
            <div
              class="iconfont icon-back press-search__icon-back"
            />
          </div>
        </PressList>
      </div>

      <PressEmpty
        v-else-if="!teamList.length"
        type="e-sport"
        description="暂无数据"
        custom-style="height: 100%;"
      />
    </slot>

    <slot name="other" />
  </div>
</template>

<script>
import PressEmpty from '../press-empty/press-empty.vue';
import PressList from '../press-list/press-list';
import PressLoading from '../press-loading/press-loading';


export default {
  name: 'PressTeamSearch',
  options: {
    virtualHost: true,
    styleIsolation: 'shared',
  },
  components: {
    PressEmpty,
    PressList,
    PressLoading,
  },
  props: {
    placeholder: {
      type: String,
      default: '搜索赛事名称',
    },
    customStyle: {
      type: String,
      default: '',
    },
    defaultSearchWords: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
      default: '加载中...',
    },
    finished: {
      type: Boolean,
      default: false,
    },
    finishedText: {
      type: String,
      default: '',
    },
    immediateCheck: {
      type: Boolean,
      default: false,
    },
    teamList: {
      type: Array,
      default: () => ([]),
    },
    showContent: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    'search',
    'blur',
    'focus',
    'clear',
    'clickTeam',
  ],
  data() {
    return {
      inputFocus: false,
      searchWords: '',
    };
  },
  computed: {
    innerLoading: {
      get() {
        return this.loading;
      },
      set(value) {
        this.$emit('update:loading', value);
      },
    },
    showFakePlaceholder() {
      return !this.searchWords && !this.inputFocus;
    },
    innerPlaceholder() {
      return this.showFakePlaceholder ? '' : this.placeholder;
    },
  },
  watch: {
    defaultSearchWords: {
      handler(val) {
        if (val) {
          this.searchWords = val;
        }
      },
      immediate: true,
    },
  },
  mounted() {
  },
  methods: {
    onBlur() {
      this.inputFocus = false;
      this.$emit('blur', this.searchWords);
    },
    onFocus() {
      this.inputFocus = true;
      this.$emit('focus', this.searchWords);
    },
    onKeyPress($event) {
      let evt = $event;
      evt = (evt) || window.event;
      const charCode = (evt.which) ? evt.which : evt.keyCode;
      if (charCode === 13) {
        this.$refs.searchInput.blur();
        this.onSearch();
      }
      return true;
    },
    onSearch() {
      this.$emit('search', this.searchWords);
    },
    clearInput() {
      this.searchWords = '';
      this.inputFocus = true;
      this.$emit('clear');
    },
    clickTeam(team) {
      this.$emit('clickTeam', team);
    },
    load() {
      this.$emit('load');
    },
  },
};

</script>
<style lang="scss" scoped src="./css/index.scss"></style>
