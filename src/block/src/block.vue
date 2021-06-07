<template>
  <el-row v-if="withLayout">
    <slot
      :scopeContext="value"
    />
  </el-row>
  <div
    v-else
    class="catalyst-block"
  >
    <slot
      :scopeContext="value"
    />
  </div>
</template>

<script>
import compMixin from '../../mixin/catalyst_register';

export default {
  name: 'DhBlock',
  mixins: [
    compMixin
  ],
  props: {
    value: {
      type: [ Object, Array ],
      default: () => null
    },
    withLayout: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$mpNoticeReady();
  }
};
</script>

<style lang="scss" scoped>
.catalyst-block{
  margin: 0;
  padding: 0;
}
</style>
