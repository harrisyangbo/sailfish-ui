<template>
  <div :class="['dh-sizer-textarea', className]">
    <span
      :class="['label', required ? 'dh-required' : '' ]"
      :title="label"
      :style="{ width: labelWidth}"
      v-if="label !== ''"
    >{{ label }}</span>
    <span :style="{ position: 'relative', 'flex-grow': flexGrow }">
      <el-input
        type="textarea"
        :class="{'dh-input-error': validateError}"
        :placeholder="placeholder"
        :value="value"
        @blur="inputBlur"
        @focus="inputFocus"
        @input="handleInput"
        :maxlength="maxlength"
        :minlength="minlength"
        :autosize="autosize"
        :rows="rows"
        :show-word-limit="showWordLimit"
      />
      <span
        class="verify-tip"
        v-if="validateError"
      >{{ validateMsg }}</span>
    </span>
  </div>
</template>

<script>
import compMixin from '../../mixin/catalyst_register';
import DhValidator from '../../utils/dhValidator';
export default {
  name: 'DhSizerTextarea',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: null
    },
    minlength: {
      type: Number,
      default: null
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    rows: { // 行数
      type: Number,
      default: 2
    },
    rules: {
      type: Array,
      default: () => {
        return [];
      }
    },
    className: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: ''
    },
    flexGrow: {
      type: Number,
      default: 0
    }
  },
  mixins: [
    compMixin
  ],
  data() {
    return {
      validateError: false,
      validateMsg: '',
      inputBlurRules: [],
      required: false
    };
  },
  methods: {
    handleInput(val) {
      this.$emit('input', val);
    },
    validateCallback(error, message) {
      if (error) {
        this.validateError = true;
        this.validateMsg = message;
      }
    },
    inputBlur() {
      if (this.inputBlurRules.length > 0) {
        let model = {};
        model[this.$data.$mpComponentId] = {
          rules: this.inputBlurRules,
          callback: this.validateCallback,
          value: this.value
        };
        let dhValidator = new DhValidator(model);
        dhValidator.init().dhValidate();
      }
    },
    inputFocus() {
      this.validateError = false;
      this.validateMsg = '';
    }
  },
  mounted() {
    this.inputBlurRules = this.rules.filter((rule) => {
      if (rule.required) {
        this.required = true;
      }
      return rule.trigger === 'blur';
    });
    this.$mpNoticeReady();
  }
};
</script>

<style scoped>
.dh-sizer-textarea{
  display: flex;
  align-items:center;
}
.dh-required:before {
  content: "*";
  color: red;
  margin-right: 4px;
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
.verify-tip{
  color: red;
  font-size: 12px;
  position: absolute;
  left: 0px;
  height: 15px;
  line-height: 15px;
  bottom: -15px;
}
.dh-input-error >>> .el-textarea__inner {
  border-color: red;
}
</style>
