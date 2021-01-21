<template>
  <div class="container">
    <el-card>
      <div class="tips-box">
        <p class="tips-item">1.需要统计请在渠道统计给长连接增加参数</p>
        <p class="tips-item">
          2.需要Openinistall穿透在Openinistall后台转换长连接
        </p>
        <p class="tips-item">
          3.此功能仅限把长链接转换为短网址：短信、私域流量等地方使用
        </p>
        <p class="tips-item">
          4.此页面不记录已生成的短链，请用飞书文档或飞书笔记规范记录已经投放出去的链接内容。
        </p>
        <p class="tips-item">
          5.请使用时注意相关渠道的规则，防止短链接被使用渠道封禁。
        </p>
      </div>
      <span class="l-hg-32"> 打开链接 </span>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-input
        v-model="openUrl"
        size="small"
        style="width: 500px;"
      /><br /><br />
      <span class="l-hg-32"> 微信内部链接 </span>&nbsp;&nbsp;&nbsp;&nbsp;
      <span ref="link">{{ shortLink }}</span
      ><br /><br />
      <span class="l-hg-32"> 短信外部链接 </span>&nbsp;&nbsp;&nbsp;&nbsp;
      <span ref="wxLink">{{ wxLink }}</span
      ><br /><br />
      <span class="l-hg-32"> 直接弹起规格链接 </span>&nbsp;&nbsp;&nbsp;&nbsp;
      <span ref="showActionLink">{{ showActionLink }}</span
      ><br /><br />
      <el-button size="small" @click="make"> 生成链接 </el-button
      >&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button v-if="shortLink" size="small" @click="copy(1)">
        复制内部链接 </el-button
      >&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button v-if="wxLink" size="small" @click="copy(2)">
        复制外部链接
      </el-button>
      <el-button v-if="showActionLink" size="small" @click="copy(3)">
        复制直接弹起规格链接
      </el-button>
    </el-card>
  </div>
</template>

<script>
import '../../fetch/index.js';
import seeFetch from 'see-fetch';
import { makeTranPageLink } from '../../../../pro-com/src/open-install';

export default {
  name: 'App',
  data() {
    return {
      openUrl: '',
      shortLink: '',
      wxLink: '',
      showActionLink: '',
    };
  },
  methods: {
    make() {
      seeFetch('getShortUrl', { url: this.openUrl }).then(res => {
        if (res.errorCode === 0) {
          this.shortLink = res.data.url;
          this.wxLink = res.data.outsideUrl;
          let openUrlArr = this.openUrl.split('?');
          this.showActionLink =
            openUrlArr[0] + '?' + 'isShowAction=1&' + openUrlArr[1];
        }
      });
    },
    copy(type) {
      const { link: linkEl, showActionLink: showActionLinkEl } = this.$refs;
      const { wxLink: wxLinkEl } = this.$refs;
      const selection = window.getSelection();

      if (selection.rangeCount > 0) {
        selection.removeAllRanges();
      }

      const range = window.document.createRange();
      if (type === 1) {
        range.selectNode(linkEl);
      } else if (type === 2) {
        range.selectNode(wxLinkEl);
      } else {
        range.selectNode(showActionLinkEl);
      }

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
.tips-box {
  width: 600px;
  padding: 0px 30px;
  margin-bottom: 40px;
  border: 1px solid #409eff;
  border-radius: 6px;
}
</style>
