<template>
  <div class="container">
    <el-card>
      <div>
        <span>加持项目</span>
        <span>></span>
        <span>{{ isNew ? '新建项目' : '编辑项目' }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';

export default {
  data() {
    return {
      isNew: !1,
      title: '',
    };
  },
  created() {
    if (this.$route.params.name == 'undefined') this.isNew = !0;
    else this.title = this.$route.params.name;
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
</style>
