import compMixin from '../../mixin/catalyst_register';
import logicCallMixin from './logic_call_mixin';

export default {
  mixins: [
    compMixin,
    logicCallMixin
  ],
  props: {
    next: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      $mpNext: '',
      $mpCurrentContext: {}
    };
  },
  created() {
    this.$data.$mpNext = this.next;
  },
  mounted() {
    this.$mpNoticeReady();
  },
  methods: {
    $mpUpdateNext(newNext) {
      if (newNext === undefined || newNext === null || newNext === '') {
        this.$data.$mpNext = this.next;
      } else {
        this.$data.$mpNext = newNext;
      }
    },
    async $mpRun(prevResult) {
      let onRun = this.$options.onRun;
      if (onRun && typeof onRun === 'function') {
        onRun.call(this, prevResult, async (currentResult) => {
          console.log('logic is run: ', this.$data.$mpComponentId, 'prevResult: ', prevResult, 'currentResult: ', currentResult);
          if (this.$data.$mpNext) {
            await this.call(this.$data.$mpNext, this.$data.$mpCurrentContext, currentResult);
          }
        });
      }
    }
  }
};
