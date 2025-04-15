<template>
  <div>
    <div class="config-wrap">
      <div class="press-config-item press-config-item--link">
        <div class="press-config-name">
          外链地址：
        </div>
        <div class="press-config-input">
          <textarea
            v-model="styleLink"
            placeholder="请输入样式外链地址，右侧示例会自动加载，多个地址用;分割，如 https://test.com/a.css"
            class="press-input-inner press-input-inner--textarea"
            @change="changeStyleLink"
          />
        </div>
      </div>

      <div class="press-config-item press-config-item--content">
        <div class="press-config-name">
          样式内容：
        </div>
        <div class="press-config-input">
          <textarea
            v-model="styleInput"
            :auto-height="true"
            :auto-width="false"

            placeholder="请输入样式内容，右侧示例会自动更新，如 .press__cover { color: green; }"
            class="press-input-inner press-input-inner--textarea"
            @change="changeStyleInput"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { sendMessageToIframe, IFRAME_MESSAGE_TYPE_MAP } from '../utils/message';


export default {
  data() {
    return {
      styleLink: '',
      styleInput: '',
    };
  },
  methods: {
    changeStyleLink(e) {
      sendMessageToIframe({
        type: IFRAME_MESSAGE_TYPE_MAP.CHANGE_EXTERNAL_STYLE_LINK,
        data: e.target.value,
      });
    },
    changeStyleInput(e) {
      sendMessageToIframe({
        type: IFRAME_MESSAGE_TYPE_MAP.CHANGE_EXTERNAL_STYLE_CONTENT,
        data: e.target.value,
      });
    },
  },
};
</script>
<style scoped lang="stylus">
@require '../theme/styles/button.styl';

.config-wrap {
  padding: 20px 0;
}

.press-config-name {
  width: 100px;
}

.press-config-item {
  .press-input-inner--textarea {
    width: 100% !important;
    word-break: break-all;
    line-height: 26px;
    font-size: 14px;
  }

  &--link {
    .press-input-inner--textarea {
      min-height: 50px;
      max-height: 120px;
    }
  }

  &--content {
    .press-input-inner--textarea {
      min-height: 180px;
      max-height: 500px;
    }
  }
}

@media (max-width: 700px) {
  .press-config-name {
    display: none;
  }
}
</style>
