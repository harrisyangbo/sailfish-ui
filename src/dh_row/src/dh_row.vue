<template>
  <div
    :class="{ 'dh-row': true, 'dh-row-fold': foldable, 'dh-row-split-line': splitLine }"
    :style="{height: rowHeight}"
  >
    <div
      class="row-wrapper"
      ref="rowWrapper"
    >
      <p
        class="dh-row-label"
        v-if="label !== '' || foldable"
      >
        <i
          v-if="JSON.stringify(icon) !== '{}'"
          :class="icon.class || ''"
          :style="{'font-size': icon.size, 'color': icon.color}"
        />
        <span
          class="row-title"
          v-if="label !== ''"
        >{{ label }}</span>
        <slot
          v-else
          name="header"
        />
        <el-button
          type="text"
          v-if="foldable"
          :class="[btnRight ? 'dh-fold-btn' : 'dh-fold-btn-follow']"
          @click="foldTrigger()"
        >
          {{ foldPanel ? '点击展开' : '点击收起' }}
          <span :class="[foldPanel ? 'unfold' : 'packup', 'triangle']" />
        </el-button>
      </p>
      <el-row
        :gutter="gutter"
        :type="mode"
        :justify="justify"
        :align="align"
        :tag="tag"
        :style="styleObject"
      >
        <slot />
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DhRow',
  inject: {
    $mpRoot: {
      default: () => null
    }
  },
  props: {
    gutter: {
      type: Number,
      default: 0
    },
    mode: {
      type: String,
      default: ''
    },
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    },
    tag: {
      type: String,
      default: 'div'
    },
    label: {
      type: String,
      default: ''
    },
    styleObject: {
      type: Object,
      default: () => {}
    },
    foldable: {
      type: Boolean,
      default: false
    },
    // 是否默认折叠
    foldClose: {
      type: Boolean,
      default: false
    },
    foldMode: {
      type: String,
      default: 'head'
    },
    splitLine: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Object,
      default: () => {
        return {};
      }
    },
    btnRight: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      foldPanel: false, // 默认展开状态
      rowHeight: ''
    };
  },
  methods: {
    foldTrigger() {
      if (this.rowHeight === 'auto') {
        // 初始化dh-row的高度
        this.rowHeight = `${this.$refs.rowWrapper.clientHeight}px`;
      }
      setTimeout(() => {
        if (this.foldable) {
          // foldPanel false为展开状态 true为折叠状态
          this.foldPanel = !this.foldPanel;
          this.rowHeight = this.foldPanel ? '52px' : `${this.$refs.rowWrapper.clientHeight}px`;
        }
      }, 30);
    }
  },
  mounted() {
    if (this.foldClose) {
      this.foldPanel = true;
      this.rowHeight = '52px';
    } else {
      this.rowHeight = 'auto';
    }
  }
};
</script>

<style scoped>
.dh-row {
  width: 100%;
}
.dh-row-split-line {
  border-bottom: 1px solid #cccccc;
  margin-bottom: 16px;
}
.row-wrapper {
  position: relative;
}
.dh-row-fold {
  overflow: hidden;
  transition: height 0.3s cubic-bezier(0.4, 0, 1, 1);
  -moz-transition: height 0.3s cubic-bezier(0.4, 0, 1, 1); /* Firefox 4 */
  -webkit-transition: height 0.3s cubic-bezier(0.4, 0, 1, 1); /* Safari 和 Chrome */
  -o-transition: height 0.3s cubic-bezier(0.4, 0, 1, 1); /* Opera */
}
.dh-row-label {
  margin: 0px;
  font-size: 14px;
  max-width: 85%;
  overflow: hidden;
}
.dh-row-label .row-title {
  font-weight: 600;
  height: 52px;
  line-height: 52px;
  display: inline-block;
}
.dh-row-label-btn {
  height: 55px;
  margin: 0px;
  position: relative;
}
.dh-fold-btn {
  position: absolute;
  top: 19px;
  right: 10px;
  z-index: 19;
  padding: 0px;
}
.dh-fold-btn-follow {
  margin-top: 8px;
}
.triangle{
  width:0px;
  height:0px;
  overflow:hidden;
  border-width:5px;
  border-color:#3388ff transparent transparent transparent;
  border-style:dashed dashed solid dashed;
  float: right;
  margin-left: 4px;
}
.unfold{
  transform: rotate(0deg);
  margin-top: 4px;
}
.packup{
  transform: rotate(180deg);
  margin-top: -1px;
}
</style>
