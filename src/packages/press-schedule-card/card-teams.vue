<template>
  <div class="press-sche-card-join__teams">
    <div
      v-for="(item, index) in teamList"
      :key="index"
      class="press-sche-card-join__team"
    >
      <div class="press-sche-card-join__team-avatar-box">
        <img
          v-lazy="item.head"
          class="press-sche-card-join__team-avatar"
          alt=""
          srcset=""
        >
        <!-- 玩家准备与未准备状态 -->
        <div
          v-if="item.readyDesc"
          class="press-sche-card-join__team-desc"
          :class="
            item.readyType == 1
              ? 'press-sche-card-join__team-desc--light' : ''
          "
        >
          {{ item.readyDesc }}
        </div>
      </div>
      <div class="press-sche-card-join__team-name">
        {{ item.nick }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PressScheduleCardTeams',
  props: {
    teamList: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {

    };
  },
};
</script>
<style scoped lang="scss" src="./css/card-teams.scss"></style>
