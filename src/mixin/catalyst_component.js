/**
 * catalyst表单组件、数据容器组件、操作组件以及数据字段中的交互字段的公用逻辑
 */
import guid from '../common/dh_guid';

export default {
  props: {
    componentId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      $mpComponentId: ''
    };
  },
  created() {
    this.$data.$mpComponentId = this.componentId || guid();
  }
};
