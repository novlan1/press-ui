import { getPropsWatch,  getPropsData, setPropsToData } from '../common/component-handler';


export function getDialogMixin(dialogProps: any) {
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
      setData(data: any) {
        setPropsToData.call(this, data);
      },
    },
  };
}
