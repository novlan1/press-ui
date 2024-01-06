import { sortChildren, sortMPChildren } from '../common/dom/vnodes';


export function ChildrenMixin(parent: string, options: Record<string, any> = {}) {
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
        const that = this as any;

        that.bindRelation();

        if (that[parent]) {
          return that[parent].children.indexOf(this);
        }

        return null;
      },
    },

    watch: {
      disableBindRelation(val: any) {
        const that = this as any;
        if (!val) {
          that.bindRelation();
        }
      },
    },

    created() {
      // 循环引用调试代码
      // this[parent].children.push(this);
      // #ifndef H5
      const that = this as any;
      that.bindRelation();
      // #endif
    },


    mounted() {
      // #ifdef H5
      const that = this as any;
      that.bindRelation();
      // #endif
    },

    beforeDestroy() {
      const that = this as any;
      if (that[parent]) {
        that[parent].children = that[parent].children.filter((item: any) => item !== that);

        that?.destroyCallback?.();
      }
    },

    methods: {
      bindRelation(this: any) {
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
    },
  };
}

export function ParentMixin(parent: string) {
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
