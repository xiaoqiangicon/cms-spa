<template>
  <div class="detail">
    <el-card class="box-card">
      <div slot="header" class="header">
        <span>链接</span>
        <div class="close" @click="close">
          ×
        </div>
      </div>
      <div class="input-box">
        <div class="url-input">
          {{ url }}
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
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  methods: {
    close() {
      console.log(111);
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
  justify-content: center;
  margin-top: 60px;
}
.url-input {
  width: 80%;
  height: 36px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  text-align: center;
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
  color: white;
  background-color: #39f;
  cursor: pointer;
}
</style>
