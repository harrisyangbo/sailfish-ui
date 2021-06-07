<template>
  <div :class="['dh-sizer-date', className]">
    <span
      class="label"
      :title="label"
      :style="{ width: labelWidth}"
      v-if="label !== ''"
    >{{ label }}</span>
    <span v-if="!readOnly">
      <el-date-picker
        v-model="dataValue"
        @change="handleChange"
        :type="mode"
        :disabled="disabled"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        placeholder="选择日期"
        :default-time="defaultTimeFormat"
      />
    </span>
    <span v-else>
      {{ readOnlyVal }}
    </span>
  </div>
</template>
<script>
import compMixin from '../../mixin/catalyst_register';
// 时间格式处理方法
import timeUtils from '../../utils/time';
export default {
  name: 'DhSizerDate',
  mixins: [
    compMixin
  ],
  props: {
    value: {
      type: [Date, Array, Number],
      default: () => {
        return null;
      }
    },
    mode: {
      type: String,
      default: 'date'
    },
    label: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dateSplit: {
      type: String,
      default: '-'
    },
    timeSplit: {
      type: String,
      default: ':'
    },
    className: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: ''
    },
    defaultTimeFormat: {
      type: Array,
      default: () => {
        return ['00:00:00', '23:59:59'];
      }
    }
  },
  computed: {
    readOnlyVal: function () {
      if (this.readOnly) {
        // 只读模式展示的时间字符串
        return Array.isArray(this.value) ? this.datePickerValTranstion(this.value) : this.dateValTranstion(this.value);
      } else {
        return '';
      }
    }
  },
  data() {
    return {
      dataValue: null,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const date = new Date();
            const start = Math.floor(date.setHours(0) / 3600000) * 3600000;
            const end = Math.ceil(date.setHours(23) / 3600000) * 3600000 - 1;
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            const getStartOfDay = new Date(date.getTime() - 3600000 * 24 * 1);
            const start = Math.floor(getStartOfDay.setHours(0) / 3600000) * 3600000;
            const end = Math.ceil(date.setHours(23) / 3600000) * 3600000 - 24 * 3600000 - 1;
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一周',
          onClick(picker) {
            const date = new Date();
            const getStartOfDay = day => Math.floor(day.setHours(0) / 3600000) * 3600000;
            const start = getStartOfDay(new Date(date.getTime() - 3600000 * 24 * 7));
            const end = Math.ceil(date.setHours(23) / 3600000) * 3600000 - 24 * 3600000 - 1;
            // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const date = new Date();
            const getStartOfDay = day => Math.floor(day.setHours(0) / 3600000) * 3600000;
            const start = getStartOfDay(new Date(date.getTime() - 3600000 * 24 * 30));
            const end = Math.ceil(date.setHours(23) / 3600000) * 3600000 - 24 * 3600000 - 1;
            // start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const date = new Date();
            const getStartOfDay = day => Math.floor(day.setHours(0) / 3600000) * 3600000;
            const start = getStartOfDay(new Date(date.getTime() - 3600000 * 24 * 90));
            const end = Math.ceil(date.setHours(23) / 3600000) * 3600000 - 24 * 3600000 - 1;
            // start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    };
  },
  methods: {
    handleChange(val) {
      // 日历联动模式需要返回数组，非联动模式返回null
      let utcTime = (this.mode === 'date' || this.mode === 'datetime')? null : [];
      if (Array.isArray(val)) {
        utcTime = val.length > 0 ? val.map((item) => {
          return timeUtils.getUtcTime(item);
        }) : [];
      } else if(val && val instanceof Date) {
        utcTime = timeUtils.getUtcTime(val);
      }
      this.$emit('input', utcTime);
    },
    datePickerValTranstion(date) {
      // 联动日历，值为数组
      let formats = date.map((item) => {
        if (typeof item === 'number') {
          return timeUtils.formDate(item, this.dateSplit, this.timeSplit);
        } else {
          return item;
        }
      });
      return formats.join(' 至 ');
    },
    dateValTranstion(date) {
      // 非联动日历, 值为单独的date对象
      return timeUtils.formDate(date, this.dateSplit, this.timeSplit);
    }
  },
  mounted() {
    this.dataValue = this.value;
    this.$mpNoticeReady();
  },
  watch: {
    value: {
      handler: function (val) {
        if (Array.isArray(val) && val.length > 0 ) {
          this.dataValue = val.map((item) => {
            if (item === null || item === undefined) {
              return '';
            } else {
              return item instanceof Date ? item : timeUtils.utcToDate(item);
            }
          });
        } else if (val && typeof val === 'number') {
          this.dataValue = timeUtils.utcToDate(val);
        } else {
          return val;
        }
      }
    }
  }
};
</script>
<style scoped>
.dh-sizer-date{
  display: flex;
  align-items:center;
}
.label{
  font-size: 14px;
  margin-right: 8px;
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: right;
}
</style>
