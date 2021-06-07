import interactionComponent from './interaction.vue';
import compMixin from '../../mixin/catalyst_component';
import logicCallMixin from '../../logic/src/logic_call_mixin';

export default {
  name: 'DhInteractionLogic',
  mixins: [
    compMixin,
    logicCallMixin
  ],
  inject: {
    $mpRegisterLoadPromise: {
      default: () => () => {}
    },
    $mpSyncLoadPromise: {
      default: () => () => {}
    },
    $mpUnRegisterLoadPromise: {
      default: () => () => {}
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    trigger: {
      type: Object,
      default: () => {
        return {
          button: true
        };
      }
    },
    main: {
      type: Boolean,
      default: false
    },
    logic: {
      type: String,
      default: ''
    },
    params: {
      type: Object,
      default: () => null
    },
    context: {
      type: Object,
      default: () => ({})
    },
    actionName: {
      type: String,
      default: ''
    },
    actionArgs: {
      type: Object,
      default: () => ({})
    },
    renderLinkButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    needExecuteOnLoad() {
      if (this.trigger) {
        return !!this.trigger.load;
      } else {
        return false;
      }
    },
    needExecuteOnUnload() {
      if (this.trigger) {
        return !!this.trigger.unload;
      } else {
        return false;
      }
    },
    needExecuteOnClickButton() {
      if (this.trigger) {
        return !!this.trigger.button;
      } else {
        return false;
      }
    },
    watchDataFields() {
      if (this.trigger && this.trigger.watch instanceof Array && this.trigger.watch.length > 0) {
        return this.trigger.watch;
      } else {
        return [];
      }
    }
  },
  data() {
    return {
      $mpUnwatches: []
    };
  },
  render(createElement) {
    if (this.needExecuteOnClickButton) {
      return createElement(interactionComponent, {
        props: this.$props
      });
    } else {
      return null;
    }
  },
  created() {
    if (this.needExecuteOnLoad && !this.$mpRoot.$data.$mpPageLoadTriggered) {
      this.$mpRegisterLoadPromise(this.$data.$mpComponentId);
    }
    if (this.$mpRoot.$data.$mpPageLoadTriggered) {
      // 如果已经触发了catalystPageLoad事件，则需要手动绑定监听字段变化的处理器
      this.bindWatchCallback();
    } else {
      // 监听catalystPageLoad事件，一次性。事件参数是触发事件的页面vue实例
      this.$mpRoot.$once('catalystPageLoad', this.handleCatalystPageLoad);
    }
    this.$mpRoot.$once('catalystBeforePageUnload', this.handleCatalystBeforePageUnload);
  },
  beforeDestroy() {
    if (this.needExecuteOnLoad && !this.$mpRoot.$data.$mpPageLoadTriggered) {
      this.$mpUnRegisterLoadPromise(this.$data.$mpComponentId);
    }
    this.$data.$mpUnwatches.forEach(unwatch => {
      unwatch();
    });
    this.$mpRoot.$off('catalystPageLoad', this.handleCatalystPageLoad);
    this.$mpRoot.$off('catalystBeforePageUnload', this.handleCatalystBeforePageUnload);
  },
  methods: {
    handleCatalystPageLoad() {
      // 如果交互逻辑的触发时机包含页面加载的场景，需要在加载时执行交互逻辑
      if (this.needExecuteOnLoad) {
        console.log('execute logic:', this.logic, 'in catalystPageLoad');
        let pro = this.call(this.logic, this.context, this.params ? this.params : undefined);
        this.$mpSyncLoadPromise(this.$data.$mpComponentId, pro);
      }
      // TODO: 如果onload处理还没有完成，则此时load处理中赋值的操作可能会触发watch处理
      this.bindWatchCallback();
    },
    bindWatchCallback() {
      // 如果交互逻辑的触发时机包含数据监听的场景，需要动态为数据字段追加监听器
      if (this.watchDataFields.length > 0) {
        const that = this;
        this.watchDataFields.forEach(p => {
          this.$data.$mpUnwatches.push(this.$mpRoot.$watch(`dataModel.${p}`, function () {
            console.log('execute logic:', that.logic, `after dataModel.${p} to be changed`);
            that.call(that.logic, that.context, that.params ? that.params : undefined);
          }, {
            deep: true
          }));
        });
      }
    },
    handleCatalystBeforePageUnload() {
      // 如果交互逻辑的触发时机包含页面卸载的场景，需要在卸载之前执行交互逻辑
      if (this.needExecuteOnUnload) {
        console.log('execute logic:', this.logic, 'in catalystBeforePageUnload');
        this.call(this.logic, this.context, this.params ? this.params : undefined);
      }
    }
  }
};
