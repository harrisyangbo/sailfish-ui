<template>
  <div class="dh-data-reveal">
    <span :class="className">{{ prevData + (value || '') + appendData }}</span>
  </div>
</template>

<script>
import compMixin from '../../mixin/catalyst_register';
import DhValidator from '../../utils/dhValidator';
import TemplateAnalyzer from '@xes/fe-template-analyzer';

export default {
  name: 'DataReveal',
  mixins: [
    compMixin
  ],
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    prev: {
      type: String,
      default: ''
    },
    append: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    context: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  mounted() {
    this.$mpNoticeReady();
  },
  methods: {
    isTemplate(str) {
      // 判断是否为模板字符串
      try {
        let isTempArr = str.match(/\{\{[\s\S]*\}\}/g);
        if (isTempArr && isTempArr.length > 0) {
          return true;
        } else {
          return false;
        }
      } catch(e) {
        throw new Error(e);
      }
    }
  },
  computed: {
    prevData: {
      get() {
        if (this.isTemplate(this.prev)) {
          let templateAnalyzer = new TemplateAnalyzer(this.prev, '{{', '}}');
          let res = templateAnalyzer.result(this.context);
          if (typeof res === 'string') {
            res = res.replace(/\'/g, '').replace(/\"/g, '');
          }
          return res || this.prev;
        } else {
          return this.prev;
        }
      }
    },
    appendData: {
      get() {
        if (this.isTemplate(this.append)) {
          let templateAnalyzer = new TemplateAnalyzer(this.append, '{{', '}}');
          let res = templateAnalyzer.result(this.context);
          if (typeof res === 'string') {
            res = res.replace(/\'/g, '').replace(/\"/g, '');
          }
          return res || this.append;
        } else {
          return this.append;
        }
      }
    }
  }
};
</script>

<style>

</style>