function checkAuth(authItems = []) {
  if (authItems.length === 0) {
    return {
      isRender: true,
      isShow: true
    };
  }
  let renders = authItems.filter(m => m.isRender);
  if (renders.length > 0) {
    let shows = renders.filter(m => m.isShow);
    if (shows.length > 0) {
      return {
        isRender: true,
        isShow: true
      };
    } else {
      return {
        isRender: true,
        isShow: false
      };
    }
  } else {
    return {
      isRender: false,
      isShow: false
    };
  }
}

export default {
  name: 'DhAuthorityContainer',
  data() {
    return {
      $authItems: {}
    };
  },
  provide() {
    return {
      $authRegister: this.register,
      $authSyncStatus: this.syncStatus,
      $authUnRegister: this.unRegister
    };
  },
  methods: {
    register(id) {
      this.$data.$authItems[id] = {
        isRender: true,
        isShow: true
      };
    },
    syncStatus(id, status) {
      this.$data.$authItems[id] = status;
    },
    unRegister(id) {
      delete this.$data.$authItems[id];
    }
  },
  render(createElement) {
    let values = Object.values(this.$data.$authItems);
    let { isRender, isShow } = checkAuth(values);
    if (isRender) {
      if (isShow) {
        if (this.$slots.default.length > 1) {
          return createElement('div', {
            style: {
              display: 'inherit'
            }
          }, this.$slots.default);
        } else {
          return this.$slots.default;
        }
      } else {
        return createElement('div', {
          style: {
            display: 'none'
          }
        }, this.$slots.default);
      }
    }
  }
};
