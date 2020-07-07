<template>
  <div class="container">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="用户退款审核" name="verify">
        <Verify />
      </el-tab-pane>
      <el-tab-pane label="已审核" name="verifyed">
        <Verifyed />
      </el-tab-pane>
      <el-tab-pane label="已退款" name="refund">
        <Refund />
      </el-tab-pane>
    </el-tabs>
    <Detail />
  </div>
</template>

<script>
import Detail from './Detail';
import Verify from './verify/Verify';
import Verifyed from './verifyed/Verifyed';
import Refund from './refund/Refund';
import './fetch';

export default {
  name: 'App',
  components: {
    Detail,
    Verify,
    Verifyed,
    Refund,
  },
  data() {
    return {
      activeName: 'verify',
    };
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
</style>
