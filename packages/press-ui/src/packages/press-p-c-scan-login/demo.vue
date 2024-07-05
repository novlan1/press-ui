<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <press-cell
        title="展示"
        is-link
        @click="showDialog"
      />
    </demo-block>


    <PressPCScanLogin
      :show.sync="show"
      :url="url"
      :loader="loader"
    />
  </div>
</template>
<script>
import PressPCScanLogin from 'press-ui/press-p-c-scan-login/press-p-c-scan-login.vue';
import { loaderUnity } from 't-comm/lib/loader/loader-unity';


export default {
  components: {
    PressPCScanLogin,
  },
  data() {
    let show = false;
    // let url = 'https://baidu.com';
    const url = 'https://igame.qq.com';
    // #ifdef H5
    show =  true;
    // url = document.location.href;
    // #endif

    return {
      show,
      loader: loaderUnity,
      url: encodeURIComponent(`https://igame.qq.com/prod/pmdtrpc.commcgi.user.user/QueryUserInfo?_ltype=tiploginwxpc&_jumpurl=${encodeURIComponent(url)}`),
    };
  },
  methods: {
    showDialog() {
      this.show = true;
    },
  },
};
</script>
<style scoped lang="scss">
</style>
