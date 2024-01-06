 type HandleListType = Array<{
   url: string;
   reqData: object;
   handle: any;
 }>;

let handleList: HandleListType = []; // 请求列表


export function filterSameRequest({
  url,
  reqData,
  handle,
}: {
  url: string;
  reqData: Record<string, any>;
  handle: Function;
}) {
  const sameHandle = handleList.find(item => item.url === url
   && JSON.stringify(item.reqData) === JSON.stringify(reqData));

  if (sameHandle) {
    // 遇到相同请求直接返回之前请求的promise
    console.log('存在重复请求，直接返回');
    return sameHandle.handle;
  }
  console.log('不存在重复请求');

  const promise = handle();
  // const finallyCb = promise.finally;
  promise.finally(() => {
    // finallyCb();
    console.log('[filterSameRequest] finally');

    handleList = handleList.filter(item => item.url !== url
      && JSON.stringify(item.reqData) !== JSON.stringify(reqData));
  });

  handleList.push({ url, reqData, handle: promise });
  return promise;
}

