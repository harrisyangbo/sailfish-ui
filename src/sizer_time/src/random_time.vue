<template>
  <div class="sizer-random-time">
    <el-time-picker
      :is-range="timeType === 'randomRange'"
      v-model="timeVal"
      :disabled="disabled"
      @change="handleChange"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      placeholder="选择时间范围"
    />
  </div>
</template>

<script>
export default {
  name: 'RandomTime',
  props: {
    timeType: {
      type: String,
      default: 'randomTime'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeVal: ''
    };
  },
  methods: {
    handleChange(val) {
      this.$emit('timeChange', val);
    }
  }
};
</script>

<style>

</style>