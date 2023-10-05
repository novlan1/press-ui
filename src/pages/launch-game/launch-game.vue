<template>
  <div
    class="demo-wrap demo-wrap--gray"
  >
    <demo-block
      title="Custom"
    />

    <PressField
      v-model="inputRoomId"
      label="Room Id"
      placeholder="Please Input Room Id"
    />
    <PressField
      v-model="inputRoomPwd"
      label="Room Pwd"
      placeholder="Please Input Room Pwd"
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
// import { getQueryObj } from 't-comm/lib/url/url';

import { FUNCTIONAL_ID_MAP,
  showPicker,
} from 'src/packages/press-popup-cell/demo-helper/helper';
import PressPopupCell from 'src/packages/press-popup-cell/press-popup-cell.vue';
import PressCell from 'src/packages/press-cell/press-cell.vue';
import PressButton from 'src/packages/press-button/press-button.vue';
import PressField from 'src/packages/press-field/press-field.vue';
import PressPicker from 'src/packages/press-picker/press-picker.vue';
import PressDialogHandler from 'src/packages/press-dialog';
import {
  launchGNGameRoom,
} from 't-comm/lib/launch-game/launch-game';
import QRcode from 'qrcode';


const GAME_LIST = [
  {
    label: 'GN',
    value: 'GN',
  },
  {
    label: 'GP',
    value: 'GP',
  },
  {
    label: 'DDZ',
    value: 'DDZ',
  },
  {
    label: 'MJ',
    value: 'MJ',
  },
];


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
      curGame: 'GN',
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    onLaunchGame() {
      launchGNGameRoom({
        roomId: this.inputRoomId || '',
        roomPwd: this.inputRoomPwd || '',
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
// .demo-wrap {
//   margin-top: 20px;
// }
.button__wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 20px 0;
}
</style>
