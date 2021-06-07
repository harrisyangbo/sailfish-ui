import logicMixin from './logic_mixin';

export default {
  name: 'DhLogicDialog',
  mixins: [
    logicMixin
  ],
  props: {
    uri: {
      type: String,
      default: ''
    }
  },
  onRun(prevResult, next) {
    this.$emit('showDialog', this.uri, prevResult, next, async () => {});
  },
  render() {}
};
