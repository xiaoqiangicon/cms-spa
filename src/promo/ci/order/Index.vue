<template>
  <div>
    <div class="tip">
      温馨提示：
      <br />当前是勾选20条记录才能生成一条为处理的订单。相同的用户可勾选多条。
    </div>
    <div class="table-bar">
      已选择 {{ userNum }} 个用户
      <el-button
        class="fl-right mg-t-10 mg-r-20"
        type="primary"
        size="mini"
        :disabled="selected.length < 20"
        @click="dialogConfirmVisible = true"
      >
        生成订单
      </el-button>
    </div>
    <el-table
      ref="table"
      v-loading="loading"
      :data="list"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="nickname" label="用户昵称" />
      <el-table-column label="登记信息">
        <template slot-scope="scope">
          {{ scope.row.name }}
          <br />
          {{ scope.row.tel }}
        </template>
      </el-table-column>
      <el-table-column label="来源">
        <template slot-scope="scope">
          {{ scope.row.oldUser ? '老用户' : '新用户' }}
        </template>
      </el-table-column>
      <el-table-column prop="addTime" label="添加时间" />
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
    <DialogConfirm
      :selected="selected"
      :visible="dialogConfirmVisible"
      @updateVisible="updateDialogConfirmVisible"
      @success="refresh"
    />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import './fetch';
import { Notification } from 'element-ui';
import DialogConfirm from './DialogConfirm';

export default {
  components: {
    DialogConfirm,
  },
  data() {
    return {
      loading: !1,
      list: [],
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
      },

      selected: [],

      dialogConfirmVisible: !1,
    };
  },
  computed: {
    userNum() {
      return [...new Set(this.selected.map(item => item.id))].length;
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getList();
    },
    refresh() {
      this.pagination.page = 1;
      this.selected = [];
      this.getList();
    },
    getList() {
      const { page, pageSize } = this.pagination;
      this.loading = !0;
      seeFetch('promo/ci/order/getList', { page, pageSize }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.pagination.total = res.data.total;
        this.list = res.data.list;

        this.updateTableSelected();
        this.loading = !1;
      });
    },
    handleSelectionChange(selectedRow) {
      this.selected = selectedRow;
    },
    updateTableSelected() {
      this.list.forEach(item => {
        if (this.selected.find(sItem => sItem.id === item.id)) {
          setTimeout(() => {
            this.$refs.table.toggleRowSelection(item, true);
          });
        }
      });
    },
    updateDialogConfirmVisible(visible) {
      this.dialogConfirmVisible = visible;
    },
    onSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.pagination.page = 1;
      this.getList();
    },
    onCurrentChange(page) {
      this.pagination.page = page;
      this.getList();
    },
  },
};
</script>

<style lang="less">
.tip {
  width: 400px;
  padding: 8px 16px;
  background-color: #ecf8ff;
  border-radius: 4px;
  border-left: 5px solid #50bfff;
}
.table-bar {
  margin: 20px 0;
  padding-left: 20px;
  height: 50px;
  line-height: 50px;
  background-color: #ecf8ff;
}
</style>
