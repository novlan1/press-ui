import EN_US_LANG from './en-US';


export default {
  ...EN_US_LANG,

  name: 'Tên',
  tel: 'Điện thoại',
  save: 'Đồng ý',
  confirm: 'Xác nhận',
  cancel: 'Hủy bỏ',
  delete: 'Xóa bỏ',
  complete: 'Hoàn thành',
  loading: 'Đang tải...',
  telEmpty: 'Vui lòng điền số điện thoại',
  nameEmpty: 'vui lòng điền tên',
  nameInvalid: 'Vui lòng nhập tên chính xác',
  confirmDelete: 'Bạn có chắc chắn muốn xóa',
  telInvalid: 'Vui lòng nhập số điện thoại chính xác',
  reply: 'Reply',
  clear: 'Clear',
  calendar: {
    end: 'Chấm dứt',
    start: 'Bắt đầu',
    title: 'Chọn ngày',
    confirm: 'Đảm bảo',
    startEnd: 'Bắt đầu / Kết thúc',
    weekdays: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
    monthTitle: (year, month) => `${year} năm ${month} tháng`,
    rangePrompt: maxRange => `Các ngày được chọn không được vượt quá ${maxRange} ngày`,
  },
  picker: {
    confirm: 'Đảm bảo',
  },
};
