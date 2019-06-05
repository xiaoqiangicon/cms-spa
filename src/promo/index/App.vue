<template>
  <div class="container">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="转单系统" name="transfer">
        <Transfer />
      </el-tab-pane>
      <el-tab-pane label="推广佛事" name="buddhist">
        <Buddhist />
      </el-tab-pane>
      <el-tab-pane label="分享福币" name="fu">
        <Fu />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Transfer from './transfer/Index';
import Buddhist from './buddhist/Index';
import Fu from './fu/Index';
// const Transfer = () => import('./transfer/Index');
// const Buddhist = () => import('./buddhist/Index');
// const Fu = () => import('./fu/Index');

export default {
  name: 'App',
  components: {
    Transfer,
    Buddhist,
    Fu,
  },
  data() {
    return {
      activeName: 'transfer',
    };
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
