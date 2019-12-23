<template>
  <div v-if="urlVisible" class="detail" @click="close">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>链接</span>
        <div class="close" @click="close">
          ×
        </div>
      </div>
      <div class="input-box">
        <div id="url-input" class="url-input">
          {{ url }}
        </div>
        <div id="clip" data-clipboard-target="#url-input" class="clip">
          复制链接
        </div>
      </div>
      <div class="btn-box">
        <button class="btn" @click="close">
          关闭
        </button>
      </div>
    </el-card>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard';

export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  computed: {
    urlVisible() {
      return this.$store.state.masterProject.urlVisible;
    },
  },
  mounted() {
    new ClipboardJS('#clip');
  },
  methods: {
    clip() {
      window.clipboardData.setData('Text', this.url);
    },
    close(e) {
      if (e.target === e.currentTarget) {
        this.$store.state.masterProject.urlVisible = !1;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 3000;
}
.box-card {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 460px;
  height: 300px;
  margin: -200px 0 0 -180px;
  background-color: white;
  border-radius: 8px;
}
.header {
  display: flex;
  justify-content: space-between;
}
.close {
  cursor: pointer;
}
.input-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 60px;
}
.url-input {
  width: 80%;
  height: 36px;
  line-height: 36px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  text-align: center;
}
.clip {
  width: 18%;
  height: 36px;
  line-height: 36px;
  background-color: #39f;
  text-align: center;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}
.btn-box {
  display: flex;
  justify-content: center;
}
.btn {
  width: 120px;
  height: 34px;
  margin-top: 60px;
  border: none;
  border-radius: 17px;
  outline: none;
  color: white;
  background-color: #39f;
  cursor: pointer;
}
</style>
