<template>
  <div class="container">
    <el-card>
      <zi-ying />
    </el-card>
  </div>
</template>

<script>
import ZiYing from './ZiYing';

export default {
  name: 'App',
  components: {
    ZiYing,
  },
  data() {
    return {
      activeName: 'first',
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
</style>
