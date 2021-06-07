import logicMixin from './logic_mixin';
import typer from '../../utils/module_type/index';
import callPromisify from '../../common/dh_call';
import { getProperty, setProperty } from '../../common/dh_object_util';

function assignProperty(sourceObject, sourceProperty, targetObject, targetProperty) {
  setProperty(targetObject, targetProperty, getProperty(sourceObject, sourceProperty));
}

export default {
  name: 'DhLogicAjax',
  mixins: [
    logicMixin
  ],
  props: {
    method: {
      type: String,
      default: 'get'
    },
    uri: {
      type: String,
      default: ''
    },
    target: {
      type: [String, Array, Object],
      default: () => null
    }
  },
  computed: {
    targetProperties() {
      // 整理数据绑定的字段对应关系，为了ajax请求回来的数据做一一绑定
      let binds = {};
      let typeOfTarget = typer.getType(this.target);
      if (typeOfTarget === typer.EnumType.bString) {
        binds[this.target] = this.target;
      } else if (typeOfTarget === typer.EnumType.bArray) {
        this.target.forEach(p => {
          binds[p] = p;
        });
      } else if (typeOfTarget === typer.EnumType.bObject) {
        binds = this.target;
      }
      return binds;
    }
  },
  inject: {
    $mpDoAjaxAction: {
      default: () => null
    }
  },
  onRun(prevResult, next) {
    this.run(prevResult).then(result => {
      return next(result);
    });
  },
  methods: {
    async run(prevResult) {
      if (this.$mpDoAjaxAction) {
        let result = await callPromisify(this.$mpDoAjaxAction)(this.uri, this.method, prevResult);
        // TODO: 此处目前要求result必须是对象，后续需要兼容其它数据类型的场景
        // 数据字段按照配置进行赋值
        for (let p in this.targetProperties) {
          assignProperty(result, this.targetProperties[p], this.$data.$mpCurrentContext, `$dataModel.${p}`);
        }
        return result;
      } else {
        throw new Error('没有注入异步请求ajax的处理方法');
      }
    }
  },
  render() {}
};
