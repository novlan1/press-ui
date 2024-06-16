import { getPropsWatch,  getPropsData, setPropsToData } from '../common/component-handler';


export function getDialogMixin(dialogProps) {
  return {
    data() {
      return {
        ...getPropsData(this, dialogProps),
      };
    },
    watch: {
      ...getPropsWatch(dialogProps),
    },
    methods: {
      setData(data) {
        setPropsToData.call(this, data);
      },
    },
  };
}
