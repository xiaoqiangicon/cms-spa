<template>
  <div class="container">
    <el-card>
      <span class="l-hg-32"> 用户标识 </span>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-input
        v-model="userMark"
        size="small"
        style="width: 500px;"
      /><br /><br />
      <span class="l-hg-32"> 打开链接 </span>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-input
        v-model="openUrl"
        size="small"
        style="width: 500px;"
      /><br /><br />
      <span class="l-hg-32"> 渠道 </span>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-input
        v-model="channel"
        size="small"
        style="width: 500px;"
      /><br /><br />
      <span v-if="!1" class="l-hg-32"> 是否自动 </span>
      <el-switch v-if="!1" v-model="autoWakeUp" /><span v-if="!1"
        >（是否进入页面就自动唤醒）</span
      >
      <span class="l-hg-32"> 生成的链接 </span>&nbsp;&nbsp;&nbsp;&nbsp;
      <span ref="link">{{ link }}</span
      ><br /><br />
      <el-button size="small" @click="make"> 生成链接 </el-button
      >&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button size="small" @click="copy">
        生成并复制链接
      </el-button>
    </el-card>
  </div>
</template>

<script>
import { makeTranPageLink } from '../../../../../pro-com/src/open-install';

export default {
  name: 'App',
  data() {
    return {
      userMark: '',
      openUrl: '',
      channel: '',
      link: '',
      autoWakeUp: !1,
    };
  },
  methods: {
    make() {
      this.link = `${makeTranPageLink({
        userMark: this.userMark,
        openUrl: this.openUrl,
        channel: this.channel,
      })}&autoWakeUp=${this.autoWakeUp ? '1' : ''}`;
    },
    copy() {
      this.make();

      const { link: linkEl } = this.$refs;
      const selection = window.getSelection();

      if (selection.rangeCount > 0) {
        selection.removeAllRanges();
      }

      const range = window.document.createRange();
      range.selectNode(linkEl);
      selection.addRange(range);

      window.document.execCommand('copy');
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
span {
  display: inline-block;
  min-width: 80px;
}
</style>
