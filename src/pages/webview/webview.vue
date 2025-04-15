<template>
  <div style="height: 100%">
    <web-view :src="url" />
  </div>
</template>

<script>
// press-ui, press-plus, press-next 相同
export default {
  data() {
    return {
      url: '',
    };
  },
  onLoad(options) {
    this.url = decodeURIComponent(options.url);
  },
  mounted() {

  },
  methods: {
  },
};
</script>
