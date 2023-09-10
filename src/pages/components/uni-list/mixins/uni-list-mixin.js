export const UNI_LIST_MIXIN = {
  methods: {
    initList(initBorder) {
      this.list = this.getForm();
      if (this.list) {
        if (!this.list.firstChildAppend) {
          this.list.firstChildAppend = true;
          this.isFirstChild = true;
        }
        if (initBorder) {
          this.border = this.list.border;
        }
      }
    },
    getForm(name = 'uniList') {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent) return false;
        parentName = parent.$options.name;
      }
      return parent;
    },
    onClick() {
      if (this.to !== '') {
        this.openPage();
        return;
      }

      if (this.clickable || this.link) {
        this.$emit('click', {
          data: {},
        });
      }
    },
  },
};
