<template>
  <div>
    <div class="filter mg-b-20">
      <el-input
        v-model="filterValue"
        placeholder="请输入内容"
        class="input-with-select"
        style="width: 400px;"
      >
        <el-select
          slot="prepend"
          v-model="filterKey"
          placeholder="请选择"
          style="width: 150px;"
        >
          <el-option label="订单ID" value="orderNo" />
          <el-option label="关联用户ID" value="userId" />
          <el-option label="关联用户手机号" value="phone" />
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="refreshAllTable"
        />
      </el-input>
    </div>
    <el-card>
      <el-tabs v-model="curTable" class="mg-t-20">
        <el-tab-pane label="未处理" name="tableNot">
          <TableNot
            ref="tableNot"
            :filter-params="filterParams"
            @showDialogDetail="showDialogDetail"
          />
        </el-tab-pane>
        <el-tab-pane label="已处理" name="tableYet">
          <TableYet
            ref="tableYet"
            :filter-params="filterParams"
            @showDialogDetail="showDialogDetail"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <DialogDetail
      :detail="detail"
      :visible="dialogDetailVisible"
      :cur-table="curTable"
      @updateVisible="updateDialogDetailVisible"
      @success="refreshCurTable"
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
      curTable: 'tableNot',
      dialogDetailVisible: !1,
      detail: {},
    };
  },
  computed: {
    filterParams() {
      const { filterKey, filterValue } = this;
      const res = {};

      if (!filterKey || !filterValue) return res;

      res[filterKey] = filterValue;
      return res;
    },
  },
  methods: {
    refreshCurTable() {
      this.$refs[this.curTable].refresh();
    },
    refreshAllTable() {
      this.$refs.tableNot.refresh();
      this.$refs.tableYet.refresh();
    },
    updateDialogDetailVisible(visible) {
      this.dialogDetailVisible = visible;
    },
    showDialogDetail(detail) {
      this.detail = detail;
      this.dialogDetailVisible = !0;
    },
  },
};
</script>
