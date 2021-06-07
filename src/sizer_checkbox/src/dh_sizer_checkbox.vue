<template>
  <div :class="['dh-sizer-checkbox', className]">
    <span
      class="label"
      :title="label"
      :style="{ width: labelWidth}"
      v-if="label !== ''"
    >
      {{ label }}
    </span>
    <span v-if="!readOnly">
      <el-checkbox-group
        class="catalyst-checkbox-group"
        v-model="checkboxVal"
        v-if="options.length > 0"
      >
        <el-checkbox
          v-for="item in options"
          :key="item.label"
          :label="item.value"
          :disabled="item.disabled || disabled"
        >
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
    </span>
    <span v-else>
      {{ readOnlyVal }}
    </span>
  </div>
</template>

<script>
import callPromisify from '../../common/dh_call';
import compMixin from '../../mixin/catalyst_register';

export default {
  name: 'DhSizerCheckbox',
  mixins: [
    compMixin
  ],
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    optionsId: {
      type: String,
      default: ''
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
    className: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: ''
    }
  },
  computed: {
    readOnlyVal: function () {
      if (this.readOnly && this.checkboxVal.length > 0) {
        let optionsLabelMap = {};
        this.options.forEach((item) => {
          optionsLabelMap[item.value + ''] = item.label;
        });
        let valArray = this.checkboxVal.map((item) => {
          return optionsLabelMap[item];
        });
        return valArray.join(',');
      } else {
        return '';
      }
    }
  },
  data() {
    return {
      options: [],
      checkboxVal: []
    };
  },
  inject: {
    $mpGetOptions: {
      default: () => null
    }
  },
  methods: {
    getOpt() {
      if (this.$mpGetOptions) {
        callPromisify(this.$mpGetOptions)(this.optionsId).then((val) => {
          this.options = val || [];
          this.$mpNoticeReady();
        });
      }
    }
  },
  mounted() {
    this.checkboxVal = this.value || [];
    this.getOpt();
  },
  watch: {
    value(newVal) {
      this.checkboxVal = newVal || [];
    },
    checkboxVal: function (val) {
      this.$emit('input', val);
    }
  }
};
</script>

<style scoped>
.dh-sizer-checkbox{
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
.catalyst-checkbox-group {
  line-height: 1;
}
</style>
