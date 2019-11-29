<template>
  <div class="container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="信众供养法师记录" name="support-record">
          <support-record />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import SupportRecord from './SupportRecord';
import './fetch';

export default {
  name: 'App',
  components: { SupportRecord },
  data() {
    return {
      activeName: 'support-record',
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
