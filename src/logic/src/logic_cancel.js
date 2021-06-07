import logicMixin from './logic_mixin';

export default {
  name: 'DhLogicCancel',
  mixins: [
    logicMixin
  ],
  onRun(prevResult, next) {
    this.$emit('cancel', prevResult, next, async () => {});
  },
  render() {}
};
