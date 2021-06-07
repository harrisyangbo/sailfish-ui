<template>
  <span class="table-item-enum-icon">
    <img
      v-if="!!enumValue"
      class="icon"
      :style="iconStyle"
      :src="enumValue"
      :alt="value"
    >
  </span>
</template>

<script>
import type from '../../utils/module_type/index';
export default {
  name: 'TableItemEnumIcon',
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
    },
    iconStyle() {
      let result = {};
      if (this.field.height) {
        result.height = String(this.field.height);
        result.height += isNaN(Number(this.field.height)) ? '' : 'px';
      }
      if (this.field.width) {
        result.width = String(this.field.width);
        result.width += isNaN(Number(this.field.width)) ? '' : 'px';
      }
      return result;
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
.table-item-enum-icon {
  .icon {
    width: 18px;
  }
}
</style>
