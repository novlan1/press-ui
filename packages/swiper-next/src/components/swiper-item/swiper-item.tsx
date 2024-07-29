import { type Ref, ref, onMounted, onUnmounted, inject } from 'vue';
import {
  type AddSwiperContext,
  type SwiperContext,
  type RemoveSwiperContext,
} from '../swiper/swiper';
import { defineBuiltInComponent } from '../../helpers/component';
import { UniElement } from '../../helpers/UniElement';

const props = {
  itemId: {
    type: String,
    default: '',
  },
};

export class UniSwiperItemElement extends UniElement {}
export default /* #__PURE__*/ defineBuiltInComponent({
  name: 'SwiperItem',
  props,
  // #if _X_ && !_NODE_JS_
  // rootElement: {
  //   name: 'div',
  //   class: UniSwiperItemElement,
  // },
  // #endif
  setup(props, { slots }) {
    const rootRef: Ref<HTMLElement | null> = ref(null);
    const context: SwiperContext = {
      rootRef,
      getItemId() {
        return props.itemId;
      },
      getBoundingClientRect() {
        const el = rootRef.value as HTMLElement;
        return el.getBoundingClientRect();
      },
      updatePosition(position: number, vertical?: boolean) {
        const x = vertical ? '0' : `${100 * position}%`;
        const y = vertical ? `${100 * position}%` : '0';
        const rootEl = rootRef.value;
        const value = `translate(${x},${y}) translateZ(0)`;
        if (rootEl) {
          rootEl.style.webkitTransform = value;
          rootEl.style.transform = value;
        }
      },
    };
    onMounted(() => {
      const addSwiperContext: AddSwiperContext | undefined =
        inject('addSwiperContext');
      if (addSwiperContext) {
        addSwiperContext(context);
      }
    });
    onUnmounted(() => {
      const removeSwiperContext: RemoveSwiperContext | undefined = inject(
        'removeSwiperContext'
      );
      if (removeSwiperContext) {
        removeSwiperContext(context);
      }
    });

    // #if _X_ && !_NODE_JS_
    // onMounted(() => {
    //   const rootElement = rootRef.value as UniSwiperItemElement;
    //   rootElement.attachVmProps(props);
    // });
    // #endif
    return () => (
      <div
        ref={rootRef}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        class="swiper-next-item"
      >
        {slots.default && slots.default()}
      </div>
    );
  },
});
