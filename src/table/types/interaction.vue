<template>
  <span class="table-item-interaction">
    <dh-interaction
      v-bind="interactionProps"
      :render-link-button="true"
    />
  </span>
</template>

<script>
import bus from '../event_bus';
export default {
  name: 'TableItemInteraction',
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
    },
    row: {
      type: Object,
      default() {
        return {};
      }
    },
    rowIndex: {
      type: Number,
      default: 0
    },
    context: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    interactionProps() {
      return {
        label: this.row[this.field.keyName] || '',
        ...this.field,
        context: this.context
      };
    }
  },
  methods: {
  }
};
</script>
