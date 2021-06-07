import DhSizerInput from './sizer_input/index';
import DhSizerDropdown from './sizer_dropdown/index';
import DhSizerKeyword from './sizer_keyword/index';
import DhSizerDate from './sizer_date/index';
import DhSizerTime from './sizer_time/index';
import DhSizerCheckbox from './sizer_checkbox/index';
import DhSizerRadio from './sizer_radio/index';
import DhSizerSwitch from './sizer_switch/index';
import DhSizerTextarea from './sizer_textarea/index';
import DhTable from './table/index';
import { DhInteraction, DhInteractionLogic } from './interaction/index';
import { DhAuthorityContainer, DhAuthorityItem } from './authortity/index';
import { DhLogicAjax, DhLogicDialog, DhLogicDocker, DhLogicJs, DhLogicPage, DhLogicConfirm, DhLogicCancel, DhLogicValidate } from './logic/index';
import DhCommonTable from './common_table/index';
import DhDrawer from './drawer/index';
import DhBlock from './block/index';
import DhRow from './dh_row/index';
import DhCol from './dh_col/index';
import DhHidden from './hidden/index';
import DataReveal from './data_reveal/index';

import ClCol from './grid_col/index';

import { getProperty, setProperty } from './common/dh_object_util';

import validator from './validator/index';
import typer from './utils/module_type/index';
import { inputTypes, logicTypes } from './validator/const';

import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';

import global from './common/dh_global';

import inputMixin from './mixin/catalyst_register';
import logicMixin from './logic/src/logic_mixin';

import ElementUI from 'element-ui';

const typeComponents = {
  'text': DhSizerInput,
  'dropdown': DhSizerDropdown,
  'keyword': DhSizerKeyword,
  'time': DhSizerTime,
  'calendar': DhSizerDate,
  'checkbox': DhSizerCheckbox,
  'radio': DhSizerRadio,
  'switch': DhSizerSwitch,
  'hidden': DhHidden,
  'block': DhBlock,
  'table': DhTable,
  'interaction': DhInteractionLogic,
  'page': DhLogicPage,
  'ajax': DhLogicAjax,
  'dialog': DhLogicDialog,
  'docker': DhLogicDocker,
  'js': DhLogicJs,
  'confirm': DhLogicConfirm,
  'cancel': DhLogicCancel,
  'row': DhRow,
  'col': DhCol,
  'textarea': DhSizerTextarea,
  'validate': DhLogicValidate,
  'reveal': DataReveal
};

let components = Object.values(typeComponents);
components.push(DhDrawer);
components.push(DhInteraction);
components.push(DhAuthorityContainer);
components.push(DhAuthorityItem);
components.push(ClCol);
let _vue = null; // 缓存vue
function registerCustomComponent(Vue, kind, name, options) {
  let mixin = null;
  let typeList = null;
  Vue = Vue || _vue; // 使用缓存的vue
  if (kind === 'input') {
    mixin = inputMixin;
    typeList = inputTypes;
  } else if (kind === 'logic') {
    mixin = logicMixin;
    typeList = logicTypes;
  }
  if (kind === 'input' || kind === 'logic') {
    if (typeComponents[name]) {
      throw new Error(`已经存在同名组件${name}`);
    }
    // 动态混入通用字段
    options.mixins = options.mixins || [];
    options.mixins.push(mixin);

    // 校验是否存在template或者render函数，不存在补全一个空的render函数
    if (!options.template && !options.render) {
      options.render = function () {};
    }

    // 注册组件到Vue框架
    Vue.component(name, options);
    // 注册组件名称到catalyst
    typeComponents[name] = options;
    typeList.push(name);
  }
}

export default {
  install(Vue, {
    hasPermit = () => true,
    formInputComponents = {},
    tableFieldComponents = {},
    logicComponents = {}
  } = {}) {
    global.setItem('hasPermitHandler', hasPermit);
    _vue = Vue; // 缓存vue
    Object.keys(formInputComponents).forEach(key => {
      registerCustomComponent(Vue, 'input', key, formInputComponents[key]);
    });
    Object.keys(logicComponents).forEach(key => {
      registerCustomComponent(Vue, 'logic', key, logicComponents[key]);
    });
    DhTable.addTableFields(tableFieldComponents);

    Vue.use(ElementUI);
    Vue.use(DhCommonTable);
    Vue.use(Viewer);
    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  }
};

export { typeComponents, getProperty, setProperty, validator, registerCustomComponent, typer };
export * from './validator/judge';
export { default as configSchema } from './validator/schema/index';
