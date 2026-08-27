<template>
  <view
    class="nice-cropper"
    :style="{height: height, width: width, background: background}"
    @touchstart="start"
    @touchmove.stop="move"
    @touchcancel="end"
    @touchend="end"
  >
    <image
      class="nice-cropper__image"
      :src="src"
      :style="{transform: transformMeta, width: image.width + 'px', height: image.height + 'px'}"
    />
    <view
      class="nice-cropper__ctrls"
      :class="{
        'nice-cropper__ctrls--view' : view,
        'nice-cropper__ctrls--border': showCtrlBorder,
        'nice-cropper__ctrls--circle': view && circleView && maskType !== 'outline'}"
      :style="ctrlStyle"
    >
      <view
        class="nice-cropper__corner nice-cropper__corner--lt"
        @touchstart="setCutMode('lt')"
      />
      <view
        class="nice-cropper__corner nice-cropper__corner--rt"
        @touchstart="setCutMode('rt')"
      />
      <view
        class="nice-cropper__corner nice-cropper__corner--rb"
        @touchstart="setCutMode('rb')"
      />
      <view
        class="nice-cropper__corner nice-cropper__corner--lb"
        @touchstart="setCutMode('lb')"
      />
    </view>
    <canvas
      v-if="canvasId"
      :id="canvasId"
      :canvas-id="canvasId"
      style="position: absolute;left:-500000px;top: -500000px"
      :style="{width: ctrlWidth * canvasZoom+'px', height: ctrlHeight * canvasZoom + 'px'}"
    />
  </view>
</template>
<script src="./cropper.js"></script>
<style scoped lang="scss" src="./cropper.scss">
</style>
