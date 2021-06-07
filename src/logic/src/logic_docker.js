import logicMixin from './logic_mixin';

export default {
  name: 'DhLogicDocker',
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
    this.$emit('showDocker', this.uri, prevResult, next, async () => {});
  },
  render() {}
};
