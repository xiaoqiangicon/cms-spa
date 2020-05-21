<template>
  <div>
    <div class="filter">
      <div class="mg-t-20 top">
        <div>
          <span style="margin-left: 4px;margin-right: 6px;">佛事名称</span>
          <el-autocomplete
            v-model="commodityName"
            class="autocomplete"
            :fetch-suggestions="querySearch"
            placeholder="请输入佛事名称"
            @select="refreshCommodityList"
          />
        </div>
        <el-button slot="append" type="primary" @click="download">
          下载
        </el-button>
      </div>
    </div>
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
      <el-table-column prop="addTime" label="转单时间" :align="'center'" />
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
      commodityId: '',
      commodityName: '',
      commodityIdList: [],

      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  created() {
    this.requestList();
    this.requestCommodityList();
  },
  methods: {
    requestList() {
      this.loading = !0;

      const { page, pageSize } = this.pagination;

      seeFetch('promo/index/transferNotDispose/getTransferNotDisposeList', {
        commodityId: this.commodityId,
        pageNumber: page,
        pageSize,
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
        this.$nextTick(() => {
          this.expandAll();
        });
      });
    },
    requestCommodityList() {
      seeFetch('promo/index/transferNotDispose/getCommodityList', {}).then(
        res => {
          this.commodityIdList = res.data;
        }
      );
    },
    refresh() {
      this.pagination.page = 1;
      this.requestList();
    },
    expandAll() {
      const els = this.$el.getElementsByClassName('el-table__expand-icon');
      for (let i = 0; i < els.length; i++) {
        if (
          els[i]
            .getAttribute('class')
            .indexOf('el-table__expand-icon--expanded') === -1
        ) {
          els[i].click();
        }
      }
    },
    download() {
      const commodityId = this.commodityId || 0;
      const url = `/conversionOrder/getNotDisposeConversionOrderExcel?commodityId=${commodityId}`;
      window.open(url);
    },
    querySearch(queryString, cb) {
      // seeFetch('promo/index/transferNotDispose/getCommodityList', {
      // }).then(res => {
      //   this.commodityIdList = res.data;
      //   var commodityIdList = this.commodityIdList;

      //   cb(commodityIdList);
      // })
      var { commodityIdList } = this;
      var commodityIdList = commodityIdList
        ? commodityIdList.filter(this.createFilter(queryString))
        : commodityIdList;
      cb(commodityIdList);
    },
    createFilter(queryString) {
      return restaurant =>
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
    },
    refreshCommodityList(item) {
      this.commodityId = item.id;
      this.commodityName = item.name;
      this.refresh();
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

<style lang="less" scoped>
.filter {
  margin-bottom: 20px;
}
.autocomplete {
  width: auto !important;
}
.top {
  display: flex;
  justify-content: space-between;
}
</style>
