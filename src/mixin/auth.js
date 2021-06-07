import global from '../common/dh_global';

export default {
  methods: {
    $mpHasPermit(...params) {
      return global.getItem('hasPermitHandler')(...params);
    }
  }
};
