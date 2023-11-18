export function getMatchItemMixin() {
  return {
    props: {
      matchInfo: {
        type: Object,
        default: () => ({}),
        required: false,
      },
      popoverAwardIndex: {
        type: Array,
        default: () => ([-1, -1, -1]),
      },
      popoverTitle: {
        type: String,
        default: '',
      },
      popoverContent: {
        type: String,
        default: '',
      },
      showPopover: {
        type: Boolean,
        default: false,
      },
      popoverRotate: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
      };
    },
    computed: {
      awardIndex() {
        const index = this.popoverAwardIndex[2];
        return index == undefined ? -1 : index;
      },
    },
    methods: {
      clickPrize() {
        this.$emit('clickPrize');
      },
      onShowPopover(item, index) {
        this.$emit('onShowPopover', item, index);
      },
      closePopover() {
        this.$emit('closePopover');
      },
      clickMatchButton() {
        this.$emit('clickMatchButton', this.matchInfo);
      },
      clickMatch() {
        this.$emit('clickMatch', this.matchInfo);
      },
    },
  };
}
