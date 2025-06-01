import { mount } from '@vue/test-utils';

import PressCodeInput from '../press-code-input.vue';

describe('PressCodeInput', () => {
  it('should emit change and input event on input', async () => {
    const wrapper = mount(PressCodeInput, {
      propsData: {
        value: '',
      },
      listeners: {
        input: (val: string) => wrapper.setProps({ value: val }),
      },
    });
    const input = wrapper.find('input');

    await input.setValue('1');
    expect(wrapper.emitted('change')![0]).toEqual(['1']);
    expect(wrapper.vm.$data.inputValue).toEqual('1');

    await input.setValue('12');
    expect(wrapper.emitted('change')![1]).toEqual(['12']);
    expect(wrapper.vm.$data.inputValue).toEqual('12');

    await input.setValue('1234');
    expect(wrapper.emitted('change')![2]).toEqual(['1234']);
    expect(wrapper.vm.$data.inputValue).toEqual('1234');
  });

  it('should emit finish event when input reaches max length', async () => {
    const wrapper = mount(PressCodeInput, {
      propsData: {
        value: '',
        maxLength: 3,
      },
      listeners: {
        input: (val: string) => wrapper.setProps({ value: val }),
      },
    });

    await wrapper.find('input').setValue('456');
    expect(wrapper.emitted('finish')![0]).toEqual(['456']);
    expect(wrapper.vm.$data.inputValue).toEqual('456');
  });

  it('should remove dot when dot is disabled and input contains dot', async () => {
    const wrapper = mount(PressCodeInput, {
      propsData: {
        value: '',
        disabledDot: true,
      },
      listeners: {
        input: (val: string) => wrapper.setProps({ value: val }),
      },
    });
    const input = wrapper.find('input');

    await input.setValue('3.14');
    expect(wrapper.emitted('change')![0]).toEqual(['3.14']);
    expect(wrapper.vm.$data.inputValue).toEqual('314');
  });
});
