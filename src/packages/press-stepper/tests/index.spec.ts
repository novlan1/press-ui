import { mount } from '@vue/test-utils';

import * as utils from '../../common/utils/utils';
import PressStepper from '../press-stepper.vue';


describe('PressStepper', () => {
  beforeAll(() => {
    jest.spyOn(utils, 'isNotInUni').mockReturnValue(true);
  });

  it('should emit plus and/or minus event when plus and/or minus button is clicked', async () => {
    const wrapper = mount(PressStepper, {
      propsData: {
        value: 5,
      },
    });
    const minus = wrapper.find('.press-stepper__minus');
    const plus = wrapper.find('.press-stepper__plus');

    await minus.trigger('click');
    expect(wrapper.emitted('minus')).toHaveLength(1);

    await plus.trigger('click');
    await plus.trigger('click');
    await plus.trigger('click');
    expect(wrapper.emitted('plus')).toHaveLength(3);
  });

  it('should emit change event when plus and/or minus button is clicked', async () => {
    const wrapper = mount(PressStepper, {
      propsData: {
        value: 5,
      },
    });
    const minus = wrapper.find('.press-stepper__minus');
    const plus = wrapper.find('.press-stepper__plus');

    await minus.trigger('click');
    expect(wrapper.emitted('change')![0]).toEqual(['4']);

    await minus.trigger('click');
    expect(wrapper.emitted('change')![1]).toEqual(['3']);

    await plus.trigger('click');
    expect(wrapper.emitted('change')![2]).toEqual(['4']);

    await plus.trigger('click');
    expect(wrapper.emitted('change')![3]).toEqual(['5']);
  });

  it('should emit change event when user enters a new value', async () => {
    const wrapper = mount(PressStepper, {
      propsData: {
        value: 5,
      },
    });

    const input = wrapper.find('.press-stepper__input');

    await input.setValue(8);
    expect(wrapper.emitted('change')![0]).toEqual(['8']);

    await input.setValue(4);
    expect(wrapper.emitted('change')![1]).toEqual(['4']);
  });

  it('should set its value correctly', async () => {
    const wrapper = mount(PressStepper, {
      propsData: {
        value: 5,
      },
      listeners: {
        change: (val: string | number) => {
          wrapper.setProps({ value: val });
        },
      },
    });
    const minus = wrapper.find('.press-stepper__minus');
    const input = wrapper.find('.press-stepper__input');
    const plus = wrapper.find('.press-stepper__plus');

    await plus.trigger('click');
    expect(wrapper.props('value')).toEqual('6');
    await minus.trigger('click');
    expect(wrapper.props('value')).toEqual('5');
    await plus.trigger('click');
    expect(wrapper.props('value')).toEqual('6');
    await plus.trigger('click');
    expect(wrapper.props('value')).toEqual('7');

    await input.setValue(3);
    expect(wrapper.props('value')).toEqual('3');
    await minus.trigger('click');
    expect(wrapper.props('value')).toEqual('2');
  });

  it('should set its value correctly when step is set', async () => {
    const wrapper = mount(PressStepper, {
      propsData: {
        value: 6,
        step: 3,
      },
      listeners: {
        change: (val: string | number) => {
          wrapper.setProps({ value: val });
        },
      },
    });
    const minus = wrapper.find('.press-stepper__minus');
    const input = wrapper.find('.press-stepper__input');
    const plus = wrapper.find('.press-stepper__plus');

    await plus.trigger('click');
    expect(wrapper.props('value')).toEqual('9');

    await minus.trigger('click');
    expect(wrapper.props('value')).toEqual('6');

    await input.setValue(5);
    expect(wrapper.props('value')).toEqual('5');

    await minus.trigger('click');
    expect(wrapper.props('value')).toEqual('2');
  });

  it('should emit overlimit event when value exceeds acceptable range', async () => {
    const wrapper = mount(PressStepper, {
      propsData: {
        value: 6,
        min: 5,
        max: 7,
      },
    });
    const minus = wrapper.find('.press-stepper__minus');
    const plus = wrapper.find('.press-stepper__plus');

    await plus.trigger('click');
    expect(wrapper.emitted('change')![0]).toEqual(['7']);

    await plus.trigger('click');
    expect(wrapper.emitted('overlimit')![0]).toEqual(['plus']);
    expect(wrapper.emitted('change')).toHaveLength(1);

    await minus.trigger('click');
    expect(wrapper.emitted('change')![1]).toEqual(['6']);

    await minus.trigger('click');
    expect(wrapper.emitted('change')![2]).toEqual(['5']);

    await minus.trigger('click');
    expect(wrapper.emitted('overlimit')![1]).toEqual(['minus']);
    expect(wrapper.emitted('change')).toHaveLength(3);

    await minus.trigger('click');
    expect(wrapper.emitted('overlimit')![2]).toEqual(['minus']);
    expect(wrapper.emitted('change')).toHaveLength(3);
  });

  it('should emit overlimit event when plus and/or minus button is disabled', async () => {
    const wrapper = mount(PressStepper, {
      propsData: {
        value: 5,
        disabled: true,
      },
    });
    const minus = wrapper.find('.press-stepper__minus');
    const plus = wrapper.find('.press-stepper__plus');

    await minus.trigger('click');
    await plus.trigger('click');
    expect(wrapper.emitted('overlimit')).toHaveLength(2);

    await wrapper.setProps({ disabled: false });
    await minus.trigger('click');
    await plus.trigger('click');
    expect(wrapper.emitted('overlimit')).toHaveLength(2);

    await wrapper.setProps({ disablePlus: true });
    await minus.trigger('click');
    await plus.trigger('click');
    expect(wrapper.emitted('overlimit')).toHaveLength(3);

    await wrapper.setProps({ disablePlus: false, disableMinus: true });
    await minus.trigger('click');
    await plus.trigger('click');
    expect(wrapper.emitted('overlimit')).toHaveLength(4);
  });

  it('should set its value correctly when min and max are set', async () => {
    const wrapper = mount(PressStepper, {
      propsData: {
        value: 6,
        min: 5,
        max: 7,
      },
      listeners: {
        change: (val: string | number) => {
          wrapper.setProps({ value: val });
        },
      },
    });
    const minus = wrapper.find('.press-stepper__minus');
    const input = wrapper.find('.press-stepper__input');
    const plus = wrapper.find('.press-stepper__plus');

    await minus.trigger('click');
    expect(wrapper.props('value')).toEqual('5');

    await minus.trigger('click');
    await minus.trigger('click');
    expect(wrapper.props('value')).toEqual('5');

    await input.trigger('focus');
    await input.setValue(3);
    await input.trigger('blur');
    expect(wrapper.props('value')).toEqual('5');

    await input.trigger('focus');
    await input.setValue(10);
    await input.trigger('blur');
    expect(wrapper.props('value')).toEqual('7');

    await plus.trigger('click');
    await plus.trigger('click');
    expect(wrapper.props('value')).toEqual('7');

    await minus.trigger('click');
    await minus.trigger('click');
    expect(wrapper.props('value')).toEqual('5');

    await minus.trigger('click');
    await minus.trigger('click');
    expect(wrapper.props('value')).toEqual('5');
  });
});
