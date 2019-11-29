<template>
  <div class="container-record">
    <div class="clearfix">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="listParams.startTime"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            size="small"
            @change="doSearch"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="listParams.endTime"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            size="small"
            @change="doSearch"
          />
        </el-form-item>
        <el-form-item label="法师">
          <el-select
            v-model="listParams.bonzeId"
            filterable
            placeholder="请输入法师法号"
          >
            <!-- <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option> -->
          </el-select>
        </el-form-item>
        <el-button class="fl-right" size="small" @click="toExport">
          导出Excel
        </el-button>
      </el-form>
    </div>
    <!-- <div class="body">
      <el-table v-loading="loading" :data="list" style="width: 100%">
        <el-table-column prop="shopNum" label="商户单号" />
        <el-table-column prop="amount" label="金额（元）" />
        <el-table-column prop="createdAt" label="时间" />
      </el-table>
      <el-pagination
        :total="totalCount"
        :current-page="currentPage"
        background
        layout="prev, pager, next"
        style="margin-top: 40px"
        @current-change="pageChange"
      />
    </div>-->
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch';

export default {
  name: 'SupportRecord',
  data() {
    return {
      loading: true,
      startDate: '',
      endDate: '',
      currentPage: 1,
      totalCount: 0,
      list: [],
      listParams: {
        pageNumber: 1,
        pageSize: 10,
        bonzeId: '',
        startTime: '',
        endTime: '',
      },
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      const that = this;
      that.loading = true;

      seeFetch('master/support/getOrderRecordList', that.listParams).then(
        res => {
          that.loading = false;

          if (!res.success) {
            Notification({
              title: '提示',
              message: res.message,
            });
            return;
          }

          if (this.currentPage === 1) this.totalCount = res.totalCount;
          this.list = res.data;

          window.scrollTo(0, 0);
        }
      );
    },
    pageChange(page) {
      this.currentPage = page;
      this.fetchList();
    },
    doSearch() {
      this.currentPage = 1;
      this.fetchList();
    },
    toExport() {
      const { startDate, endDate } = this;
      window.location.href = `/wish/downWishOrderExcel?startTime=${startDate}&endTime=${endDate}&type=0`;
    },
  },
};
</script>

<style scoped>
.container-record {
  width: 100%;
  padding: 20px 10px;
}

.body {
  margin-top: 20px;
}
</style>
