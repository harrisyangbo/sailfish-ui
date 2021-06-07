<template>
  <span
    class="table-item-enum-text"
    :title="enumValue"
  >
    {{ enumValue }}
  </span>
</template>

<script>
import type from '../../utils/module_type/index';
export default {
  name: 'TableItemEnumText',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    field: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      enum: []
    };
  },
  computed: {
    enumValue() {
      if (!this.enum.length) return '';
      else {
        let result = this.enum.find(item => item.value === this.value);
        // if (!result) throw(new Error(`ERROR_NO_MATCHED_ENUM_VALUE: ${this.value}, ${Object.values(this.field)}`));
        if (!result) return '';
        else return result.label;
      }
    }
  },
  inject: {
    $mpGetOptions: {
      default: () => null
    }
  },
  mounted() {
    if (this.$mpGetOptions) {
      this.$mpGetOptions(this.field.optionsId).then(res => {
        if (type.getType(res) === type.EnumType.bArray) this.enum = res;
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
