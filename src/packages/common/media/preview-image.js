// const {
//   emit,
//   invokeCallbackHandler: invoke,
// } = UniServiceJSBridge;

// export function previewImage(args, callbackId) {
//   emit('onShowPreviewImage', args, (res) => {
//     invoke(callbackId, {
//       errMsg: 'previewImage:ok',
//     });
//   });
// }

// export function closePreviewImage(_, callbackId) {
//   emit('onClosePreviewImage', () => {
//     invoke(callbackId, {
//       errMsg: 'closePreviewImage:ok',
//     });
//   });
// }
