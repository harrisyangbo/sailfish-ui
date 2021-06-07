// 表单校验逻辑
import logicMixin from './logic_mixin';
import DhValidator from '../../utils/dhValidator';
import { getPropertyEndWith } from '../../common/dh_object_util';

export default {
  name: 'DhLogicValidate',
  props: {
    validateComponents: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  mixins: [
    logicMixin
  ],
  inject: {
    $mpRoot: {
      default: () => null
    }
  },
  onRun(prevResult, next) {
    if (this.validateComponents.length > 0) {
      let valideModel = {};
      // 找到所有需要校验的子组件，并生成校验器需要的数据模型
      this.validateComponents.forEach((comp)=> {
        // 由于componentId现在是全路径名称，这里需要尾匹配comp去查找;而且如果传递的是循环体的componentId，需要匹配出所有的数组
        let validateComponentStatus = getPropertyEndWith(this.$mpRoot.$data.$mpComponentStatus, comp);
        Object.keys(validateComponentStatus).forEach(key => {
          let vc = validateComponentStatus[key].$component;
          let value = vc.value;
          valideModel[key] = {};
          valideModel[key]['rules'] = vc.rules || []; // 校验规则
          valideModel[key]['callback'] = vc.validateCallback || new Function; // 校验失败的回调
          valideModel[key]['value'] = value || value === 0 ? value + '' : ''; // 要校验的值
          valideModel[key]['custom'] = vc.customValidate || null; // 自定义校验
        });
      });
      let dhValidator = new DhValidator(valideModel); // 校验器实例
      let valide = dhValidator.init().dhValidate();
      // 判断是否全部校验通过
      if (valide.every((item) => item === true)) {
        next();
      }
    }
  },
  render() {}
};
