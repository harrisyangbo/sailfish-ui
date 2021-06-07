import DhAuthorityItem, { checkAuth } from './src/authority';
import DhAuthorityContainer from './src/container';

export { DhAuthorityContainer, DhAuthorityItem, checkAuth };

export default {
  install(Vue) {
    Vue.component(DhAuthorityItem.name, DhAuthorityItem);
    Vue.component(DhAuthorityContainer.name, DhAuthorityContainer);
  }
};
