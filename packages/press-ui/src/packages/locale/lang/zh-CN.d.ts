declare namespace _default {
  export const name: string;
  export const tel: string;
  export const save: string;
  export const confirm: string;
  export const cancel: string;
  const _delete: string;
  export { _delete as delete };
  export const complete: string;
  export const loading: string;
  export const telEmpty: string;
  export const nameEmpty: string;
  export const nameInvalid: string;
  export const confirmDelete: string;
  export const telInvalid: string;
  export const reply: string;
  export namespace calendar {
    export const end: string;
    export const start: string;
    export const title: string;
    const confirm_1: string;
    export { confirm_1 as confirm };
    export const startEnd: string;
    export const weekdays: string[];
    export function monthTitle(year: any, month: any): string;
    export function rangePrompt(maxRange: any): string;
  }
  export namespace picker {
    const confirm_2: string;
    export { confirm_2 as confirm };
  }
  export namespace dialog {
    const title_1: string;
    export { title_1 as title };
  }
  export namespace scheduleTree {
    const pending: string;
    const emptyTeam: string;
    const quitScore: string;
    const champion: string;
    const thirdPlace: string;
    const checkFinal: string;
    function groupedChampion(isChampion: any): '分组冠军' | '分组季军';
    const ended: string;
    const playing: string;
    function currentBo(curBo: any, boType: any): string;
    const joining: string;
    const joiningAndTimeoutAutoQuit: string;
    const startMatchOnTime: string;
    const endTimeFormat: string;
    const startBattleAuto: string;
    const startBattleManual: string;
    const startBattleOnTime: string;
  }
  export namespace scheduleList {
    const finals: string;
    const finalsChampion: string;
    const me: string;
    const joinDeadline: string;
    const manage: string;
    const spectate: string;
    const toPlay: string;
    const reCap: string;
    const subscribe: string;
    const subscribed: string;
  }
  export namespace actTipDialog {
    const prompt: string;
  }
}
export default _default;
