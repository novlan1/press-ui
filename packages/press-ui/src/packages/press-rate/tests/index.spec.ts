import Rate from '../press-rate.vue';
import { mount } from '@vue/test-utils';

describe('Rate', () => {
  it('should emit change event when clicked', async () => {
    const wrapper = mount(Rate, {
      propsData: {
        value: 3,
      },
    });

    await wrapper.find('.press-rate__item:nth-of-type(4) .press-rate__icon').trigger('click');
    expect(wrapper.emitted('change')![0]).toEqual([4]);

    await wrapper.find('.press-rate__item:nth-of-type(1) .press-rate__icon').trigger('click');
    expect(wrapper.emitted('change')![1]).toEqual([1]);

    await wrapper.find('.press-rate__item:nth-of-type(5) .press-rate__icon').trigger('click');
    expect(wrapper.emitted('change')![2]).toEqual([5]);
  });

  it('should not emit change event when disabled', async () => {
    const wrapper = mount(Rate, {
      propsData: {
        value: 3,
        count: 7,
        disabled: true,
      },
    });

    await wrapper.find('.press-rate__item:nth-of-type(7) .press-rate__icon').trigger('click');
    await wrapper.find('.press-rate__item:nth-of-type(1) .press-rate__icon').trigger('click');
    await wrapper.find('.press-rate__item:nth-of-type(5) .press-rate__icon').trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();
  });

  it('should not emit change event when readonly', async () => {
    const wrapper = mount(Rate, {
      propsData: {
        value: 3,
        count: 3,
        readonly: true,
      },
    });

    await wrapper.find('.press-rate__item:nth-of-type(2) .press-rate__icon').trigger('click');
    await wrapper.find('.press-rate__item:nth-of-type(3) .press-rate__icon').trigger('click');
    await wrapper.find('.press-rate__item:nth-of-type(1) .press-rate__icon').trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();
  });

  it('should correctly emit change event when allow-half is on', async () => {
    const wrapper = mount(Rate, {
      propsData: {
        value: 3,
        allowHalf: true,
      },
    });

    await wrapper.find('.press-rate__item:nth-of-type(2) .press-rate__icon--half').trigger('click');
    expect(wrapper.emitted('change')![0]).toEqual([1.5]);

    await wrapper.find('.press-rate__item:nth-of-type(5) .press-rate__icon').trigger('click');
    expect(wrapper.emitted('change')![1]).toEqual([5]);

    await wrapper.find('.press-rate__item:nth-of-type(1) .press-rate__icon--half').trigger('click');
    expect(wrapper.emitted('change')![2]).toEqual([0.5]);
  });
});
