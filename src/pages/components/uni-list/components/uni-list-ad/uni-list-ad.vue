<template>
  <!-- #ifdef APP-NVUE -->
  <cell>
    <!-- #endif -->
    <div class="uni-list-ad">
      <div
        v-if="borderShow"
        :class="{'uni-list--border':border,'uni-list-item--first':isFirstChild}"
      />
      <ad
        style="width: 200px;height: 300px;border-width: 1px;border-color: red;border-style: solid;"
        adpid="1111111111"
        unit-id=""
        appid=""
        apid=""
        type="feed"
        @error="aderror"
        @close="closeAd"
      />
    </div>
    <!-- #ifdef APP-NVUE -->
  </cell>
  <!-- #endif -->
</template>

<script>
import { UNI_LIST_MIXIN } from '../../mixins/uni-list-mixin';


export default {
  name: 'UniListAd',
  mixins: [UNI_LIST_MIXIN],
  props: {
    title: {
      type: String,
      default: '',

    },
  },
  data() {
    return {
      isFirstChild: false,
      border: false,
      borderShow: true,
    };
  },

  mounted() {
    this.initList(true);
  },
  methods: {
    aderror(e) {
      console.log(`aderror: ${JSON.stringify(e.detail)}`);
    },
    closeAd() {
      this.borderShow = false;
    },
  },
};
</script>

<style lang="scss">
.uni-list-ad {
  position: relative;
  border: 1px red solid;
}

.uni-list--border {
  position: relative;
  padding-bottom: 1px;
  /* #ifdef APP-PLUS */
  border-top-color: $uni-border-color;
  border-top-style: solid;
  border-top-width: 0.5px;
  /* #endif */
  margin-left: $uni-spacing-row-lg;
}

/* #ifndef APP-NVUE */
.uni-list--border:after {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: $uni-border-color;
}

.uni-list-item--first:after {
  height: 0px;
}

/* #endif */
</style>
