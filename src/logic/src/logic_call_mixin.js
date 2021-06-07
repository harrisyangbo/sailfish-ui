import { getPropertyEndWith } from '../../common/dh_object_util';

export default {
  inject: {
    $mpRoot: {
      default: () => null
    }
  },
  methods: {
    async call(logicId, context, params) {
      if (!logicId) {
        return;
      }
      if (!this.$mpRoot) {
        throw new Error(`逻辑组件${this.$data.$mpComponentId}没有注册到catalyst模版实例`);
      }
      let logicComponentStatus = getPropertyEndWith(this.$mpRoot.$data.$mpComponentStatus, logicId);
      let logicRunResults = Object.values(logicComponentStatus);
      if (logicRunResults.length > 0) {
        // 如果获取到的同名逻辑组件有多个，也只执行第一个逻辑组件
        let logic = logicRunResults[0].$component;
        logic.$data.$mpCurrentContext = context; // 动态传递执行上下文
        await logic.$mpRun(params);
      } else {
        throw new Error(`找不到逻辑组件${logicId}`);
      }
    }
  }
};
