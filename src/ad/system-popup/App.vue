<template>
  <el-tabs type="border-card" class="border-card-box">
    <el-tab-pane label="弹窗广告">
      <ad-table :ad-type="1" />
    </el-tab-pane>
    <el-tab-pane label="SaaS首页推荐">
      <ad-table :ad-type="2" />
    </el-tab-pane>
    <el-tab-pane label="小程序首页推荐">
      <ad-table :ad-type="3" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import adTable from './adTable';

export default {
  components: { adTable },
};
</script>

<style lang="less">
.border-card-box {
  margin: 30px 20px;
}
</style>
