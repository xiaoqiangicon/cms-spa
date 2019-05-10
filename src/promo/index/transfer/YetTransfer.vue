<template>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column prop="name" label="佛事名称" show-overflow-tooltip />
    <el-table-column prop="name" label="所属寺院" show-overflow-tooltip />
    <el-table-column prop="address" label="数量" />
    <el-table-column prop="address" label="支付金额（元）" />
    <el-table-column prop="address" label="转单金额（元）" />
    <el-table-column prop="address" label="支付时间" show-overflow-tooltip />
    <el-table-column prop="address" label="操作" width="100">
      <template slot-scope="scope">
        <div>
          <el-button
            type="text"
            size="small"
            @click="handleClickTransfer(scope.row)"
          >
            撤回
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="handleClickTransfer(scope.row)"
          >
            详情
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'YetTransfer',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
      multipleSelection: [],
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
