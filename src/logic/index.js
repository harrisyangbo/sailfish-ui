import DhLogicAjax from './src/logic_ajax';
import DhLogicDialog from './src/logic_dialog';
import DhLogicDocker from './src/logic_docker';
import DhLogicJs from './src/logic_js';
import DhLogicPage from './src/logic_page';
import DhLogicConfirm from './src/logic_confirm';
import DhLogicCancel from './src/logic_cancel';
import DhLogicValidate from './src/logic_validate';

export { DhLogicAjax, DhLogicDialog, DhLogicDocker, DhLogicJs, DhLogicPage, DhLogicConfirm, DhLogicCancel, DhLogicValidate };

export default {
  install(Vue) {
    Vue.component(DhLogicAjax.name, DhLogicAjax);
    Vue.component(DhLogicDialog.name, DhLogicDialog);
    Vue.component(DhLogicDocker.name, DhLogicDocker);
    Vue.component(DhLogicJs.name, DhLogicJs);
    Vue.component(DhLogicPage.name, DhLogicPage);
    Vue.component(DhLogicConfirm.name, DhLogicConfirm);
    Vue.component(DhLogicCancel.name, DhLogicCancel);
    Vue.component(DhLogicValidate.name, DhLogicValidate);
  }
};
