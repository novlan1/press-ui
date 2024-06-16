declare const player: {
  props: {
    liveInfo: {
      type: ObjectConstructor;
      default: () => {};
    };
    reportInfo: {
      type: ObjectConstructor;
      default: () => {};
    };
    title: {
      type: StringConstructor;
      default: string;
    };
    userRole: {
      type: StringConstructor;
      default: string;
    };
    isAdmin: {
      type: BooleanConstructor;
      default: boolean;
    };
    battleInfo: {
      type: ObjectConstructor;
      default: () => {};
    };
    playerBpInfo: {
      type: ObjectConstructor;
      default: () => {};
    };
    likeMessageList: {
      type: ArrayConstructor;
      default: () => never[];
    };
  };
};
export default player;
