<template>
  <div class="container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="代念经咒" name="jing-zhou">
          <el-tabs v-model="subActiveName">
            <el-tab-pane label="信众下单统计" name="xin-zhong">
              <xin-zhong />
            </el-tab-pane>
            <el-tab-pane label="法师提现统计" name="fa-shi">
              <fa-shi />
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="分销系统" name="fen-xiao">
          <fen-xiao />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import FenXiao from './FenXiao';
import XinZhong from './XinZhong';
import FaShi from './FaShi';
import './fetch';

export default {
  name: 'App',
  components: {
    FenXiao,
    XinZhong,
    FaShi,
  },
  data() {
    return {
      activeName: 'fen-xiao',
      subActiveName: 'xin-zhong',
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
