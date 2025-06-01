import { mount } from '@vue/test-utils';

import PressPicker from '../press-picker.vue';


describe('PressPicker', () => {
  it('should return correct values from its methods', async () => {
    const columns = [{ text: 'A' }, 'B', 'C', { text: 'D' }];

    const wrapper = mount(PressPicker, {
      propsData: {
        columns,
      },
    });
    const vm =  wrapper.vm as typeof wrapper.vm & Record<string, any>;
    await new Promise(r => wrapper.vm.$nextTick(r));

    expect(vm.getValues()).toEqual([{ text: 'A' }]);
    expect(vm.getIndexes()).toEqual([0]);
    expect(vm.getColumnValues(0)).toEqual(columns);

    vm.setValues(['C']);
    expect(vm.getColumnValue(0)).toEqual('C');
    expect(vm.getColumnIndex(0)).toEqual(2);

    vm.setIndexes([0]);
    expect(vm.getColumnValue(0)).toEqual({ text: 'A' });

    vm.setColumnValue(0, 'B');
    expect(vm.getColumnIndex(0)).toEqual(1);

    vm.setColumnValue(0, 'D');
    expect(vm.getColumnValue(0)).toEqual({ text: 'D' });

    vm.setColumnIndex(0, 1);
    expect(vm.getColumnValue(0)).toEqual('B');

    const newColumns = 'ijklmn'.split('');

    vm.setColumnValues(0, newColumns);
    expect(vm.getColumnValues(0)).toEqual(newColumns);

    vm.setColumnValue(0, 'l');
    expect(vm.getColumnIndex(0)).toEqual(3);
  });

  it('should ignore disabled items', async () => {
    const wrapper = mount(PressPicker, {
      propsData: {
        columns: [{ text: 'A', disabled: true }, 'B', { text: 'C', disabled: true }, { text: 'D' }],
      },
    });
    const vm =  wrapper.vm as typeof wrapper.vm & Record<string, any>;
    // wait for `PickerColumn` to set its index (see `created` lifecycle method in `press-picker-column.vue`)
    await new Promise(r => wrapper.vm.$nextTick(r));

    expect(vm.getValues()).toEqual(['B']);
    expect(vm.getIndexes()).toEqual([1]);
  });

  it('should emit change event when a different item is clicked', async () => {
    const wrapper = mount(PressPicker, {
      propsData: {
        columns: 'ABCD'.split(''),
      },
    });
    const vm =  wrapper.vm as typeof wrapper.vm & Record<string, any>;
    await new Promise(r => wrapper.vm.$nextTick(r));

    await wrapper.find('.press-picker-column__item:nth-of-type(2)').trigger('click');
    expect(wrapper.emitted('change')![0]).toEqual([{ value: 'B', index: 1 }]);
    expect(vm.getValues()).toEqual(['B']);

    await wrapper.find('.press-picker-column__item:nth-of-type(3)').trigger('click');
    expect(wrapper.emitted('change')![1]).toEqual([{ value: 'C', index: 2 }]);
    expect(vm.getValues()).toEqual(['C']);

    await wrapper.find('.press-picker-column__item:nth-of-type(1)').trigger('click');
    expect(wrapper.emitted('change')![2]).toEqual([{ value: 'A', index: 0 }]);
    expect(vm.getValues()).toEqual(['A']);
  });

  it('should not emit change event when the selected item is clicked', async () => {
    const wrapper = mount(PressPicker, {
      propsData: {
        columns: 'ABCD'.split(''),
        defaultIndex: 2,
      },
    });

    await wrapper.find('.press-picker-column__item:nth-of-type(3)').trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();
  });

  it('should not emit change event when the item is disabled', async () => {
    const wrapper = mount(PressPicker, {
      propsData: {
        columns: [{ text: 'A', disabled: true }, { text: 'B' }, 'C'],
      },
    });
    await new Promise(r => wrapper.vm.$nextTick(r));

    await wrapper.find('.press-picker-column__item:nth-of-type(1)').trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();
  });

  it('should emit confirm event when the confirm button is clicked', async () => {
    const wrapper = mount(PressPicker, {
      propsData: {
        columns: 'ABCD'.split(''),
        showToolbar: true,
      },
    });
    await new Promise(r => wrapper.vm.$nextTick(r));

    await wrapper.find('.press-picker-column__item:nth-of-type(3)').trigger('click');
    await wrapper.find('.press-picker__confirm').trigger('click');
    expect(wrapper.emitted('confirm')![0]).toEqual([{ value: 'C', index: 2 }]);
  });

  it('should emit cancel event when the cancel button is clicked', async () => {
    const wrapper = mount(PressPicker, {
      propsData: {
        columns: 'ABCD'.split(''),
        showToolbar: true,
      },
    });
    await new Promise(r => wrapper.vm.$nextTick(r));

    await wrapper.find('.press-picker-column__item:nth-of-type(4)').trigger('click');
    await wrapper.find('.press-picker__cancel').trigger('click');
    expect(wrapper.emitted('cancel')![0]).toEqual([{ value: 'D', index: 3 }]);
  });

  it('should correctly emit change events when there are multiple columns', async () => {
    const columns: Record<string, string[]> = {
      Letters: 'ABCD'.split(''),
      Numbers: '123456'.split(''),
    };

    const wrapper = mount(PressPicker, {
      propsData: {
        columns: [
          {
            values: Object.keys(columns),
            defaultIndex: 1,
          },
          {
            values: columns.Numbers,
            defaultIndex: 2,
          },
        ],
      },
      listeners: {
        change: ({ value }: {value: string[], index: number}) => {
          (wrapper.vm as Record<string, any>).setColumnValues(1, columns[value[0]]);
        },
      },
    });
    const vm =  wrapper.vm as typeof wrapper.vm & Record<string, any>;
    await new Promise(r => wrapper.vm.$nextTick(r));

    const firstCol = wrapper.find('.press-picker__column:nth-of-type(1)');
    const secondCol = wrapper.find('.press-picker__column:nth-of-type(2)');

    await firstCol.find('.press-picker-column__item:nth-of-type(2)').trigger('click');
    expect(wrapper.emitted('change')).toBeFalsy();

    await secondCol.find('.press-picker-column__item:nth-of-type(5)').trigger('click');
    expect(wrapper.emitted('change')![0]).toBeTruthy();
    expect(vm.getValues()).toEqual(['Numbers', '5']);

    await firstCol.find('.press-picker-column__item:nth-of-type(1)').trigger('click');
    // wait for the second column to set its index
    await new Promise(r => wrapper.vm.$nextTick(r));
    expect(wrapper.emitted('change')![1]).toBeTruthy();
    expect(vm.getValues()).toEqual(['Letters', 'A']);

    await secondCol.find('.press-picker-column__item:nth-of-type(4)').trigger('click');
    expect(wrapper.emitted('change')![2]).toBeTruthy();
    expect(vm.getValues()).toEqual(['Letters', 'D']);

    await secondCol.find('.press-picker-column__item:nth-of-type(4)').trigger('click');
    expect(wrapper.emitted('change')).toHaveLength(3);
    expect(vm.getValues()).toEqual(['Letters', 'D']);

    await secondCol.find('.press-picker-column__item:nth-of-type(2)').trigger('click');
    expect(wrapper.emitted('change')![3]).toBeTruthy();
    expect(vm.getValues()).toEqual(['Letters', 'B']);

    await firstCol.find('.press-picker-column__item:nth-of-type(2)').trigger('click');
    // wait for the second column to set its index
    await new Promise(r => wrapper.vm.$nextTick(r));
    expect(wrapper.emitted('change')![4]).toBeTruthy();
    expect(vm.getValues()).toEqual(['Numbers', '1']);
  });
});
