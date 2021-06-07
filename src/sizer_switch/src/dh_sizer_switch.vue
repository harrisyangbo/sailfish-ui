<template>
  <div :class="['dh-sizer-switch', className]">
    <el-switch
      v-model="switchVal"
      :disabled="disabled"
      :active-color="extension.activeColor || '#13ce66'"
      :inactive-color="extension.inactiveColor || '#ff4949'"
      :active-text="extension.activeText || ''"
      :inactive-text="extension.inactiveText || ''"
    />
  </div>
</template>

<script>
import compMixin from '../../mixin/catalyst_register';

export default {
  name: 'DhSizerSwitch',
  mixins: [
    compMixin
  ],
  props: {
    value: {
      type: Boolean,
      default: true
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    extension: {
      type: Object,
      default: () => {
        return {};
      }
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      switchVal: true
    };
  },
  watch: {
    switchVal: function (val) {
      if (val !== this.value) {
        this.$emit('input', val);
      }
    }
  },
  mounted() {
    this.switchVal = this.value;
    this.$mpNoticeReady();
  }
};
</script>

<style>
</style>
