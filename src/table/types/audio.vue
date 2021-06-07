<template>
  <span class="table-item-audio">
    <audio
      controls="controls"
      controlsList="nodownload"
      ref="audio"
      preload="metadata"
    >
      <!-- 您的浏览器不支持播放音频 -->
      <source :src="value">
    </audio>

    <el-button
      class="btn-rate"
      v-if="field.showRate"
      @click="changeRate"
      round
    >
      x{{ rateList[curRateIndex] }}
    </el-button>
  </span>
</template>

<script>
const RATE_LIST = [1, 1.5, 2];

export default {
  name: 'TableItemAudio',
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
  data() {
    return {
      rateList: RATE_LIST,
      curRateIndex: 0
    };
  },
  methods: {
    // 更改播放速率
    changeRate() {
      this.curRateIndex ++;
      if (this.curRateIndex >= this.rateList.length) this.curRateIndex = 0;
      this.$refs.audio.playbackRate = this.rateList[this.curRateIndex];
    }
  }
};
</script>

<style lang="scss">
.table-item-audio {
  display: flex;
  align-items: center;

  .btn-rate {
    width: 72px;
    margin-left: 8px;
  }
}
</style>