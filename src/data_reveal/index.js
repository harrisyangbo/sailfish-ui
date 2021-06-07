import DataReveal from './src/data_reveal';

DataReveal.install = function (Vue) {
  Vue.component(DataReveal.name, DataReveal);
};

export default DataReveal;