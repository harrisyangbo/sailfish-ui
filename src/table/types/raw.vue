<template>
  <span
    class="table-item-raw"
    :title="value"
  >
    {{ value }}
  </span>
</template>

<script>
export default {
  name: 'TableItemRaw',
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
  }
};
</script>
