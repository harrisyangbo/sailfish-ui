<template>
  <div :class="['dh-input-number', className]">
    <!-- <el-input-number 
      :value="value"
      @change="handleChange" 
      :min="min" 
      :max="max" 
      :label="label"
      :precision="precision"
      :step="step"
      :placeholder="placeholder"
      :controls-position="controlsPosition"
      :controls="controls"
    ></el-input-number> -->
  </div>
</template>

<script>
export default {
  name: "DhInputNumber",
  props: {
    value: {
      type: Number,
      default: 1
    },
    // 设置计数器允许的最小值
    min: {
      type: Number,
      default: -Infinity
    },
    // 设置计数器允许的最大值
    max: {
      type: Number,
      default: Infinity
    },
    // 数值精度
    precision: {
      type: Number,
      default: 0
    },
    // 计数器步长
    step: {
      type: Number,
      default: 1
    },
    // 输入框关联的label文字
    label: {
      type: String,
      default: ''
    },
    // 输入框默认 placeholder
    placeholder: {
      type: String,
      default: ''
    },
    // 控制按钮位置
    controlsPosition: {
      type: String,
      default: ''
    },
    // 是否使用控制按钮
    controls: {
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
    className: {
      type: String,
      default: ''
    }
  },
  methods: {
    // handleChange(val) {

    // }
  }
}
</script>

<style>

</style>