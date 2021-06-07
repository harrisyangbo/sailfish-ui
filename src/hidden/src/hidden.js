import compMixin from '../../mixin/catalyst_register';

export default {
  name: 'DhHidden',
  mixins: [
    compMixin
  ],
  props: ['value'],
  mounted() {
    this.$mpNoticeReady();
  },
  render() {}
};
