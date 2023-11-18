<template>
  <div
    class="demo-wrap demo-wrap--gray"
  >
    <demo-block
      title="Custom"
    />

    <PressField
      v-if="curGameParams.roomId"
      v-model="inputRoomId"
      :label="curGameParams.roomId.label"
      :placeholder="`Please Input ${curGameParams.roomId.label}`"
    />
    <PressField
      v-if="curGameParams.roomPwd"
      v-model="inputRoomPwd"
      :label="curGameParams.roomPwd.label"
      :placeholder="`Please Input ${curGameParams.roomPwd.label}`"
    />
    <PressField
      v-if="curGameParams.uin"
      v-model="inputUin"
      label="Uin"
      placeholder="Please Input Uin"
    />
    <press-cell
      title="Game"
      :value="curGame"
      is-link
      @click="onSelectGame"
    />

    <div class="button__wrap">
      <PressButton
        type="e-sport-primary-bg"
        @click="onLaunchGame"
      >
        Launch Game
      </PressButton>
    </div>
    <!-- <press-cell
        v-for="(item, index) of gameList"
        :key="index"
        :title="item.zh"
        is-link
        @click="onLaunchApp(item.key)"
      /> -->
    <!-- </demo-block> -->

    <!-- <demo-block
      :title="t('custom')"
    >
      <press-cell
        :title="t('custom')"
        is-link
        @click="onCustom"
      />
    </demo-block> -->

    <PressPopupCell
      :id="FUNCTIONAL_ID_MAP.POPUP_CELL"
      :ref="FUNCTIONAL_ID_MAP.POPUP_CELL"
      mode="functional"
    />
    <PressPicker
      :id="FUNCTIONAL_ID_MAP.PICKER"
      :ref="FUNCTIONAL_ID_MAP.PICKER"
      mode="functional"
    />
  </div>
</template>
<script>
import QRcode from 'qrcode';
import {
  launchGNGameRoom,
  launchDDZGameRoom,
  launchGPGameRoom,
  launchMJGameRoom,
} from 't-comm/lib/launch-game/launch-game';
import { flatten } from 't-comm/lib/base/list';

import PressPopupCell from 'src/packages/press-popup-cell/press-popup-cell.vue';
import PressCell from 'src/packages/press-cell/press-cell.vue';
import PressButton from 'src/packages/press-button/press-button.vue';
import PressField from 'src/packages/press-field/press-field.vue';
import PressPicker from 'src/packages/press-picker/press-picker.vue';

import PressDialogHandler from 'src/packages/press-dialog';
import {
  FUNCTIONAL_ID_MAP,
  showPicker,
} from 'src/packages/press-popup-cell/demo-helper/helper';


const GAME_LIST = [
  {
    label: 'GN',
    value: 'GN',
    launchFunc: launchGNGameRoom,
    launchParams: {
      uin: false,
      roomId: { label: 'Room Id' },
      roomPwd: { label: 'Room Pwd' },
    },
  },
  {
    label: 'GP',
    value: 'GP',
    launchFunc: launchGPGameRoom,
    launchParams: {
      uin: false,
      roomId: { label: 'Room Id' },
      roomPwd: { label: 'Room Pwd' },
    },
  },
  {
    label: 'DDZ',
    value: 'DDZ',
    launchFunc: launchDDZGameRoom,
    launchParams: {
      uin: true,
      roomId: { label: 'Series Id' },
      roomPwd: { label: 'Game Id' },
    },
  },
  {
    label: 'MJ',
    value: 'MJ',
    launchFunc: launchMJGameRoom,
    launchParams: {
      uin: true,
      roomId: { label: 'Series Id' },
      roomPwd: { label: 'Game Id' },
    },
  },
];

const gameMap = flatten(GAME_LIST, 'value');


export default {
  components: {
    PressPopupCell,
    PressCell,
    PressButton,
    PressField,
    PressPicker,
  },
  data() {
    return {
      FUNCTIONAL_ID_MAP,
      inputRoomId: '',
      inputRoomPwd: '',
      inputUin: '',

      curGame: 'GN',
    };
  },
  computed: {
    curGameParams() {
      const { launchParams } = gameMap[this.curGame] || {};
      return launchParams || {};
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onLaunchGame() {
      const launchHandler = gameMap[this.curGame]?.launchFunc;
      if (!launchHandler) return;

      launchHandler({
        roomId: this.inputRoomId || '',
        roomPwd: this.inputRoomPwd || '',

        seriesId: this.inputRoomId || '',
        gameId: this.inputRoomPwd || '',
        uin: this.inputUin || '',

        context: this,
        qrCodeLib: QRcode,
        dialogHandler: PressDialogHandler,
      }).then(() => {
        this.onGTip('Launch Success');
      })
        .catch(() => {
          this.onGTip('Launch Fail');
        });
    },
    onSelectGame() {
      showPicker({
        title: 'Select Game',
        closeIcon: true,
        list: GAME_LIST,
        current: {
          value: this.curGame,
        },
      }).then(({ item }) => {
        this.curGame = item.value;
        this.onGTip('Set Successfully');
      })
        .catch(() => {

        });
    },
  },
};
</script>
<style scoped lang="scss">
.button__wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 20px 0;
}
</style>
