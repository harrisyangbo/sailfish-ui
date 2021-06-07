<template>
  <a
    :name="attrName"
    href="javascript:void(0);"
    v-if="isRenderLinkButton"
    @click="handleClick"
    :data-action-name="actionName"
    :data-action-args="actionArgsString"
  >
    <slot>{{ label }}</slot>
  </a>
  <el-button
    class="dh-interaction-button"
    :name="attrName"
    :type="buttonType"
    @click="handleClick"
    :data-action-name="actionName"
    :data-action-args="actionArgsString"
    v-else
  >
    <slot>{{ label }}</slot>
  </el-button>
</template>

<script>
import compMixin from '../../mixin/catalyst_component';
import logicCallMixin from '../../logic/src/logic_call_mixin';

export default {
  name: 'DhInteraction',
  mixins: [
    compMixin,
    logicCallMixin
  ],
  props: {
    label: {
      type: String,
      default: ''
    },
    renderLinkButton: {
      type: Boolean,
      default: false
    },
    main: {
      type: Boolean,
      default: false
    },
    logic: {
      type: String,
      default: ''
    },
    params: {
      type: Object,
      default: () => null
    },
    context: {
      type: Object,
      default: () => ({})
    },
    actionName: {
      type: String,
      default: ''
    },
    actionArgs: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isRenderLinkButton() {
      return this.renderLinkButton;
    },
    attrName() {
      if (this.label) {
        return this.label;
      } else {
        if (this.$slots.default && this.$slots.default.length > 0) {
          return this.$slots.default[0].text.trim();
        } else {
          return '';
        }
      }
    },
    buttonType() {
      if (this.isRenderLinkButton) {
        return 'text';
      } else if (this.main) {
        return 'primary';
      } else {
        return '';
      }
    },
    actionArgsString() {
      return JSON.stringify(this.actionArgs);
    }
  },
  methods: {
    handleClick() {
      this.call(this.logic, this.context, this.params ? this.params : undefined);
    }
  }
};
</script>

<style lang="scss" scoped>
.dh-interaction-button{
  margin: 8px 0px;
}
</style>
