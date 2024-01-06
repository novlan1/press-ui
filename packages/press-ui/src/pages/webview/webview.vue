<template>
  <div style="height: 100%">
    <web-view :src="url" />
  </div>
</template>

<script>
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
