<template>
  <el-col
    :span="grid"
    :offset="offset"
    :push="push"
    :pull="pull"
    :tag="tag"
    :xs="xs"
    :sm="sm"
    :md="md"
    :lg="lg"
    :xl="xl"
    :style="styleObject"
  >
    <slot />
  </el-col>
</template>

<script>
export default {
  name: 'DhCol',
  props: {
    grid: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: 0
    },
    push: {
      type: Number,
      default: 0
    },
    pull: {
      type: Number,
      default: 0
    },
    xs: {
      type: [Number, Object],
      default: () => {
        return {};
      }
    },
    sm: {
      type: [Number, Object],
      default: () => {
        return {};
      }
    },
    md: {
      type: [Number, Object],
      default: () => {
        return {};
      }
    },
    lg: {
      type: [Number, Object],
      default: () => {
        return {};
      }
    },
    xl: {
      type: [Number, Object],
      default: () => {
        return {};
      }
    },
    tag: {
      type: String,
      default: 'div'
    },
    styleObject: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.el-col {
  margin-bottom: 8px;
  margin-top: 8px;
}
</style>
