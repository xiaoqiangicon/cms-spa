<template>
  <div>
    <el-table
      v-loading="loading"
      row-key="id"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="name" label="佛事名称" />
      <el-table-column label="选择项名称" :align="'center'">
        <template slot-scope="scope">
          {{ scope.row.subdivideName }}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="支付金额（元）" :align="'center'" />
      <el-table-column
        prop="isAutoConversion"
        label="转单状态"
        :align="'center'"
      />
      <el-table-column
        prop="conversionSubdivideName"
        label="子项目名称"
        :align="'center'"
      />
      <el-table-column label="转单寺院" prop="templeName" :align="'center'" />
      <el-table-column
        prop="conversionOrderPrice"
        label="转单金额"
        :align="'center'"
      />
      <el-table-column label="处理状态" prop="isFinish" :align="'center'" />
      <el-table-column :align="'center'" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toOrder(scope.row)">
            订单追踪
          </el-button>
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
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch';

export default {
  name: 'TableBuddhist',
  data() {
    return {
      loading: !0,
      tableData: [],

      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  created() {
    this.requestList();
  },
  methods: {
    requestList() {
      this.loading = !0;

      const { page, pageSize } = this.pagination;
      const { transferSearchContent: searchContent } = this;

      seeFetch('promo/index/transferNotDispose/getTransferNotDisposeList', {
        page,
        pageSize,
        searchContent,
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
        this.loading = !1;
      });
    },
    refresh() {
      this.pagination.page = 1;
      this.requestList();
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
    toOrder(scope) {
      console.log(scope.orderNo);
      const { orderNo } = scope;
      const url = `/orderManage/statisticsDetail?orderNo=${orderNo}`;
      window.open(url);
    },
    getTransferListUrl(item) {
      const { buddhistId, buddhistName, subList } = item;
      return `${window.location.origin}${
        window.location.pathname
      }#/promo/index/tableNotTransfer/${buddhistId}/${buddhistName}/${encodeURIComponent(
        JSON.stringify(subList)
      )}`;
    },
  },
};
</script>
