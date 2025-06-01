import { mount } from '@vue/test-utils';

import PressCheckbox from '../press-checkbox.vue';

describe('PressCheckbox', () => {
  it('should emit change event when clicked', async () => {
    const wrapper = mount(PressCheckbox, {
      propsData: {
        value: false,
      },
    });
    const checkbox = wrapper.find('.press-checkbox__icon-wrap');

    await checkbox.trigger('click');
    expect(wrapper.emitted('change')![0]).toEqual([true]);

    await wrapper.setProps({ value: true });
    await checkbox.trigger('click');
    expect(wrapper.emitted('change')![1]).toEqual([false]);
  });

  it('should emit change event when label is clicked', async () => {
    const wrapper = mount(PressCheckbox, {
      propsData: {
        value: true,
      },
    });
    const label = wrapper.find('.press-checkbox__label');

    await label.trigger('click');
    expect(wrapper.emitted('change')![0]).toEqual([false]);

    await wrapper.setProps({ value: false });
    await label.trigger('click');
    expect(wrapper.emitted('change')![1]).toEqual([true]);
  });

  it('should not emit change event when disabled', async () => {
    const wrapper = mount(PressCheckbox, {
      propsData: {
        value: false,
        disabled: true,
      },
    });

    await wrapper.find('.press-checkbox__icon-wrap').trigger('click');
    await wrapper.find('.press-checkbox__label').trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();
  });

  it('should not emit change event when label is disabled and clicked', async () => {
    const wrapper = mount(PressCheckbox, {
      propsData: {
        value: true,
        labelDisabled: true,
      },
    });

    await wrapper.find('.press-checkbox__label').trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();
  });

  it('should emit change event when label is disabled but checkbox is clicked', async () => {
    const wrapper = mount(PressCheckbox, {
      propsData: {
        value: true,
        labelDisabled: true,
      },
    });
    const checkbox = wrapper.find('.press-checkbox__icon-wrap');

    await checkbox.trigger('click');
    expect(wrapper.emitted('change')![0]).toEqual([false]);

    await wrapper.setProps({ value: false });
    await checkbox.trigger('click');
    expect(wrapper.emitted('change')![1]).toEqual([true]);
  });
});
