declare class Scheduler {
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
  add: (promiseCreator: any) => Promise<unknown>;
  doJob: () => void;
  constructor(maxConcurrency?: number);
}
export { Scheduler };
