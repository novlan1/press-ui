
export default {
  updated() {
    // 等待dom加载完成之后执行
    this.$nextTick(() => {
      this.update();
    });
  },
  methods: {
    update() {
      // 获取所有的dom，之后在所有的代码块上插入vue的组件
      // eslint-disable-next-line no-undef
      const dom = Array.from(document.querySelectorAll(selector));

      dom.forEach((el) => {
        if (/md-styles-box/.test(el.parentNode.className)) {
          return;
        }
        const elem = document.createElement('div');
        elem.className = 'md-styles-box';
        el.parentNode.replaceChild(elem, el);

        const mdBoxHeader = document.createElement('div');
        mdBoxHeader.className = 'md-box-header';

        for (let i = 0;i < 3;i++) {
          const mdBoxHeaderItem = document.createElement('div');
          mdBoxHeaderItem.className = 'md-box-header-item';
          mdBoxHeader.appendChild(mdBoxHeaderItem);
        }

        elem.appendChild(mdBoxHeader);
        elem.appendChild(el);
      });
    },
  },
};
