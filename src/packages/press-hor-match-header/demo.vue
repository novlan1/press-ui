<template>
  <div class="demo-wrap">
    <PressHorMatchHeader
      @back="onBack"
    >
      <template #middle>
        <div class="home-header">
          商户赛
        </div>
      </template>
      <template #right>
        <div class="home-right red-dot">
          <!-- 红点--red-dot -->
          <div
            :class="['home-msg',
                     showMessageDot ? 'red-dot':'']"
            @click="clickMessage"
          />
          <div
            :class="['home-person',
                     showPersonDot ? 'red-dot':'']"
            @click="clickPerson"
          />
        </div>
      </template>
    </PressHorMatchHeader>
  </div>
</template>
<script>
import PressHorMatchHeader from 'src/packages/press-hor-match-header/press-hor-match-header.vue';

export default {
  components: {
    PressHorMatchHeader,
  },
  data() {
    return {
      showMessageDot: true,
      showPersonDot: true,
    };
  },
  methods: {
    clickMessage() {
      this.onGTip('message');
    },
    clickPerson() {
      this.onGTip('home');
    },
    onBack() {
      this.onGTip('back');
    },
  },
};
</script>
<style scoped lang="scss">
.demo-wrap {
  background: url(https://image-1251917893.file.myqcloud.com/Esports/hor/bg.png)
    no-repeat;
  background-size: 100% 100%;
}

.home-header {
  font-family: "GAMEFONT";
  font-size: 0.3rem;
  color: transparent;
  padding-left: 0.16rem;
  background-image: linear-gradient(to bottom, #759ccd 0%, #fff 100%);
  -webkit-background-clip: text;
}

.home-right {
  display: flex;
  align-items: center;
}

.red-dot {
  position: relative;
  &:after {
    position: absolute;
    right: 0;
    top: 0;
    content: "";
    width: 0.2rem;
    height: 0.2rem;
    background: url(https://image-1251917893.file.myqcloud.com/Esports/hor/red-dot.png)
      no-repeat center center;
    background-size: contain;
  }
}

.home-msg {
  width: 0.4rem;
  height: 0.34rem;
  background: url(https://image-1251917893.file.myqcloud.com/Esports/hor/home/msg.png)
    no-repeat center center;
  background-size: contain;
  &.red-dot {
    &::after {
      right: -0.06rem;
      top: -0.02rem;
    }
  }
}

.home-person {
  width: 1.2rem;
  height: 0.4rem;
  margin-left: 0.4rem;
  background: url(https://image-1251917893.file.myqcloud.com/Esports/hor/home/person.png)
    no-repeat center center;
  background-size: contain;
  &.red-dot {
    &::after {
      right: 0.1rem;
    }
  }
}
</style>
