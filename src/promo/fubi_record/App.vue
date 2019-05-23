<template>
  <div class="container">
    <el-card class="info">
      <div class="f-s-18 mg-b-10">{{ buddhistName }}</div>
      <div class="gray">
        <span class="mg-r-10">佛事状态：{{isEnd ? '已结束' : '进行中'}}</span>|
        <span class="mg-l-10">寺院名称：{{templeName}}</span>
      </div>
    </el-card>
    <el-card class="mg-t-20">
      <div class="filter">
        <el-date-picker size="small" v-model="time" type="date" placeholder="选择日期"></el-date-picker>
        <el-input size="small" style="width:200px;" v-model="searchStr" placeholder="分享人名字/手机号码"></el-input>
        <el-button class="fl-right" type="primary" size="small" @click="refresh">搜索</el-button>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="addTime" label="下单时间" />
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="payMoney" label="支付金额（元）" />
          <el-table-column label="所属分享人">
            <template slot-scope="scope">
              {{scope.row.owner}}
            </template>
          </el-table-column>
          <el-table-column label="获得福币（元）" align="center">
             <template slot-scope="scope">
              {{scope.row.fuBiMoney}}
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
    </el-card>
  </div>
</template>

<script>
import './fetch/index';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

export default {
  name: '',
  data() {
    return {
      id: null,
      status: 0, // 0 全部
      time: '', // 下单时间
      searchStr: '', // 搜索字符串

      tableData: [], // id, addTime, name, payMoney, owner, fuBiMoney
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
      },

      buddhistName: '佛事打断点',
      buddhistId: 101,
      isEnd: 1,
      templeName: '寺院',
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const id = parseInt(this.$route.params.id, 10);
      this.id = id;
      this.getList();
    },
    getList() {
      const { id, status, time, searchStr } = this;

      seeFetch('promo/fubi_record/get_list', {
        id,
        status,
        time,
        searchStr,
      }).then(res => {
        if (!res.success) {
          Notification({
            type: 'error',
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.pagination.total = res.data.total;
        this.tableData = res.data.list;
      });
    },
    refresh() {
      this.pagination.page = 1;
      this.getList();
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

<style lang="less" scoped>
.container {
  padding: 40px;
}
.info {
  margin-top: 20px;
}
.table {
  margin-top: 20px;
}
.gray {
  color: #aeafae;
}
</style>

