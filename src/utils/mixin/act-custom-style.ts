import { sendMessageToTop, IFRAME_MESSAGE_TYPE_MAP, DEMO_PAGE_DIRECTION } from 'src/utils/post-message/post-message';
import { hyphenate } from 'src/packages/common/format/string';
import {
  showPicker,
  FUNCTIONAL_ID_MAP,
} from 'src/packages/press-popup-cell/demo-helper/helper';

import PressCell from 'src/packages/press-cell/press-cell.vue';
import PressPicker from 'src/packages/press-picker/press-picker.vue';
import PressPopupCell from 'src/packages/press-popup-cell/press-popup-cell.vue';


const CUSTOM_STYLE_DEFAULT = 'default';


function getAllStyleList(styleList: Array<any>) {
  const allStyleList = [{
    label: '默认',
    value: CUSTOM_STYLE_DEFAULT,
  }];

  allStyleList.push(...styleList.map(item => ({
    label: item,
    value: item,
  })));
  return allStyleList;
}


export function getActCustomStyleMixin(componentName: string, styleList: Array<any>, defaultCustomStyle = 'pvp') {
  return {
    components: {
      PressCell,
      PressPicker,
      PressPopupCell,
    },
    data() {
      return {
        customStyle: defaultCustomStyle,
        CUSTOM_STYLE_DEFAULT,
        styleList: getAllStyleList(styleList),
        FUNCTIONAL_ID_MAP,

        hideTipStyle: false,
        useTipClass: false,
      };
    },
    computed: {
      styleMap(this: any) {
        const { styleList } = this;
        return styleList.reduce((acc: Record<string, any>, item: any) => {
          acc[item.value] = item;
          return acc;
        }, {});
      },
      curGameClass(this: any) {
        const { customStyle } = this;
        const prefix = `${hyphenate(componentName)}--type-`;
        return `${prefix}${customStyle}`;
      },
    },
    watch: {
      customStyle: {
        handler(this: any, value: string) {
          if (!value.endsWith('vertical')) {
            if (this.showHeader) {
              this.onToggleShowHeader();
            }
            sendMessageToTop(IFRAME_MESSAGE_TYPE_MAP.CHANGE_DEMO_PAGE_DIRECTION, DEMO_PAGE_DIRECTION.HOR);
          } else {
            sendMessageToTop(IFRAME_MESSAGE_TYPE_MAP.CHANGE_DEMO_PAGE_DIRECTION, DEMO_PAGE_DIRECTION.VERT);
          }
        },
        immediate: true,
      },
    },
    methods: {
      onCustom(this: any) {
        const curStyle = this.customStyle;

        // showPopupCellAndClose({
        //   context,
        //   title: '自定义设置',
        //   closeIcon: true,
        //   cellList: [
        // {
        //   label: '是否使用默认样式',
        //   type: 'switch',
        //   open: !this.hideBaseStyle,
        //   click: ({ context: cellContext }) => {
        //     cellContext.closeDialog();
        //     context.hideBaseStyle = !context.hideBaseStyle;
        //     context.customStyle = '';
        //     context.onGTip('设置成功');
        //   },
        // },
        // {
        //   label: '样式类型',
        //   value: this.customStyle,
        //   click: ({ context: cellContext }) => {
        //     cellContext.closeDialog();
        let horizontal = false;
        // #ifdef H5
        horizontal = document.documentElement.clientHeight < 420;
        // #endif
        showPicker({
          context: this,
          title: '样式类型',
          closeIcon: true,
          horizontal,
          list: this.styleList,
          current: {
            value: curStyle,
          },
        })
          .then((res) => {
            const { item } = res as any;
            // if (item.value === CUSTOM_STYLE_DEFAULT) {
            //   context.customStyle = '';
            //   context.hideBaseStyle = false;
            // } else {
            this.customStyle = item.value;
            this.show = true;
            // }
            // context.customStyle = item.value;
            // context.hideBaseStyle = true;
            this.onGTip('设置成功');
          })
          .catch(() => {

          });
        //   },
        // }
        //   ],
        // });
      },
      onShowDialog(this: any) {
        this.show = !this.show;
      },
    },
  };
}
