import scriptEngine from '../../common/dh_eval';
import logicMixin from './logic_mixin';
import typer from '../../utils/module_type/index';

export default {
  name: 'DhLogicJs',
  mixins: [
    logicMixin
  ],
  props: {
    script: {
      type: String,
      default: ''
    }
  },
  onRun(prevResult, next) {
    if (!typer.isNullOrUndefined(this.script) && !typer.isStringEmpty(this.script)) {
      // 定义script中的函数代码执行结果的回调函数，不管script中的函数是同步执行还是异步执行，确保resultCallback只执行一次
      let isRun = false;
      const resultCallback = result => {
        if (isRun) {
          return;
        }
        isRun = true;
        result = result || {};
        this.$mpUpdateNext(result.next);
        next(result.params);
      };

      let result = scriptEngine.runFunctionWithoutSandbox(this.script, this, this.$data.$mpCurrentContext, prevResult, resultCallback);
      if (!typer.isNullOrUndefined(result)) {
        resultCallback(result);
      }
    }
  },
  render() {}
};
