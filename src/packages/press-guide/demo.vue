<template>
  <div class="demo-wrap">
    <demo-block :title="t('basicUsage')">
      <PressButton @click="onShowGuide">
        {{ t('guide') }}
      </PressButton>
    </demo-block>

    <demo-block :title="t('noMask')">
      <PressButton @click="() => onShowGuide({ showOverlay: false })">
        {{ t('guide') }}
      </PressButton>
    </demo-block>

    <demo-block :title="t('dialog')">
      <PressButton @click="() => onShowGuide({ showDialogGuide: true })">
        {{ t('guide') }}
      </PressButton>
    </demo-block>

    <demo-block :title="t('multiple')">
      <PressButton @click="() => onShowGuide({ showDialogGuide: true, multiple: true, })">
        {{ t('guide') }}
      </PressButton>
    </demo-block>

    <demo-block :title="t('customPopover')">
      <PressButton @click="() => onShowGuide({ showCustomGuide: true })">
        {{ t('guide') }}
      </PressButton>
    </demo-block>

    <PressPopupPlus
      :show="showGuide"
      position="bottom"
      :overlay="false"
      :custom-style="popupStyle"
    >
      <div>
        <div class="main-title">
          <div class="title-major">
            用户引导标题
          </div>
          <div class="title-sub">
            按钮用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。
          </div>
        </div>
        <div class="field label-field">
          <PressField
            label="标签文字"
            layout="vertical"
            placeholder="请输入文字"
          />
        </div>
        <div class="field">
          <PressField
            label="标签文字"
            layout="vertical"
            placeholder="请输入文字"
          />
        </div>
        <div class="action">
          <PressButton
            block
            theme="light"
            size="large"
          >
            重置
          </PressButton>
          <PressButton
            block
            theme="primary"
            size="large"
          >
            确定
          </PressButton>
        </div>
      </div>
      <PressGuide
        v-if="showDialogGuide"
        :current="current"
        :steps="steps"
        :show-overlay="showOverlay"
        mode="dialog"
        @skip="close"
        @finish="close"
      >
        <template
          #content-0
        >
          <div
            class="dialog-slot-body"
          >
            <p>用户引导的说明文案 1</p>
            <PressImage
              class="guide-demo-image"
              src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg"
            />
          </div>
        </template>
        <template
          #content-1
        >
          <div
            class="dialog-slot-body"
          >
            <p>用户引导的说明文案 2</p>
            <PressImage
              class="guide-demo-image"
              src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg"
            />
          </div>
        </template>
        <template
          #content-2
        >
          <div
            class="dialog-slot-body"
          >
            <p>用户引导的说明文案 3</p>
            <PressImage
              class="guide-demo-image"
              src="https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/article/2023/5/own_mike_9f901ce42e18990883.jpeg"
            />
          </div>
        </template>
      </PressGuide>

      <PressGuide
        v-else-if="showCustomGuide"
        :current="current"
        :steps="steps"
        :show-overlay="showOverlay"
        @skip="close"
        @finish="close"
      >
        <template
          #content-0
        >
          <div
            class="content"
          >
            <PressIconPlus
              name="arrow-up"
              size="32px"
              color="#fff"
              class="icon"
            />
            <p class="text">
              1、自定义的图形或说明文案，用来解释或指导该功能使用。
            </p>
            <div class="footer">
              <PressButton
                v-if="current < steps.length - 1"
                theme="light"
                size="small"
                class="guide-demo-button"
                @click="skip"
              >
                跳过
              </PressButton>
              <PressButton
                v-else
                class="guide-demo-button"
                theme="light"
                size="small"
                @click="back"
              >
                返回
              </PressButton>
              <PressButton
                v-if="current < steps.length - 1"
                theme="primary"
                content="下一步"
                size="small"
                class="guide-demo-button"
                @click="next"
              >
                下一步
              </PressButton>
              <PressButton
                v-else
                class="guide-demo-button"
                theme="primary"
                content="完成"
                size="small"
                @click="finish"
              >
                完成
              </PressButton>
            </div>
          </div>
        </template>
        <template
          #content-1
        >
          <div
            class="content"
          >
            <PressIconPlus
              name="arrow-up"
              size="32px"
              color="#fff"
              class="icon"
            />
            <p class="text">
              2、自定义的图形或说明文案，用来解释或指导该功能使用。
            </p>
            <div class="footer">
              <PressButton
                v-if="current < steps.length - 1"
                theme="light"
                content="跳过"
                size="small"
                class="guide-demo-button"
                @click="skip"
              >
                跳过
              </PressButton>
              <PressButton
                v-else
                class="guide-demo-button"
                theme="light"
                content="返回"
                size="small"
                @click="back"
              >
                返回
              </PressButton>
              <PressButton
                v-if="current < steps.length - 1"
                theme="primary"
                content="下一步"
                size="small"
                class="guide-demo-button"
                @click="next"
              >
                下一步
              </PressButton>
              <PressButton
                v-else
                class="guide-demo-button"
                theme="primary"
                content="完成"
                size="small"
                @click="finish"
              >
                完成
              </PressButton>
            </div>
          </div>
        </template>
        <template
          #content-2
        >
          <div
            class="content"
          >
            <PressIconPlus
              name="arrow-up"
              size="32px"
              color="#fff"
              class="icon"
            />
            <p class="text">
              3、自定义的图形或说明文案，用来解释或指导该功能使用。
            </p>
            <div class="footer">
              <PressButton
                v-if="current < steps.length - 1"
                theme="light"
                content="跳过"
                size="small"
                class="guide-demo-button"
                @click="skip"
              >
                跳过
              </PressButton>
              <PressButton
                v-else
                class="guide-demo-button"
                theme="light"
                content="返回"
                size="small"
                @click="back"
              >
                返回
              </PressButton>
              <PressButton
                v-if="current < steps.length - 1"
                theme="primary"
                content="下一步"
                size="small"
                class="guide-demo-button"
                @click="next"
              >
                下一步
              </PressButton>
              <PressButton
                v-else
                class="guide-demo-button"
                theme="primary"
                content="完成"
                size="small"
                @click="finish"
              >
                完成
              </PressButton>
            </div>
          </div>
        </template>
      </PressGuide>


      <PressGuide
        v-else
        :current="current"
        :steps="steps"
        :show-overlay="showOverlay"
        @skip="close"
        @finish="close"
      />
    </PressPopupPlus>
  </div>
</template>
<script>
import { getWindowWidth } from 'press-ui/common/dom/rect';
import PressButton from 'press-ui/press-button/press-button.vue';
import PressField from 'press-ui/press-field/press-field.vue';

import PressGuide from 'press-ui/press-guide/press-guide.vue';
import PressIconPlus from 'press-ui/press-icon-plus/press-icon-plus.vue';

import PressImage from 'press-ui/press-image/press-image.vue';
import PressPopupPlus from 'press-ui/press-popup-plus/press-popup-plus.vue';


export default {
  i18n: {
    'zh-CN': {
      guide: '用户引导',
      noMask: '不带遮罩的引导',
      dialog: '弹窗形式的引导',
      multiple: '气泡与弹窗混合的引导',
      customPopover: '自定义气泡',
    },
    'en-US': {
      guide: 'Guide',
      noMask: 'No Mask',
      dialog: 'Dialog',
      multiple: 'Popover And Dialog',
      customPopover: 'Custom Popover',
    },
  },
  components: {
    PressGuide,
    PressButton,
    PressField,
    PressImage,
    PressPopupPlus,
    PressIconPlus,
  },
  data() {
    const ORIGIN_STEPS = [
      {
        element: '.main-title',
        title: '用户引导标题',
        body: '用户引导的说明文案',
        placement: 'center',
      },
      {
        element: '.label-field',
        title: '用户引导标题',
        body: '用户引导的说明文案',
        placement: 'bottom',
        highlightPadding: 0,
      },
      {
        element: '.action',
        title: '用户引导标题',
        body: '用户引导的说明文案',
        placement: 'bottom-right',
      },
    ];

    return {
      current: -1,
      steps: [],
      showGuide: false,
      showOverlay: true,
      showDialogGuide: false,
      showCustomGuide: false,

      ORIGIN_STEPS,

      popupStyle: '',
    };
  },
  mounted() {
    const { windowTop = 0 } = getWindowWidth();
    this.popupStyle = `height: calc(100vh - ${windowTop}px)`;
  },
  methods: {
    close() {
      console.log('>>> close');
      this.showGuide = false;
    },
    async onShowGuide(args) {
      const { showOverlay = true, showDialogGuide = false, multiple = false, showCustomGuide = false } = args || {};

      this.current = -1;
      this.showGuide = true;

      await new Promise(resolve => setTimeout(resolve, 800));
      this.current = 0;
      this.showOverlay = showOverlay;
      this.showDialogGuide = showDialogGuide;
      this.showCustomGuide = showCustomGuide;


      if (this.showDialogGuide) {
        if (multiple) {
          this.steps = this.ORIGIN_STEPS.map((item, index) => {
            const { element, title, body: originBody, placement, highlightPadding } = item;
            const dialogMode = multiple && index == 1;
            let mode;
            let body;
            if (dialogMode) {
              mode = 'dialog';
              body = undefined;
            } else {
              mode = 'popover';
              body = originBody;
            }
            return {
              element, title, placement, highlightPadding,
              mode,
              body,
            };
          });
        } else {
          this.steps = this.ORIGIN_STEPS.map((item) => {
            const { element, title, placement, highlightPadding } = item;
            return {
              element, title, placement, highlightPadding,
              mode: 'dialog',
            };
          });
        }
      } else if (this.showCustomGuide) {
        this.steps = this.ORIGIN_STEPS.map((item) => {
          const { element, placement, highlightPadding } = item;
          return {
            element,
            placement,
            highlightPadding,
          };
        });
      } else {
        this.steps = this.ORIGIN_STEPS.map(item => item);
      }

      console.log('>>> steps', this.steps);
    },

    skip() {
      this.close();
    },
    back() {
      this.current -= 1;
    },
    next() {
      this.current += 1;
    },
    finish() {
      this.close();
    },
  },
};
</script>
<style scoped lang="scss">
.main-title {
  margin: 16px;
  display: inline-block;
}

.title-major {
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
}

.title-sub {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-top: 4px;
}

.action {
  margin: 32px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.slot-body {
  margin-top: 4px;
  text-align: left;
  color: var(--td-text-color-secondary);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
}

.dialog-slot-body {
  margin-top: 4px;
  text-align: center;
  color: var(--td-text-color-secondary);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}

.dialog-slot-body .guide-demo-image {
  margin-top: 24px;
}

.content {
  width: 240px;
}

.content .icon {
  font-weight: 700;
  width: 64rpx;
}

.content .text {
  margin-top: 16px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  line-height: 24px;
}

.content .footer {
  text-align: right;
  margin-top: 16px;
}

.content .footer .guide-demo-button + .guide-demo-button {
  margin-left: 12px;
}
</style>
