<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="date" label="ID" width="100" />
    <el-table-column prop="date" label="佛事名称" />
    <el-table-column prop="date" label="所属寺院" />
    <el-table-column prop="name" label="待转单数" />
    <el-table-column prop="address" label="已转单数" />
    <el-table-column prop="address" label="订单金额（元）" />
    <el-table-column prop="address" label="盈收金额（元）" />
    <el-table-column prop="address" label="分享福币" />
    <el-table-column prop="address" label="操作" width="100">
      <template slot-scope="scope">
        <div>
          <el-button
            type="text"
            size="small"
            @click="handleClickTransfer(scope.row)"
          >
            转单
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleClickTransfer(scope.row)"
          >
            组合
          </el-button>
        </div>
        <div>
          <el-button
            type="text"
            size="small"
            @click="handleClickTransfer(scope.row)"
          >
            组合
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleClickTransfer(scope.row)"
          >
            设置
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'Buddhist',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
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
