import { sortChildren } from '../common/dom/vnodes';

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
        this.bindRelation();

        if (this[parent]) {
          return this[parent].children.indexOf(this);
        }

        return null;
      },
    },

    watch: {
      disableBindRelation(val) {
        if (!val) {
          this.bindRelation();
        }
      },
    },

    created() {
      // 循环引用调试代码
      // this[parent].children.push(this);
      // #ifndef H5
      this.bindRelation();
      // #endif
    },


    mounted() {
      // #ifdef H5
      this.bindRelation();
      // #endif
    },

    beforeDestroy() {
      if (this[parent]) {
        this[parent].children = this[parent].children.filter(item => item !== this);

        this?.destroyCallback?.();
      }
    },

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

        this[parent].children = children;
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
