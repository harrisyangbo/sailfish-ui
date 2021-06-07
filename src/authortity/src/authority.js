import scriptEngine from '../../common/dh_eval';
import guid from '../../common/dh_guid';
import authMixin from '../../mixin/auth';
import TemplateAnalyzer from '@xes/fe-template-analyzer';

export function checkAuth(thisVueInstance = {}) {
  let { isRender, isShow } = innerCheckAuth(thisVueInstance);
  return isRender && isShow;
}

function innerCheckAuth(thisVueInstance = {}) {
  let showCondition = true;
  if (thisVueInstance.showCondition !== undefined && thisVueInstance.showCondition !== null && thisVueInstance.showCondition !== '') {
    showCondition = thisVueInstance.showCondition;
  }
  let authCode = thisVueInstance.authorityCode || '';
  let context = thisVueInstance.context || {};
  let hasPermit = thisVueInstance.$mpHasPermit || (() => true);

  let isShow = true;
  if (typeof showCondition === 'string') {
    let isTempArr = showCondition.match(/\{\{[\s\S]*\}\}/g);
    if (isTempArr && isTempArr.length > 0) {
      // 2.0.2版本新增: 对模板字符串进行处理
      let templateAnalyzer = new TemplateAnalyzer(showCondition, '{{', '}}');
      let templateAnalyzerRes = templateAnalyzer.result(context);
      isShow = typeof templateAnalyzerRes === 'boolean' ? templateAnalyzerRes : scriptEngine.runExpression(showCondition, thisVueInstance, context);
    } else {
      isShow = scriptEngine.runExpression(showCondition, thisVueInstance, context);
    }
  } else if (typeof showCondition === 'boolean') {
    isShow = showCondition;
  }
  let isHasPermit = true;
  if (authCode && hasPermit) {
    isHasPermit = hasPermit.call(thisVueInstance, authCode);
  }

  // 如果没有权限，则元素不会渲染出来；如果有权限但是条件判断不显示，则元素会渲染出来，但是display: none;
  return {
    isRender: isHasPermit,
    isShow,
    noRenderWhenNoShow: thisVueInstance.noRenderWhenNoShow
  };
}

export default {
  name: 'DhAuthorityItem',
  props: {
    authorityCode: {
      type: String,
      default: ''
    },
    showCondition: {
      type: [Boolean, String],
      default: true
    },
    noRenderWhenNoShow: {
      type: Boolean,
      default: false
    },
    context: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      $authUniqueId: ''
    };
  },
  mixins: [
    authMixin
  ],
  inject: {
    $authRegister: {
      default: () => () => {}
    },
    $authSyncStatus: {
      default: () => () => {}
    },
    $authUnRegister: {
      default: () => () => {}
    }
  },
  created() {
    this.$data.$authUniqueId = guid();
    this.$authRegister(this.$data.$authUniqueId);
  },
  destroyed() {
    this.$authUnRegister(this.$data.$authUniqueId);
  },
  render(createElement) {
    let status = innerCheckAuth(this);
    this.$authSyncStatus(this.$data.$authUniqueId, status);
    if (status.isRender) {
      if (status.isShow) {
        if (this.$slots.default.length > 1) {
          return createElement('div', null, this.$slots.default);
        } else {
          return this.$slots.default;
        }
      } else {
        if (status.noRenderWhenNoShow) {
          return null;
        } else {
          return createElement('div', {
            style: {
              display: 'none'
            }
          }, this.$slots.default);
        }
      }
    }
  }
};
