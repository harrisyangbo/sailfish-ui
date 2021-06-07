import logicMixin from './logic_mixin';

export default {
  name: 'DhLogicConfirm',
  mixins: [
    logicMixin
  ],
  onRun(prevResult, next) {
    this.$emit('confirm', prevResult, next, async () => {});
  },
  render() {}
};
