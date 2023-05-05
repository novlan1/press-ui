<template>
  <div>
    <div>
      <text style="font-size: 25px;color: #333;">
        404 Page Not Found
      </text>
    </div>
    <div>
      <text style="font-size: 18px;color: #999;">
        {{ errMsg }}
      </text>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  onLoad(query) {
    this.errMsg = query.errMsg || '';
  },
  methods: {

  },
};
</script>

<style>
</style>
