function isMulti(options) {
  if (options == null || options[0] == null) {
    return false;
  }

  // 【修改点】替换了判断二维数组的方法
  return Array.isArray(options) && Array.isArray(options[0]);
}

export default {
  isMulti,
};
