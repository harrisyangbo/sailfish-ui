<template>
  <span
    class="table-item-divider"
    v-show="showDivider"
  >
    <span v-html="decodedText" />
  </span>
</template>

<script>
import { decodeHTML } from '../../common/dh_html_escape';
import { checkAuth } from '../../authortity';
export default {
  name: 'TableItemDivider',
  props: {
    field: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      showDivider: true
    };
  },
  computed: {
    decodedText() {
      return decodeHTML(this.field.text);
    }
  },
  mounted() {
    // divider显示处理
    let indexInParent = this.$parent.$parent.$children.filter(checkAuth).findIndex(item => item.$data.$authUniqueId === this.$parent.$data.$authUniqueId);
    this.showDivider = indexInParent > 0 && indexInParent < this.$parent.$parent.$children.length - 1;
  }
};
</script>
