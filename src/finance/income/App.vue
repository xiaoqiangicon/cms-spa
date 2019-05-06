<template>
  <div class="container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="实景探寺" name="first">
          <shi-jing />
        </el-tab-pane>
        <el-tab-pane label="供奉系统" name="second">
          <gong-feng />
        </el-tab-pane>
        <el-tab-pane label="推广佛事" name="third">
          <fo-shi />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ShiJing from './ShiJing';
import GongFeng from './GongFeng';
import FoShi from './FoShi';

export default {
  name: 'App',
  components: {
    ShiJing,
    GongFeng,
    FoShi,
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
