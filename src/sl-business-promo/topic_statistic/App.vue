<template>
  <div class="contain">
    <el-card>
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="专题" name="transfer"> </el-tab-pane>
        <el-tab-pane label="菜单" name="buddhist"> </el-tab-pane>
        <el-tab-pane label="转单系统" name="transfer-not-dispose">
        </el-tab-pane>
      </el-tabs>
      <el-card>
        专题数据：
        <el-table :data="list" stripe style="width: 100%">
          <el-table-column prop="title" label="专题名称" />
          <el-table-column prop="title" label="专题名称" />
        </el-table>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: !0,
      list: [],
      activeName: 'transfer',
    };
  },
};
</script>

<style lang="less" scoped>
.contain {
  padding: 20px;
}
</style>
