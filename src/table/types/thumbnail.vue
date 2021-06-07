<template>
  <span class="table-item-thumbnail">
    <img
      class="thumb"
      :style="thumbStyle"
      :src="value"
      @click="handleImgClick"
    >
  </span>
</template>

<script>
import bus from '../event_bus';
export default {
  name: 'TableItemThumbnail',
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    field: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    thumbStyle() {
      let result = {};
      if (this.field.height) {
        result.height = String(this.field.height);
        result.height += isNaN(Number(this.field.height)) ? '' : 'px';
      }
      if (this.field.width) {
        result.width = String(this.field.width);
        result.width += isNaN(Number(this.field.width)) ? '' : 'px';
      }
      return result;
    }
  },
  methods: {
    handleImgClick() {
      bus.$emit('imageView', this.value);
    }
  }
};
</script>

<style lang="scss">
.table-item-thumbnail {
  .thumb {
    width: 100px;
    // height: auto;
    cursor: zoom-in;
  }
}
</style>