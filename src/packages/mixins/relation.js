// #ifdef H5
import { sortChildren } from '../common/dom/vnodes-h5';
// #endif
// #ifndef H5
import { sortMPChildren } from '../common/dom/vnodes-mp';
// #endif


export function ChildrenMixin(parent, options = {}) {
  const indexKey = options.indexKey || 'index';

  return {
    inject: {
      [parent]: {
        default: null,
      },
    },

    computed: {
      // 会造成循环引用
      // parent() {
      //   if (this.disableBindRelation) {
      //     return null;
      //   }

      //   return this[parent];
      // },

      [indexKey]() {
        const that = this;

        that.bindRelation();

        if (that[parent]) {
          return that[parent].children.indexOf(this);
        }

        return null;
      },
    },

    watch: {
      disableBindRelation(val) {
        const that = this;
        if (!val) {
          that.bindRelation();
        }
      },
    },

    created() {
      // 循环引用调试代码
      // this[parent].children.push(this);
      // #ifndef H5
      const that = this;
      that.bindRelation();
      // #endif
    },


    mounted() {
      // #ifdef H5
      const that = this;
      that.bindRelation();
      // #endif
    },

    // #ifdef VUE2
    beforeDestroy() {
      const that = this;
      that.onBeforeMount();
    },
    // #endif
    // #ifdef VUE3
    beforeUnmount() {
      const that = this;
      that.onBeforeMount();
    },
    // #endif

    methods: {
      bindRelation() {
        if (!this[parent] || this[parent].children.indexOf(this) !== -1) {
          return;
        }

        const children = [...this[parent].children, this];

        // #ifdef H5
        try {
          sortChildren(children, this[parent]);
        } catch (err) {
          console.log('err', err);
        }
        // #endif

        // #ifndef H5
        sortMPChildren(children);
        // #endif

        this[parent].children = children;
      },
      onBeforeMount() {
        const that = this;
        if (that[parent]) {
          that[parent].children = that[parent].children.filter(item => item !== that);

          that?.destroyCallback?.();
        }
      },
    },
  };
}

export function ParentMixin(parent) {
  return {
    provide() {
      return {
        [parent]: this,
      };
    },

    data() {
      return {
        // 会造成循环引用
        // children: [],
      };
    },
  };
}
