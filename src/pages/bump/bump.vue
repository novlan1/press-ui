<template>
  <view class="bump-page">
    <!-- 顶部状态区 -->
    <view class="status-card">
      <text class="status-title">
        碰一碰状态
      </text>
      <text class="status-phase">
        {{ phaseText }}
      </text>
      <text class="status-temp-id">
        昵称: {{ myNick || '未设置' }}
      </text>
      <text class="status-temp-id">
        uid: {{ myUid || '—' }}
      </text>
      <text class="status-temp-id">
        tempId: {{ myTempId || '—' }}
      </text>
    </view>

    <!-- 昵称设置区（微信昵称填写能力） -->
    <view class="nick-card">
      <text class="nick-label">
        我的昵称
      </text>
      <input
        type="nickname"
        class="nick-input"
        :value="myNick"
        placeholder="点击设置微信昵称"
        @blur="onNickBlur"
      >
    </view>

    <!-- 雷达区域 -->
    <view class="radar-card">
      <view class="radar-header">
        <text class="radar-title">
          附近鹅友（{{ peers.length }}）
        </text>
        <text class="radar-hint">
          点击某个鹅友发起碰蛋
        </text>
      </view>

      <scroll-view
        scroll-y
        class="radar-list"
      >
        <view
          v-for="peer in peers"
          :key="peer.peerTempId"
          class="peer-item"
          @tap="onTapPeer(peer)"
        >
          <text class="peer-nick">
            {{ peer.nick || peer.uid || peer.peerTempId }}
          </text>
          <text class="peer-uid">
            {{ peer.uid || peer.peerTempId }}
          </text>
          <text class="peer-rssi">
            RSSI: {{ peer.rssi }}
          </text>
          <text class="peer-action">
            碰一碰 →
          </text>
        </view>
        <view
          v-if="peers.length === 0"
          class="peer-empty"
        >
          <text>扫描中…等待附近设备出现</text>
        </view>
      </scroll-view>
    </view>

    <!-- 日志区 -->
    <view class="log-card">
      <view class="log-header">
        <text class="log-title">
          运行日志
        </text>
        <text
          class="log-clear"
          @tap="onClearLogs"
        >
          清空
        </text>
      </view>
      <scroll-view
        scroll-y
        class="log-list"
        :scroll-into-view="lastLogId"
        :scroll-with-animation="true"
      >
        <view
          v-for="(log, idx) in logs"
          :id="'log-' + idx"
          :key="idx"
          class="log-item"
        >
          <text class="log-text">
            {{ log }}
          </text>
        </view>
      </scroll-view>
    </view>

    <!-- 底部操作按钮 -->
    <view class="action-bar">
      <button
        class="btn btn-start"
        :disabled="running"
        @tap="onStart"
      >
        开始碰一碰
      </button>
      <button
        class="btn btn-stop"
        :disabled="!running"
        @tap="onStop"
      >
        停止
      </button>
    </view>
  </view>
</template>

<script>
import { BumpEvent } from 'ble-bump';
import { initBumpService, getOrCreateUid, getNick, setNick } from './bump-adapter';

const PHASE_TEXT_MAP = {
  idle: '空闲',
  starting: '启动中',
  scanning: '扫描中',
  reporting: '撮合中',
  matched: '已匹配',
  failed: '失败',
};

export default {
  data() {
    return {
      peers: [],
      // 校验中的对端（已扫到但尚未确认是本项目设备），不渲染到列表
      pendingPeers: {},
      logs: [],
      running: false,
      myUid: '',
      myNick: '',
      myTempId: '',
      phase: '',
      unsubs: [],
      // 被碰轮询状态
      notifyTimer: null,
      notifyBaselineReady: false,
      seenMatchIds: [],
    };
  },
  computed: {
    phaseText() {
      return PHASE_TEXT_MAP[this.phase] || this.phase || '空闲';
    },
    // 日志列表最后一条的 id，用于 scroll-into-view 自动滚到底部
    lastLogId() {
      return this.logs.length ? `log-${this.logs.length - 1}` : '';
    },
  },
  onLoad() {
    this.bump = initBumpService();
    this.myUid = getOrCreateUid();
    this.myNick = getNick();
    this.bindEvents();
    this.syncState();
    this.startBumpNotifyPolling();
  },
  onUnload() {
    this.stopBumpNotifyPolling();
    this.unbindEvents();
  },
  methods: {
    addLog(msg) {
      const time = new Date().toLocaleTimeString('zh-CN', { hour12: false });
      this.logs.push(`[${time}] ${msg}`);
      if (this.logs.length > 200) {
        this.logs.splice(0, this.logs.length - 200);
      }
    },

    onClearLogs() {
      this.logs = [];
    },

    // 微信昵称输入框失焦：保存用户填写的昵称（未填写则不覆盖）
    onNickBlur(e) {
      const nick = ((e && e.detail && e.detail.value) || '').trim();
      if (!nick) return;
      this.myNick = nick;
      setNick(nick);
      this.addLog(`昵称已设置为「${nick}」`);
    },

    syncState() {
      const state = this.bump.getState();
      this.phase = state.phase;
      this.myTempId = state.myTempId;
    },

    bindEvents() {
      // 扫到设备时先不展示：只存 pending，等身份校验确认是本项目设备再进 peers
      const onPeerFound = (payload) => {
        const { peerTempId, peerDeviceId, rssi, alreadyBumped } = payload || {};
        this.addLog(`发现设备 tempId=${peerTempId} rssi=${rssi}（校验中，暂不展示）`);
        this.pendingPeers[peerTempId] = {
          peerTempId,
          peerDeviceId,
          rssi,
          alreadyBumped: !!alreadyBumped,
        };
      };
      // 身份校验通过（getPetByTempId 查到 uid/nick）→ 确认是本项目设备
      // 按 uid 去重（队列语义）：同一台对端（同一 uid）的不同 tempId（每 3-4 分钟刷新）
      // 后扫到的把旧记录顶下去，用最新数据排到列表末尾（最新活跃）
      const onPeerInfoUpdated = (payload) => {
        const { peerTempId, uid, nick, petNick } = payload || {};
        const pending = this.pendingPeers[peerTempId];
        delete this.pendingPeers[peerTempId];
        if (!pending) return;
        // 先按 uid 合并：找到同 uid 旧记录 → 移除 + 用最新数据 push 到末尾
        if (uid) {
          const existingIdx = this.peers.findIndex(p => p.uid === uid);
          if (existingIdx !== -1) {
            const existing = this.peers[existingIdx];
            this.peers.splice(existingIdx, 1);
            this.peers.push({
              peerTempId,
              peerDeviceId: pending.peerDeviceId,
              rssi: pending.rssi,
              nick: nick || existing.nick || '',
              uid,
              petNick: petNick || existing.petNick || '',
              alreadyBumped: !!pending.alreadyBumped || !!existing.alreadyBumped,
            });
            this.addLog(`鹅友重新活跃 tempId=${peerTempId} uid=${uid} nick=${nick || existing.nick}（顶到最新）`);
            return;
          }
        }
        // 再按 tempId 防重（同 tempId 重复派发场景）
        if (this.peers.find(p => p.peerTempId === peerTempId)) return;
        this.peers.push({
          peerTempId,
          peerDeviceId: pending.peerDeviceId,
          rssi: pending.rssi,
          nick: nick || '',
          uid: uid || '',
          petNick: petNick || '',
          alreadyBumped: pending.alreadyBumped,
        });
        this.addLog(`鹅友身份校验通过 tempId=${peerTempId} uid=${uid} nick=${nick}`);
      };
      // 身份校验失败（查不到 → 不是本项目设备）→ 直接从 pending 丢弃，不展示
      const onPeerRejected = (payload) => {
        const { peerTempId, reason } = payload || {};
        delete this.pendingPeers[peerTempId];
        this.peers = this.peers.filter(p => p.peerTempId !== peerTempId);
        this.addLog(`非项目设备已忽略 tempId=${peerTempId}（reason=${reason}）`);
      };
      const onPeerLost = (payload) => {
        const { peerTempId } = payload || {};
        delete this.pendingPeers[peerTempId];
        this.peers = this.peers.filter(p => p.peerTempId !== peerTempId);
        this.addLog(`鹅友离开 tempId=${peerTempId}`);
      };
      const onFailed = (payload) => {
        const { reason, soft } = payload || {};
        this.addLog(`[${soft ? '软失败' : '失败'}] ${reason}`);
        if (!soft) this.running = false;
        this.syncState();
      };

      uni.$on(BumpEvent.PeerFound, onPeerFound);
      uni.$on(BumpEvent.PeerInfoUpdated, onPeerInfoUpdated);
      uni.$on(BumpEvent.PeerRejected, onPeerRejected);
      uni.$on(BumpEvent.PeerLost, onPeerLost);
      uni.$on(BumpEvent.Failed, onFailed);

      this.unsubs = [
        { event: BumpEvent.PeerFound, handler: onPeerFound },
        { event: BumpEvent.PeerInfoUpdated, handler: onPeerInfoUpdated },
        { event: BumpEvent.PeerRejected, handler: onPeerRejected },
        { event: BumpEvent.PeerLost, handler: onPeerLost },
        { event: BumpEvent.Failed, handler: onFailed },
      ];
    },

    unbindEvents() {
      this.unsubs.forEach(({ event, handler }) => {
        uni.$off(event, handler);
      });
      this.unsubs = [];
    },

    async onStart() {
      this.addLog('点击开始碰一碰');
      try {
        await this.bump.start({});
        this.running = true;
        this.syncState();
        this.addLog(`启动成功 tempId=${this.myTempId}`);
      } catch (e) {
        this.addLog(`启动失败 ${e && e.message ? e.message : e}`);
      }
    },

    onStop() {
      this.addLog('点击停止碰一碰');
      this.bump.stop();
      this.running = false;
      this.peers = [];
      this.pendingPeers = {};
      this.syncState();
    },

    async onTapPeer(peer) {
      this.addLog(`点击鹅友 ${peer.nick || peer.peerTempId} 发起碰蛋`);
      const result = await this.bump.bumpPeer(peer.peerTempId);
      if (result.success) {
        this.addLog(`碰蛋成功！matchId=${result.matchId}`);
        uni.showToast({ title: '碰蛋成功！', icon: 'success' });
      } else {
        this.addLog(`碰蛋失败：${result.error}`);
        uni.showToast({ title: result.error || '碰蛋失败', icon: 'none' });
      }
    },

    // ==================== 被碰轮询 ====================

    // 启动被碰轮询：进入页面立即拉一次建立基线，之后每 10s 查一次"别人碰我"的流水
    startBumpNotifyPolling() {
      this.stopBumpNotifyPolling();
      this.pollBumpNotifications();
      this.notifyTimer = setInterval(() => {
        this.pollBumpNotifications();
      }, 10000);
    },

    stopBumpNotifyPolling() {
      if (this.notifyTimer) {
        clearInterval(this.notifyTimer);
        this.notifyTimer = null;
      }
    },

    async pollBumpNotifications() {
      try {
        const items = await this.bump.queryBumpNotifications();
        // 首次只建立基线（页面打开时已有的历史被碰记录不弹提示），
        // 之后每次轮询对比 matchId，发现新增才提示
        if (!this.notifyBaselineReady) {
          this.notifyBaselineReady = true;
          items.forEach((it) => {
            if (it.matchId) this.seenMatchIds.push(it.matchId);
          });
          this.addLog(`被碰监听已启动（基线 ${items.length} 条历史记录）`);
          return;
        }
        const fresh = items.filter(it => it.matchId && !this.seenMatchIds.includes(it.matchId));
        items.forEach((it) => {
          if (it.matchId && !this.seenMatchIds.includes(it.matchId)) this.seenMatchIds.push(it.matchId);
        });
        if (fresh.length > 0) {
          fresh.forEach((it) => {
            this.addLog(`⚠️ 你被 ${it.peerNick || '鹅友'} 碰了！奖励：${this.rewardText(it.rewardType)}`);
            uni.showToast({ title: `${it.peerNick || '鹅友'} 碰了你`, icon: 'none' });
          });
        }
      } catch (e) {
        this.addLog(`被碰轮询失败：${(e && e.message) || e}`);
      }
    },

    rewardText(type) {
      if (type === 'gold') return '金蛋';
      if (type === 'silver') return '银蛋';
      if (type === 'photo') return '合照';
      return '未知';
    },
  },
};
</script>

<style lang="scss" scoped>
.bump-page {
  min-height: 100vh;
  background: #f8f8f8;
  padding: 24rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.status-card,
.radar-card,
.log-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.status-card {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.status-title {
  font-size: 24rpx;
  color: #999;
}

.status-phase {
  font-size: 40rpx;
  font-weight: 600;
  color: #0052d9;
}

.status-temp-id {
  font-size: 24rpx;
  color: #666;
  word-break: break-all;
}

.nick-card {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.nick-label {
  font-size: 26rpx;
  color: #333;
  flex-shrink: 0;
}

.nick-input {
  flex: 1;
  height: 72rpx;
  padding: 0 20rpx;
  background: #f5f5f5;
  border-radius: 12rpx;
  font-size: 26rpx;
  color: #333;
}

.radar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.radar-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
}

.radar-hint {
  font-size: 22rpx;
  color: #999;
}

.radar-list {
  max-height: 320rpx;
}

.peer-item {
  display: flex;
  align-items: center;
  padding: 20rpx 8rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.peer-nick {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.peer-uid {
  font-size: 20rpx;
  color: #bbb;
  margin-right: 16rpx;
  max-width: 200rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.peer-rssi {
  font-size: 22rpx;
  color: #999;
  margin-right: 16rpx;
}

.peer-action {
  font-size: 26rpx;
  color: #0052d9;
}

.peer-empty {
  padding: 40rpx 0;
  text-align: center;
  color: #ccc;
  font-size: 24rpx;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.log-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
}

.log-clear {
  font-size: 24rpx;
  color: #0052d9;
}

.log-list {
  max-height: 400rpx;
}

.log-item {
  padding: 8rpx 0;
}

.log-text {
  font-size: 22rpx;
  color: #666;
  word-break: break-all;
  font-family: monospace;
}

.action-bar {
  display: flex;
  gap: 24rpx;
}

.btn {
  flex: 1;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 44rpx;
  font-size: 30rpx;
}

.btn-start {
  background: #0052d9;
  color: #fff;
}

.btn-start[disabled] {
  opacity: 0.5;
}

.btn-stop {
  background: #fff;
  color: #e34d59;
  border: 1rpx solid #e34d59;
}

.btn-stop[disabled] {
  opacity: 0.5;
}
</style>
