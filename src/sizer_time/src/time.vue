<template>
  <div :class="['dh-sizer-time', className]">
    <span
      class="label"
      :title="label"
      :style="{ width: labelWidth}"
      v-if="label !== ''"
    >{{ label }}</span>
    <fixed-time
      v-if="timeType.includes('fixed')"
      :time-type="timeType"
      :fixed-time-options="fixedTimeOptions"
      :disabled="disabled"
      :read-only="readOnly"
      @timeChange="handleChange"
    />
    <random-time
      v-if="timeType.includes('random')"
      :time-type="timeType"
      :disabled="disabled"
      :read-only="readOnly"
      @timeChange="handleChange"
    />
  </div>
</template>

<script>
import FixedTime from './fixed_time';
import RandomTime from './random_time';
import compMixin from '../../mixin/catalyst_register';

export default {
  name: 'DhSizerTime',
  mixins: [
    compMixin
  ],
  props: {
    value: {
      type: [Object, Date],
      default: () => {
        return {};
      }
    },
    // fixedTime: 固定时间点 fixedRange: 固定时间范围
    // randomTime: 任意时间点 randomRange: 任意时间范围
    timeType: {
      type: String,
      default: 'fixedTime'
    },
    fixedTimeOptions: {
      type: Object,
      default: () => {
        return {
          start: '00:00',
          step: '00:15',
          end: '11:59'
        };
      }
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: ''
    }
  },
  components: {
    FixedTime,
    RandomTime
  },
  methods: {
    handleChange(val) {
      this.$emit('input', val);
    }
  },
  mounted() {
    this.$mpNoticeReady();
  }
};
</script>

<style scoped>
.dh-sizer-time {
  display: flex;
  align-items: center;
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
