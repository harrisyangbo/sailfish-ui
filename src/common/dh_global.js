const cache = {
  hasPermitHandler() {
    return true;
  }
};

export default {
  getItem(key) {
    return cache[key];
  },
  setItem(key, item) {
    cache[key] = item;
  }
};
