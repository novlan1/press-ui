/**
 * 碰一碰 uniapp 适配层（Vue2 版）—— 把 ble-bump 核心包接入 press-ui 运行时。
 *
 * 职责：
 *   - 事件总线适配到 uni.$emit / uni.$on / uni.$off
 *   - 存储适配到 uni.getStorageSync / setStorageSync / removeStorageSync
 *   - 网络 API 走真实后端（koa-blog-end/packages/server 的 /api/bump/* 接口）
 *
 * ⚠️ 环境切换：把 IS_LOCAL 改为 false 即切到远程 https://uwayfly.com/api/
 */

import { BumpService, BumpEvent } from 'ble-bump';

/* ==================== 环境配置 ==================== */

/** 是否本地调试（true=localhost:3008，false=远程 uwayfly.com/api/） */
const IS_LOCAL = false;

const BASE_URL = IS_LOCAL
  ? 'http://localhost:3008/api'
  : 'https://bump.uwayfly.com/api';

/** uid 存储 key（前端随机生成，持久化到 storage） */
const UID_STORAGE_KEY = 'bump:uid';

/** 昵称存储 key（微信昵称输入框主动填写，持久化到 storage） */
const NICK_STORAGE_KEY = 'bump:nick';

/**
 * 蓝牙服务/特征 UUID —— 本项目（press-ui 碰一碰）专属值。
 *
 * 通过 configure 注入，覆盖 ble-bump 包内默认的 0000FEED-...，避免与其它 app /
 * 硬件 demo / 蓝牙调试工具撞车。两端（扫描端 + 广播端）必须一致。
 *
 * ⚠️ 格式必须保持 0000XXXX-0000-1000-8000-00805F9B34FB 的 16-bit 扩展格式：
 *    iOS CoreBluetooth peripheral 广播只支持 16-bit UUID，纯 128-bit 随机 UUID 会导致 iOS 广播失效。
 */
const BUMP_SERVICE_UUID = '0000E4A1-0000-1000-8000-00805F9B34FB';
const BUMP_CHARACTERISTIC_UUID = '0000E4A2-0000-1000-8000-00805F9B34FB';

/* ==================== 事件总线适配（uni.$emit / $on / $off） ==================== */

export const uniEventBus = {
  dispatch(event, payload) {
    uni.$emit(event, payload);
  },
  on(event, handler) {
    uni.$on(event, handler);
    return () => uni.$off(event, handler);
  },
  off(event, handler) {
    uni.$off(event, handler);
  },
};

/* ==================== 存储适配（uni storage） ==================== */

export const uniStorage = {
  get(key) {
    try {
      const v = uni.getStorageSync(key);
      return (v === '' || v === undefined || v === null) ? null : v;
    } catch (e) {
      return null;
    }
  },
  set(key, value) {
    try {
      uni.setStorageSync(key, value);
    } catch (e) { /* swallow */ }
  },
  remove(key) {
    try {
      uni.removeStorageSync(key);
    } catch (e) { /* swallow */ }
  },
};

/* ==================== 日志适配（console） ==================== */

export const consoleLogger = {
  info(message, ...args) {
    // eslint-disable-next-line no-console
    console.log(`[bump] ${message}`, ...args);
  },
  warn(message, ...args) {
    // eslint-disable-next-line no-console
    console.warn(`[bump] ${message}`, ...args);
  },
  error(message, ...args) {
    // eslint-disable-next-line no-console
    console.error(`[bump] ${message}`, ...args);
  },
};

/* ==================== 时钟（系统时间） ==================== */

export const systemClock = {
  now: () => Date.now(),
};

/* ==================== uid 生成与持久化 ==================== */

function genUid() {
  // 8 位随机 base36，便于页面整段展示不截断
  const s = Math.random()
    .toString(36)
    .slice(2, 10);
  return `uid_${s}`;
}

/** 从 storage 读 uid，没有则生成并持久化 */
export function getOrCreateUid() {
  let uid = uniStorage.get(UID_STORAGE_KEY);
  // 兼容旧格式：发现旧版「uid_xxx_xxx」双段超长格式时丢弃重生成
  if (uid && /^uid_.+_.+$/.test(uid)) {
    uniStorage.remove(UID_STORAGE_KEY);
    uid = null;
  }
  if (!uid) {
    uid = genUid();
    uniStorage.set(UID_STORAGE_KEY, uid);
  }
  return uid;
}

/** 读已设置的昵称（未设置返回空串） */
export function getNick() {
  const nick = uniStorage.get(NICK_STORAGE_KEY);
  return String(nick || '').trim();
}

/** 持久化昵称 */
export function setNick(nick) {
  uniStorage.set(NICK_STORAGE_KEY, String(nick || '').trim());
}

/* ==================== uni.request Promise 封装 ==================== */

function request({ url, method = 'GET', data = {} }) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      success: (res) => {
        const { statusCode, data: body } = res || {};
        // 后端异常中间件返回 4xx/5xx + { msg, error_code }
        if (statusCode >= 200 && statusCode < 300) {
          resolve(body);
        } else {
          reject(new Error((body && body.msg) || `请求失败(${statusCode})`));
        }
      },
      fail: (err) => {
        reject(new Error((err && err.errMsg) || '网络异常'));
      },
    });
  });
}

/* ==================== 真实网络 API（koa-blog-end 后端） ==================== */

class RealBumpApi {
  async bumpStart(params) {
    return request({
      url: '/bump/start',
      method: 'POST',
      data: {
        act_id: params.act_id,
        uid: getOrCreateUid(),
        nick: getNick(),
      },
    });
  }

  async bumpReport(params) {
    return request({
      url: '/bump/report',
      method: 'POST',
      data: {
        my_temp_id: params.my_temp_id,
        peer_temp_id: params.peer_temp_id,
        rssi: params.rssi,
        ts: params.ts,
        nonce: params.nonce,
        sign: params.sign,
        uid: getOrCreateUid(),
      },
    });
  }

  async bumpReward(params) {
    return request({
      url: '/bump/reward',
      method: 'POST',
      data: {
        match_id: params.match_id,
        act_id: params.act_id,
        uid: getOrCreateUid(),
      },
    });
  }

  async getBumpConfig() {
    return request({
      url: '/bump/config',
      method: 'GET',
    });
  }

  async getActId() {
    const rsp = await request({
      url: '/bump/act-id',
      method: 'GET',
    });
    return (rsp && rsp.act_id) || '';
  }

  async queryBumpMatchLog(params) {
    return request({
      url: '/bump/match-log',
      method: 'GET',
      data: {
        uid: getOrCreateUid(),
        start_ts: params.start_ts,
        end_ts: params.end_ts,
        role: params.role,
      },
    });
  }

  async getPetByTempId(params) {
    return request({
      url: '/bump/pet-by-temp-id',
      method: 'GET',
      data: {
        temp_id: params.temp_id,
      },
    });
  }
}

/* ==================== 初始化 BumpService 单例 ==================== */

let initialized = false;

export function initBumpService() {
  if (!initialized) {
    BumpService.configure({
      api: new RealBumpApi(),
      events: uniEventBus,
      storage: uniStorage,
      logger: consoleLogger,
      clock: systemClock,
      serviceUuid: BUMP_SERVICE_UUID,
      characteristicUuid: BUMP_CHARACTERISTIC_UUID,
      onBumpMatched: () => {
        // eslint-disable-next-line no-console
        console.log('[bump] 碰蛋成功（宿主钩子）');
      },
    });
    initialized = true;
  }
  return BumpService.ins;
}

export { BumpEvent };
