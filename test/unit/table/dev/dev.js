import Vue from 'vue';
import App from './app.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { mockOptions } from '../testData';
import Init from '../../../../src/index';

Vue.use(ElementUI);
Vue.use(Init);


Vue.mixin({
  methods: {
    getOptions(optionsId) {
      return Promise.resolve(mockOptions[optionsId]);
    }
  }
});

new Vue(App).$mount('#app');
