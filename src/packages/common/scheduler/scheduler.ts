export class Scheduler {
  pendingState: Array<Function>;
  doingJobs: number;
  maxConcurrency: number;

  constructor(maxConcurrency = 2) {
    this.pendingState = [];
    this.doingJobs = 0;
    this.maxConcurrency = maxConcurrency;
  }

  add = promiseCreator => new Promise((resolve, reject) => {
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
          .then((res) => {
          // @ts-ignore
            job.resolve(res);
          })
          .catch((e) => {
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
