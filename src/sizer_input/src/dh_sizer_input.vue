<template>
  <div :class="['dh-sizer-input', className]">
    <span
      :class="['label', required ? 'dh-required' : '' ]"
      :title="label"
      :style="{ width: labelWidth}"
      v-if="label !== ''"
    >{{ label }}</span>
    <span
      v-if="!readOnly && mode === 'normal'"
      :style="{ position: 'relative', 'flex-grow': flexGrow }"
    >
      <el-input
        v-if="uri === ''"
        :class="{'dh-input-error': validateError}"
        :placeholder="extension.placeholder || placeholder"
        :clearable="clearable"
        :value="value"
        @input="handleInput"
        @blur="inputBlur"
        @focus="inputFocus"
        :disabled="disabled"
      />
      <el-autocomplete
        v-else
        :value="value"
        @input="handleInput"
        @blur="inputBlur"
        @focus="inputFocus"
        :disabled="disabled"
        :fetch-suggestions="querySearchAsync"
        :placeholder="extension.placeholder || placeholder"
      />
      <span
        class="verify-tip"
        v-if="validateError"
      >{{ validateMsg }}</span>
    </span>
    <span 
      v-if="!readOnly && mode === 'compound'"
      style="position: relative;"
      :style="{ position: 'relative', 'flex-grow': flexGrow }"
    >
      <el-input
        v-if="uri === ''"
        :class="{'dh-input-error': validateError}"
        :placeholder="extension.placeholder || placeholder"
        :clearable="clearable"
        :value="value"
        @input="handleInput"
        @blur="inputBlur"
        @focus="inputFocus"
        :disabled="disabled"
      >
        <template :slot="compoundExpands.slot">{{ compoundExpands.content }}</template>
      </el-input>
      <span
        class="verify-tip"
        v-if="validateError"
      >{{ validateMsg }}</span>
    </span>
    <span v-if="readOnly === true && mode === 'normal'">
      {{ value }}
    </span>
    <span v-if="readOnly === true && mode === 'compound'">
      {{ value + ' ' + compoundExpands.content }}
    </span>
  </div>
</template>
<script>
import compMixin from '../../mixin/catalyst_register';
import DhValidator from '../../utils/dhValidator';

export default {
  name: 'DhSizerInput',
  mixins: [
    compMixin
  ],
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    uri: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    rules: {
      type: Array,
      default: () => {
        return [];
      }
    },
    extension: {
      type: Object,
      default: () => {
        return {};
      }
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 输入框模式: normal 普通型  compound 复合型
    mode: {
      type: String,
      default: 'normal'
    },
    // 复合型输入框扩展
    compoundExpands: {
      type: Object,
      default: () => {
        return {
          slot: 'append',
          content: ''
        };
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
  data() {
    return {
      validateError: false, // 校验是否错误
      validateMsg: '', // 校验错误信息
      inputVal: '', // 输入框组件的value
      inputBlurRules: [], // 失去焦点时的校验规则
      required: false // 是否为必填字段
    };
  },
  methods: {
    handleInput(val) {
      this.$emit('input', val);
    },
    querySearchAsync(queryString, cb) {
      try {
        if (this.uri) {
          this.$emit('querySearch', {
            uri: this.uri,
            inputContent: queryString,
            returnMatchResult: cb
          });
        }
      } catch(err) {
        throw new Error(err);
      }
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
.dh-sizer-input{
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
.dh-required:before {
  content: "*";
  color: red;
  margin-right: 4px;
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
.dh-input-error >>> .el-input__inner {
  border-color: red;
}
</style>
