<template>
  <div :class="['dh-sizer-keyword', className]">
    <div
      class="dh-sizer-keyword-drop flex-item"
    >
      <dh-sizer-dropdown
        v-model="dropdownVal"
        :options-id="optionsId"
        :filterable="filterable"
      />
    </div>
    <div class="dh-sizer-keyword-input flex-item">
      <dh-sizer-input
        v-model="inputVal"
        :uri="uri"
        :placeholder="placeholder"
        @querySearch="querySearch"
      />
    </div>
  </div>
</template>

<script>
import DhSizerInput from '../../sizer_input/src/dh_sizer_input';
import DhSizerDropdown from '../../sizer_dropdown/src/dh_sizer_dropdown';
import compMixin from '../../mixin/catalyst_register';

export default {
  name: 'DhSizerKeyword',
  mixins: [
    compMixin
  ],
  components: {
    DhSizerInput,
    DhSizerDropdown
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    label: {
      type: String,
      default: ''
    },
    optionsId: {
      type: String,
      default: ''
    },
    uri: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dropdownVal: '',
      inputVal: ''
    };
  },
  methods: {
    setValue(val) {
      if (val) {
        if (val[0]) {
          this.dropdownVal = val[0];
        } else {
          this.dropdownVal = '';
        }
        if (val[1]) {
          this.inputVal = val[1];
        } else {
          this.inputVal = '';
        }
      } else {
        this.dropdownVal = '';
        this.inputVal = '';
      }
    },
    jointData() {
      this.$emit('input', [ this.dropdownVal, this.inputVal ]);
    },
    querySearch(obj) {
      let inputContent = obj.inputContent;
      obj.inputContent = [ this.dropdownVal, inputContent ];
      this.$emit('querySearch', obj);
    }
  },
  watch: {
    dropdownVal: function () {
      this.jointData();
    },
    inputVal: function (val) {
      this.jointData();
    },
    value(newVal) {
      this.setValue(newVal);
    }
  },
  mounted() {
    this.setValue(this.value);
    this.$mpNoticeReady();
  }
};
</script>

<style scoped>
.dh-sizer-keyword{
  display: flex;
  align-items: center;
}
.flex-item{
  margin-right: 8px;
}
</style>
