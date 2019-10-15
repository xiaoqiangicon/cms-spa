<template>
  <div class="container">
    <el-card>
      <div>渠道统计<span>></span>{{ name }}</div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
    };
  },
  created() {
    this.name = this.$route.params.channel;
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
</style>
