<template>
  <div :class="['dh-sizer-radio', className]">
    <span
      :class="['label', required ? 'dh-required' : '' ]"
      :title="label"
      :style="{ width: labelWidth}"
      v-if="label !== ''"
    >
      {{ label }}
    </span>
    <span
      v-if="!readOnly"
      :style="{ position: 'relative', 'flex-grow': flexGrow }"
    >
      <el-radio-group
        v-model="radioVal"
        @change="handleChange"
        :disabled="disabled"
      >
        <el-radio
          v-for="item in options"
          :key="item.label"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
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

export default {
  name: 'DhSizerRadio',
  mixins: [
    compMixin
  ],
  props: {
    value: {
      type: [String, Number],
      default: ''
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
    },
    rules: {
      type: Array,
      default: () => {
        return [];
      }
    },
    flexGrow: {
      type: Number,
      default: 0
    }
  },
  computed: {
    readOnlyVal: function () {
      if (this.readOnly && this.value !== '') {
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
      radioVal: '',
      inputBlurRules: [], // 失去焦点时的校验规则
      validateError: false, // 校验是否错误
      validateMsg: '', // 校验错误信息
      required: false // 是否为必填字段
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
          val && val.forEach((item) => {
            this.options.push(item);
          });
          let validateVal = this.options.find(item => item.value === this.value);
          this.radioVal = validateVal ? this.value : '';
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
    handleChange(val) {
      this.$emit('input', val);
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
    value(newVal) {
      let validateVal = this.options.find(item => item.value === newVal);
      if (!validateVal) {
        this.radioVal = '';
      } else {
        this.radioVal = newVal;
      }
    }
  }
};
</script>

<style scoped>
.dh-sizer-radio{
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
.dh-required:before {
  content: "*";
  color: red;
  margin-right: 0px;
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
</style>
