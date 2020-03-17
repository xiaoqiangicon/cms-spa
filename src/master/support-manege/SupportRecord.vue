/* 法师供养记录 */
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
            style="width: 150px;"
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
            style="width: 150px;"
            @change="doSearch"
          />
        </el-form-item>
        <el-form-item label="法师">
          <el-select
            v-model="listParams.bonzeId"
            filterable
            placeholder="请输入法师法号"
            @change="doSearch"
          >
            <el-option
              v-for="item in masterList"
              :key="item.id"
              v-loading="loadingMaster"
              :label="item.bonzeName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-button class="fl-right" size="small" @click="toExport">
          导出Excel
        </el-button>
      </el-form>
    </div>

    <div class="body">
      <el-table
        v-loading="loadingRecord"
        :data="recordList"
        style="width: 100%"
      >
        <el-table-column
          min-width="200px"
          prop="wxTransactionId"
          label="商户单号"
        />
        <el-table-column min-width="100px" prop="price" label="金额（元）" />
        <el-table-column min-width="140px" prop="addTime" label="时间" />
        <el-table-column min-width="100px" label="单号类型">
          <template slot-scope="scope">
            {{
              scope.row.type === 1
                ? '供养金额'
                : scope.row.type === 2
                ? '邀请金额'
                : scope.row.type === 3
                ? '提现金额'
                : scope.row.type === 4
                ? '共得订单'
                : scope.row.type === 5
                ? '佛事转单共得'
                : scope.row.type === 6
                ? '共得提现'
                : scope.row.type === 7
                ? '追加供养'
                : '其他'
            }}
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-show="recordListTotal > 0"
        :total="recordListTotal"
        :current-page="listParams.pageNumber"
        :page-size="listParams.pageSize"
        background
        layout="prev, pager, next"
        style="margin-top: 40px"
        @current-change="pageChange"
      />
    </div>
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
      loadingRecord: true,
      loadingMaster: true,
      masterList: [],
      recordListTotal: 0,
      recordList: [],
      listParams: {
        pageNumber: 1,
        pageSize: 20,
        bonzeId: '',
        startTime: '',
        endTime: '',
      },
    };
  },
  created() {
    if (this.$route.query.masterId) {
      this.listParams.bonzeId = Number(this.$route.query.masterId);
    }
    this.fetchList();
    this.fetchMasterList();
  },
  methods: {
    // 获取法师供养记录列表
    fetchList() {
      const that = this;
      that.loadingRecord = true;
      seeFetch('master/support/getOrderRecordList', that.listParams).then(
        res => {
          that.loadingRecord = false;
          if (res.errorCode === 0 && res.data) {
            that.recordList = res.data.list || [];
            that.recordListTotal = res.data.total;
            window.scrollTo(0, 0);
          } else {
            Notification({
              title: '提示',
              message: res.msg || '获取法师供养记录失败',
            });
          }
        }
      );
    },
    // 获取法师列表
    fetchMasterList() {
      const that = this;
      that.loadingMaster = true;
      seeFetch('master/support/getMasterList').then(res => {
        that.loadingMaster = false;
        if (res.errorCode === 0 && res.data) {
          const list = res.data.list || [];
          list.forEach(item => {
            item.bonzeName = `${item.id} - ${item.bonzeName}`;
          });
          that.masterList = res.data.list;
        } else {
          Notification({
            title: '提示',
            message: res.msg || '获取法师列表失败',
          });
        }
      });
    },
    pageChange(page) {
      this.listParams.pageNumber = page;
      this.fetchList();
    },
    doSearch() {
      this.listParams.pageNumber = 1;
      this.fetchList();
    },
    toExport() {
      const { startTime, endTime, bonzeId } = this.listParams;
      window.location.href = `/wish/downBonzeOrderRecordExcel?startTime=${startTime}&endTime=${endTime}&bonzeId=${bonzeId ||
        0}`;
    },
  },
};
</script>

<style lang="less" scoped>
.container-record {
  width: 100%;
  padding: 20px 10px;
  .body {
    margin-top: 20px;
    /deep/ .el-pagination {
      text-align: center;
    }
  }
}
</style>
