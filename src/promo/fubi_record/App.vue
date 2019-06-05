<template>
  <div class="container">
    <el-card class="info">
      <div class="f-s-18 mg-b-10">
        {{ buddhistData.buddhistName }}
      </div>
      <div class="gray">
        <span
          class="mg-r-10"
        >佛事状态：{{ buddhistData.isEnd ? '已结束' : '进行中' }}</span>|
        <span class="mg-l-10">寺院名称：{{ buddhistData.templeName }}</span>
      </div>
    </el-card>
    <el-card class="mg-t-20">
      <div class="filter">
        <el-date-picker
          v-model="time"
          size="small"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
        />
        <el-input
          v-model="searchStr"
          size="small"
          style="width:200px;"
          placeholder="分享人名字/手机号码"
        />
        <el-button
          class="fl-right"
          type="primary"
          size="small"
          @click="refresh"
        >
          搜索
        </el-button>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="payTime"
            label="下单时间"
          />
          <el-table-column
            prop="name"
            label="名称"
          />
          <el-table-column
            prop="payMoney"
            label="支付金额（元）"
          />
          <el-table-column label="所属分享人">
            <template slot-scope="scope">
              <div>{{ scope.row.nickname }}</div>
              <div>{{ scope.row.tel }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="获得福币（元）"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.fuBiMoney }}
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
      buddhistData: {}, // buddhistId, buddhistName, templeName, isEnd
      time: [], //  startTime endTime
      searchStr: '',

      tableData: [], // id, addTime, name, payMoney, owner, fuBiMoney
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
      },

      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const sessionItem = JSON.parse(
        window.sessionStorage.getItem('promo/index/fu/item')
      );
      this.buddhistData = sessionItem;
      this.getList();
    },
    getList() {
      const { buddhistId } = this.buddhistData;
      const { time, searchStr } = this;
      const { page, pageSize } = this.pagination;

      seeFetch('promo/fubi_record/get_list', {
        buddhistId,
        startTime: time ? time[0] : '',
        endTime: time ? time[1] : '',
        searchStr,
        page,
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
