<template>
  <div>
    <div class="filter mg-b-20">
      <el-input
        v-model="filterValue"
        placeholder="请输入内容"
        class="input-with-select"
      >
        <el-select slot="prepend" v-model="filterKey" placeholder="请选择">
          <el-option label="餐厅名" value="1" />
          <el-option label="订单号" value="2" />
          <el-option label="用户电话" value="3" />
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="refresh" />
      </el-input>
    </div>
    <el-tabs v-model="activeName" class="mg-t-20">
      <el-tab-pane label="未处理" name="not">
        <TableNot ref="tableNot" />
      </el-tab-pane>
      <el-tab-pane label="已处理" name="yet">
        <TableYet ref="tableYet" />
      </el-tab-pane>
    </el-tabs>
    <DialogDetail
      :detail="detail"
      :visible="dialogDetailVisible"
      @updateVisible="updateDialogDetailVisible"
      @success="refresh"
    />
  </div>
</template>

<script>
import DialogDetail from './DialogDetail';
import TableNot from './TableNot';
import TableYet from './TableYet';

export default {
  components: {
    TableNot,
    TableYet,
    DialogDetail,
  },
  data() {
    return {
      filterKey: '',
      filterValue: '',
      activeName: 'not',
      dialogDetailVisible: !1,
      detail: {},
    };
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {},
    refresh() {
      const $curTable =
        this.activeName === 'not' ? this.$refs.tableNot : this.$refs.tableYet;
      $curTable.refresh();
    },

    updateDialogDetailVisible(visible) {
      this.dialogDetailVisible = visible;
    },
  },
};
</script>
