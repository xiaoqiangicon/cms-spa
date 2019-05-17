<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" :align="'center'"/>
      <el-table-column prop="name" label="佛事名称" show-overflow-tooltip/>
      <el-table-column prop="name" label="所属寺院" show-overflow-tooltip/>
      <el-table-column prop="name" label="状态" show-overflow-tooltip :align="'center'">
        <template slot-scope="scope">1321123</template>
      </el-table-column>
      <el-table-column prop="address" label="数量" :align="'center'"/>
      <el-table-column prop="address" label="支付金额（元）" :align="'center'"/>
      <el-table-column prop="address" label="转单金额（元）" :align="'center'"/>
      <el-table-column prop="address" label="支付时间" show-overflow-tooltip :align="'center'"/>
      <el-table-column prop="address" label="操作" width="100" :align="'center'">
        <template slot-scope="scope">
          <div>
            <el-button type="text" size="small" @click="handleClickTransfer(scope.row)">转单</el-button>
            <el-button type="text" size="small" @click="handleClickDetail(scope.row)">详情</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: right; margin-top: 20px;"
      layout="total, prev, pager, next, sizes, jumper"
      :page-size="pagination.pageSize"
      :current-page="pagination.page"
      :total="pagination.total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
    <DialogDetail
      :detail="detail"
      :visible="dialogDetailVisible"
      @updateVisible="updateDialogDetailVisible"
    />
    <DialogTransfer
      :detail="detail"
      :visible="dialogTransferVisible"
      @updateVisible="updateDialogTransferVisible"
    />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import DialogDetail from './DialogDetail';
import DialogTransfer from './DialogTransfer';

export default {
  name: 'TableNotTransfer',
  props: ['buddhistId', 'subId', 'tel'],
  components: {
    DialogDetail,
    DialogTransfer,
  },
  data() {
    return {
      dialogDetailVisible: !1,
      dialogTransferVisible: !1,

      tableData: [],
      detail: {},

      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },

      multipleSelection: [],
    };
  },
  created() {
    this.requestList();
  },
  methods: {
    requestList() {
      const { buddhistId, tel, subId } = this;
      const { page, pageSize } = this.pagination;

      seeFetch('promo/index/transfer/getTransferOrderList', {
        buddhistId,
        subId,
        tel,
        page,
        pageSize,
        type: 1,
      }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.tableData = res.data;
        this.pagination.total = res.count;
      });
    },
    refresh() {
      this.pagination.page = 1;
      this.requestList();
    },
    handleSelectionChange() {},
    handleClickTransfer(rowData) {
      this.detail = rowData;
      this.dialogTransferVisible = !0;
    },
    handleClickDetail(rowData) {
      this.detail = rowData;
      this.dialogDetailVisible = !0;
    },
    onSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.pagination.page = 1;
      this.requestList();
    },
    onCurrentChange(page) {
      this.pagination.page = page;
      this.requestList();
    },
    updateDialogDetailVisible(val) {
      this.dialogDetailVisible = val;
    },
    updateDialogTransferVisible(val) {
      this.dialogTransferVisible = val;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
</style>
