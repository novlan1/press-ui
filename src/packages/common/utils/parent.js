export function getParentData(parentName = '') {
  // 避免在created中去定义parent变量
  if (!this.parent) this.parent = {};
  // 这里的本质原理是，通过获取父组件实例(也即类似u-radio的父组件u-radio-group的this)
  // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
  // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
  // 此处并不会自动更新子组件的数据，而是依赖父组件u-radio-group去监听data的变化，手动调用更新子组件的方法去重新获取
  this.parent = $parent.call(this, parentName);
  if (this.parent.children) {
    // 如果父组件的children不存在本组件的实例，才将本实例添加到父组件的children中
    this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
  }
  if (this.parent && this.parentData) {
    // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
    Object.keys(this.parentData).map((key) => {
      this.parentData[key] = this.parent[key];
    });
  }
}


/**
* @description 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
   this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
   这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
   值(默认为undefined)，就是查找最顶层的$parent
*  @param {string|undefined} name 父组件的参数名
*/
function $parent(name = undefined) {
  let parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}


/**
 * @description 在u-form的子组件内容发生变化，或者失去焦点时，尝试通知u-form执行校验方法
 * @param {*} instance
 * @param {*} event
 */
export function formValidate(instance, event) {
  const formItem = $parent.call(instance, 'PressFormItem');
  const form = $parent.call(instance, 'PressForm');
  // 如果发生变化的input或者textarea等，其父组件中有u-form-item或者u-form等，就执行form的validate方法
  // 同时将form-item的pros传递给form，让其进行精确对象验证
  if (formItem && form) {
    form.validateField(formItem.prop, () => {}, event);
  }
}
