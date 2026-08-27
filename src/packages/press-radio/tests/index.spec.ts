import { h } from 'vue';

import { mount } from '@vue/test-utils';

import PressRadioGroup from '../../press-radio-group/press-radio-group.vue';
import PressRadio from '../press-radio.vue';


describe('PressRadio', () => {
  it('should emit change event when clicked', async () => {
    const wrapper = mount(PressRadio, {
      propsData: {
        name: 'a',
      },
    });
    const radio = wrapper.find('.press-radio__icon-wrap');

    await radio.trigger('click');
    expect(wrapper.emitted('change')![0]).toEqual(['a']);

    await wrapper.setProps({ name: 'b' });
    await radio.trigger('click');
    expect(wrapper.emitted('change')![1]).toEqual(['b']);
  });

  it('should emit change event when label is clicked', async () => {
    const wrapper = mount(PressRadio, {
      propsData: {
        name: 'a',
      },
    });
    const label = wrapper.find('.press-radio__label');

    await label.trigger('click');
    expect(wrapper.emitted('change')![0]).toEqual(['a']);

    await wrapper.setProps({ name: 'b' });
    await label.trigger('click');
    expect(wrapper.emitted('change')![1]).toEqual(['b']);
  });

  it('should not emit change event when disabled', async () => {
    const wrapper = mount(PressRadio, {
      propsData: {
        name: 'a',
        disabled: true,
      },
    });

    await wrapper.find('.press-radio__icon-wrap').trigger('click');
    await wrapper.find('.press-radio__label').trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();
  });

  it('should not emit change event when label is disabled and clicked', async () => {
    const wrapper = mount(PressRadio, {
      propsData: {
        name: 'a',
        labelDisabled: true,
      },
    });

    await wrapper.find('.press-radio__label').trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();
  });

  it('should emit change event when label is disabled but radio is clicked', async () => {
    const wrapper = mount(PressRadio, {
      propsData: {
        name: 'a',
        labelDisabled: true,
      },
    });
    const radio = wrapper.find('.press-radio__icon-wrap');

    await radio.trigger('click');
    expect(wrapper.emitted('change')![0]).toEqual(['a']);

    await wrapper.setProps({ name: 'b' });
    await radio.trigger('click');
    expect(wrapper.emitted('change')![1]).toEqual(['b']);
  });
});


describe('PressRadioGroup', () => {
  it('should emit change event when clicked', async () => {
    const wrapper = mount(PressRadioGroup, {
      propsData: {
        value: 'a',
      },
      listeners: {
        change: (val: string) => wrapper.setProps({ value: val }),
      },
      slots: {
        default: [
          {
            render() {
              return h(PressRadio, { props: { name: 'a' } });
            },
          },
          {
            render() {
              return h(PressRadio, { props: { name: 'b' } });
            },
          },
          {
            render() {
              return h(PressRadio, { props: { name: 'c', disabled: true } });
            },
          },
        ],
      },
    });

    await wrapper.find('.press-radio-index:nth-of-type(2) .press-radio__icon-wrap').trigger('click');
    expect(wrapper.emitted('change')![0]).toEqual(['b']);
    expect(wrapper.props('value')).toEqual('b');

    // click disabled radio
    await wrapper.find('.press-radio-index:nth-of-type(3) .press-radio__icon-wrap').trigger('click');
    expect(wrapper.emitted('change')).toHaveLength(1);
    expect(wrapper.props('value')).toEqual('b');

    // click label
    await wrapper.find('.press-radio-index:nth-of-type(1) .press-radio__label').trigger('click');
    expect(wrapper.emitted('change')![1]).toEqual(['a']);
    expect(wrapper.props('value')).toEqual('a');
  });

  it('should not emit change event when disabled', async () => {
    const wrapper = mount(PressRadioGroup, {
      propsData: {
        value: 'c',
        disabled: true,
      },
      listeners: {
        change: (val: string) => wrapper.setProps({ value: val }),
      },
      slots: {
        default: [
          {
            render() {
              return h(PressRadio, { props: { name: 'a' } });
            },
          },
          {
            render() {
              return h(PressRadio, { props: { name: 'b' } });
            },
          },
          {
            render() {
              return h(PressRadio, { props: { name: 'c' } });
            },
          },
        ],
      },
    });

    await wrapper.find('.press-radio-index:nth-of-type(1) .press-radio__icon-wrap').trigger('click');
    await wrapper.find('.press-radio-index:nth-of-type(2) .press-radio__label').trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();
    expect(wrapper.props('value')).toEqual('c');
  });
});
