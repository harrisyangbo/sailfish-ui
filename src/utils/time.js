export default {
  getUtcTime: function (dateVal) {
    // Date转utc毫秒
    if (!(dateVal instanceof Date)) {
      return dateVal;
    } else {
      const year = dateVal.getUTCFullYear();
      const mounth = dateVal.getUTCMonth();
      const day = dateVal.getUTCDate();
      const hour = dateVal.getUTCHours();
      const minute = dateVal.getUTCMinutes();
      const seconds = dateVal.getUTCSeconds();
      return Date.UTC(year, mounth, day, hour, minute, seconds);
    }
  },
  utcToDate: function (utctime) {
    // utc毫秒转Date
    if (utctime instanceof Date) {
      return utctime;
    } else {
      return new Date(utctime);
    }
  },
  formDate: function (stamp, dateSplit='-', timeSplit=':') {
    /**
     * stamp: 时间戳(毫秒) 
     * dateSplit: 日期分隔符 默认yy-mm-dd
     * timeSplit: 时间分隔符 默认00:00:00
     * **/
    if (stamp && typeof stamp === 'number') {
      const dateObj = this.utcToDate(stamp);
      const year = dateObj.getFullYear();
      const mounth = dateObj.getMonth() + 1;
      const day = dateObj.getDate();
      const hour = dateObj.getHours();
      const minute = dateObj.getMinutes();
      const seconds = dateObj.getSeconds();
      return `${year}${dateSplit}${this.numberFormat(mounth)}${dateSplit}${this.numberFormat(day)} ${this.numberFormat(hour)}${timeSplit}${this.numberFormat(minute)}${timeSplit}${this.numberFormat(seconds)}`;
    } else {
      throw new Error('formDate error: 时间戳参数格式错误!');
    }
  },
  numberFormat(num) {
    // 日期数字格式转换
    if (num >= 10) {
      return num;
    } else {
      return `0${num}`;
    }
  }
};