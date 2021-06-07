import logicMixin from './logic_mixin';
import urlHelper from '../../utils/module_url/index';

export default {
  name: 'DhLogicPage',
  mixins: [
    logicMixin
  ],
  props: {
    uri: {
      type: String,
      default: ''
    }
  },
  onRun(prevResult, next) {
    let url = this.uri;
    if (prevResult) {
      url = urlHelper.addParameter(prevResult, url);
    }
    window.open(url);
    next();
  },
  render() {}
};
