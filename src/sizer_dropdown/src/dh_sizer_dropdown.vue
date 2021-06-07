<template>
  <div :class="['dh-sizer-dropdown', className]">
    <span
      :class="['label', required ? 'dh-required' : '' ]"
      :title="label"
      :style="{ width: labelWidth}"
      v-if="label !== ''"
    >{{ label }}</span>
    <span
      v-if="!readOnly"
      :style="{ position: 'relative', 'flex-grow': flexGrow }"
    >
      <el-select
        :value="dropdownVal"
        :class="[validateError ? 'dh-input-error': '', flexGrow !== 0 ? 'select-flex-grow': '']"
        @change="handleChange"
        @visible-change="visibleChange"
        :placeholder="placeholder"
        :multiple="multiple"
        :filterable="filterable"
        :clearable="clearable"
        :collapse-tags="collapseTags"
        :disabled="disabled"
        :popper-append-to-body="popperAppendToBody"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <span
        class="verify-tip"
        v-if="validateError"
      >{{ validateMsg }}</span>
    </span>
    <span v-else>
      {{ readOnlyVal }}
    </span>
  </div>
</template>

<script>
import callPromisify from '../../common/dh_call';
import compMixin from '../../mixin/catalyst_register';
import DhValidator from '../../utils/dhValidator';

export default {
  name: 'DhSizerDropdown',
  mixins: [
    compMixin
  ],
  props: {
    value: {
      type: [String, Array, Number],
      default: () => {
        return null;
      }
    },
    label: {
      type: String,
      default: ''
    },
    optionsId: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: () => {
        return [];
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
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
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    readOnlyVal: function () {
      if(this.readOnly && this.value !== '') {
        let optionsLabelMap = {};
        this.options.forEach((item) => {
          optionsLabelMap[item.value + ''] = item.label;
        });
        return optionsLabelMap[this.value] || '';
      } else {
        return '';
      }
    }
  },
  data() {
    return {
      options: [],
      validateError: false, // 校验是否错误
      validateMsg: '', // 校验错误信息
      inputBlurRules: [], // 失去焦点时的校验规则
      required: false, // 是否为必填字段
      dropdownVal: ''
    };
  },
  inject: {
    $mpGetOptions: {
      default: () => null
    }
  },
  methods: {
    handleChange(val) {
      this.$emit('input', val);
    },
    getOpt() {
      if (this.$mpGetOptions) {
        callPromisify(this.$mpGetOptions)(this.optionsId).then((val) => {
          val && val.forEach((item) => {
            this.options.push(item);
          });
          if (!this.multiple) {
            let validateVal = this.options.find(item => item.value === this.value);
            this.dropdownVal = validateVal ? this.value : '';
            // this.$emit('input', defaultVal);
          }
          this.$mpNoticeReady();
        });
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
          value: this.value || this.value === 0 ? this.value + '' : ''
        };
        let dhValidator = new DhValidator(model);
        dhValidator.init().dhValidate();
      }
    },
    visibleChange(type) {
      if (type) {
        this.validateError = false;
        this.validateMsg = '';
      } else {
        this.inputBlur();
      }
    }
  },
  mounted() {
    this.inputBlurRules = this.rules.filter((rule) => {
      if (rule.required) {
        this.required = true;
      }
      return rule.trigger === 'blur';
    });
    this.getOpt();
  },
  watch: {
    value: {
      handler: function (val) {
        let validateVal = this.options.find(item => item.value === val);
        if (!validateVal && !this.multiple) {
          this.dropdownVal = '';
        } else {
          this.dropdownVal = val;
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.dh-sizer-dropdown{
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
.select-flex-grow {
  width: 100%;
}
</style>
