import DhTable from './table';
import {addTableFields} from './fields';

DhTable.install = function (Vue) {
  Vue.component(DhTable.name, DhTable);
};

DhTable.addTableFields = addTableFields;

export default DhTable;