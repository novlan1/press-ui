
class Scheduler {
  pendingState: Array<Function>;
  doingJobs: number;
  maxConcurrency: number;

  /**
   * 异步任务调度器，同一时间只能执行 n 个任务
   * @param {number} [maxConcurrency] 最多同时执行的任务数目，默认为 2
   *
   * @example
   * ```ts
   * let scheduler;
   *
   * export async function login({
   *   userId,
   *   userSig,
   *   tim,
   * }: {
   *   userId: string;
   *   userSig: string;
   *   tim: IChatSDK;
   * }) {
   *   if (!scheduler) {
   *     scheduler = new Scheduler(1);
   *   }
   *
   *   return await scheduler.add(innerLogin.bind(null, {
   *     userId,
   *     userSig,
   *     tim,
   *   }));
   * }
   * ```
   */
  constructor(maxConcurrency = 2) {
    this.pendingState = [];
    this.doingJobs = 0;
    this.maxConcurrency = maxConcurrency;
  }

  add = (promiseCreator: any) => new Promise((resolve, reject) => {
    // 关键是给传过来的函数加个回调属性，当resolved的时候，就能返回对应的结果了。
    promiseCreator.resolve = resolve;
    promiseCreator.reject = reject;
    this.pendingState.push(promiseCreator);
    this.doJob();
  });

  doJob = () => {
    if (this.doingJobs < 2) {
      if (this.pendingState.length) {
        this.doingJobs += 1;
        const job = this.pendingState.shift();

        job?.()
          .then((res: any) => {
          // @ts-ignore
            job.resolve(res);
          })
          .catch((e: any) => {
          // @ts-ignore
            job.reject(e);
          })
          .finally(() => {
            this.doingJobs -= 1;
            this.doJob();
          });
      }
    }
  };
}

export {
  Scheduler,
};
