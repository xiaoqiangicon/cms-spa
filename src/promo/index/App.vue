<template>
  <div class="container">
    <el-tabs type="border-card">
      <el-tab-pane label="转单系统">
        <Transfer />
      </el-tab-pane>
      <el-tab-pane label="推广佛事">
        <Buddhist />
      </el-tab-pane>
      <el-tab-pane label="分享激励">
        <Fu />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Transfer from './transfer/Index';
import Buddhist from './buddhist/Index';
import Fu from './fu/Index';

export default {
  name: 'App',
  components: {
    Transfer,
    Buddhist,
    Fu,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
</style>
