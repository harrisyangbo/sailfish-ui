<template>
  <span
    class="table-item-time-span"
    :title="timeValue"
  >
    {{ timeValue }}
  </span>
</template>

<script>
import { Duration } from 'luxon';
export default {
  name: 'TableItemTimeSpan',
  props: {
    value: {
      type: Number,
      default: 0
    },
    field: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    timeValue() {
      if (!this.value) return '';
      return Duration.fromMillis(Number(this.value) * 1000).toFormat(this.field.format || 'h小时m分ss秒');
    }
  }
};
</script>