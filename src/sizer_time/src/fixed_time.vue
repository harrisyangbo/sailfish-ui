<template>
  <div class="sizer-fixed-time">
    <!--固定时间-->
    <el-time-select 
      v-if="timeType === 'fixedTime' || timeType === 'fixedRange'"
      v-model="fiexdTimeVal"
      :placeholder="startPlaceholder"
      :disabled="disabled"
      :picker-options="fixedTimeOptions"
    />
    <el-time-select
      v-if="timeType === 'fixedRange'"
      placeholder="结束时间"
      :disabled="disabled"
      v-model="endTime"
      :picker-options="{
        ...fixedTimeOptions,
        minTime: fiexdTimeVal
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'FixedTime',
  props: {
    // fixedTime: 固定时间点 fixedRange: 固定时间范围  
    timeType: {
      type: String,
      default: 'fixedTime'
    },
    // 用于固定时间点
    fixedTimeOptions: {
      type: Object,
      default: () => {
        return {
          start: '00:00',
          step: '00:15',
          end: '11:59'
        };
      }
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
  computed: {
    startPlaceholder() {
      return this.timeType === 'fixedRange' ? '开始时间' : '';
    }
  },
  data() {
    return {
      fiexdTimeVal: '',
      startTime: '',
      endTime: ''
    };
  },
  methods: {
    returnVal() {
      let timeVal = {
        value: this.fiexdTimeVal
      };
      if (this.timeType === 'fixedRange') {
        timeVal.value = {
          start: this.fiexdTimeVal,
          end: this.endTime
        };
      }
      this.$emit('timeChange', timeVal);
    }
  },
  watch: {
    fiexdTimeVal() {
      this.returnVal();
    },
    endTime() {
      this.returnVal();
    }
  }
};
</script>

<style>

</style>