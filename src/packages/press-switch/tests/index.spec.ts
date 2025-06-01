import { mount } from '@vue/test-utils';

import PressSwitch from '../press-switch.vue';

describe('PressSwitch', () => {
  it('should emit change event when clicked', async () => {
    const wrapper = mount(PressSwitch, {
      propsData: {
        checked: false,
      },
    });
    const switchEle = wrapper.find('.press-switch');

    await switchEle.trigger('click');
    expect(wrapper.emitted('change')![0]).toEqual([true]);

    await wrapper.setProps({ checked: true });
    await switchEle.trigger('click');
    expect(wrapper.emitted('change')![1]).toEqual([false]);
  });

  it('should not emit change event when loading', async () => {
    const wrapper = mount(PressSwitch, {
      propsData: {
        checked: false,
        loading: true,
      },
    });

    await wrapper.find('.press-switch').trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();
  });

  it('should not emit change event when disabled', async () => {
    const wrapper = mount(PressSwitch, {
      propsData: {
        checked: false,
        disabled: true,
      },
    });

    await wrapper.find('.press-switch').trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();
  });

  it('should emit click event when clicked', async () => {
    const wrapper = mount(PressSwitch, {
      propsData: {
        checked: false,
      },
    });
    const switchEle = wrapper.find('.press-switch');

    await switchEle.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);

    await switchEle.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(2);
  });

  it('should set its value correctly', async () => {
    const wrapper = mount(PressSwitch, {
      propsData: {
        checked: false,
      },
      listeners: {
        change: (val: boolean) => {
          wrapper.setProps({ checked: val });
        },
      },
    });
    const switchEle = wrapper.find('.press-switch');

    await switchEle.trigger('click');
    expect(wrapper.props('checked')).toBe(true);

    await switchEle.trigger('click');
    expect(wrapper.props('checked')).toBe(false);
  });
});
