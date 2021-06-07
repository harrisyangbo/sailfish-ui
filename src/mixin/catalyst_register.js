/**
 * catalyst组件注册逻辑封装
 */
import baseMixin from './catalyst_component';

export default {
  mixins: [
    baseMixin
  ],
  inject: {
    $mpRegister: {
      default: () => () => {}
    },
    $mpSyncStatus: {
      default: () => () => {}
    },
    $mpUnRegister: {
      default: () => () => {}
    }
  },
  created() {
    this.$mpRegister(this.$data.$mpComponentId, {
      $ready: false,
      $component: this
    });
    this.$once('catalystReady', () => {
      this.$mpNoticeReady();
    });
  },
  beforeDestroy() {
    this.$mpUnRegister(this.$data.$mpComponentId);
    this.$off('catalystReady');
  },
  methods: {
    $mpNoticeReady() {
      this.$off('catalystReady');
      // 放在nextTick执行是因为要确保组件的双向绑定数据更新完毕之后，再通知父模版初始化完成
      this.$nextTick(() => {
        this.$mpSyncStatus(this.$data.$mpComponentId, {
          $ready: true
        });
      });
    }
  }
};
