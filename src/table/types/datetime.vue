<template>
  <span
    class="table-item-datetime"
    :title="timeValue"
  >
    {{ timeValue }}
  </span>
</template>

<script>
import { DateTime } from 'luxon';
export default {
  name: 'TableItemDatetime',
  props: {
    value: {
      type: [String, Number],
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
      return DateTime.fromSeconds(this.value).toFormat(this.field.format || 'yyyy-MM-dd HH:mm:ss');
    }
  }
};
</script>