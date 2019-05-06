<template>
  <div class="container">
    <div class="clearfix">
      <el-input
        v-if="!1"
        v-model="search"
        placeholder="请输入佛事ID"
        size="small"
        style="width: 250px;"
      >
        <el-button slot="append" icon="el-icon-search" @click="toSearch" />
      </el-input>
      <el-button class="fl-right" size="small" @click="toAdd">
        添加自营佛事
      </el-button>
    </div>
    <div class="body">
      <el-table v-loading="loading" :data="list" style="width: 100%">
        <el-table-column prop="foShiId" label="佛事ID" />
        <el-table-column label="佛事名称">
          <template slot-scope="item">
            <el-button v-if="item.row.confirmed" type="primary" size="mini">
              已确认
            </el-button>
            <el-button v-else-if="item.row.ended" type="danger" size="mini">
              已结束
            </el-button>
            <el-button v-else size="mini">
              进行中
            </el-button>
            <span>{{ item.row.foShiName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="订单总额" />
        <el-table-column label="企业分成">
          <template slot-scope="item">
            {{ item.row.corporationProfitRate }}%
          </template>
        </el-table-column>
        <el-table-column prop="profitAmount" label="当前盈收" />
        <el-table-column label="已支出">
          <template slot-scope="item">
            {{ item.row.usedAmount }}<br />
            <span class="f-s-12">人工记录：{{ item.row.manualAmount }}</span
            ><br />
            <span class="f-s-12">转单系统：{{ item.row.transformAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remainAmount" label="剩余金额" />
        <el-table-column label="操作">
          <template slot-scope="item">
            <el-button
              v-if="item.row.ended && !item.row.confirmed"
              type="text"
              @click="toConfirm(item)"
            >
              确认结算
            </el-button>
            <el-button type="text" @click="toEdit(item)">
              编辑
            </el-button>
            <el-button type="text" @click="toRecords(item)">
              记录
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="totalCount"
        :current-page="currentPage"
        background
        layout="prev, pager, next"
        style="margin-top: 40px"
        @current-change="pageChange"
      />
    </div>
    <zi-ying-add :ok="addDialogOk" />
    <zi-ying-records />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import { ziYingAddProps, ziYingRecordsProps } from './data';
import ZiYingAdd from './ZiYingAdd';
import ZiYingRecords from './ZiYingRecords';
import './fetch';

export default {
  name: 'ZiYing',
  components: {
    ZiYingAdd,
    ZiYingRecords,
  },
  data() {
    return {
      loading: !0,
      search: '',
      currentPage: 1,
      totalCount: 0,
      list: [],
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = !0;
      seeFetch('finance/income/listZiYing', {
        search: this.search,
        page: this.currentPage,
      }).then(res => {
        this.loading = !1;

        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.totalCount = res.totalCount;
        this.list = res.data;

        window.scrollTo(0, 0);
      });
    },
    pageChange(page) {
      this.currentPage = page;
      this.fetchList();
    },
    toSearch() {
      this.currentPage = 1;
      this.fetchList();
    },
    toEdit({ row: item }) {
      ziYingAddProps.forEach(({ name }) => {
        this.$store.state.financeIncome.ziYingAdd[name] = item[name];
      });

      this.$store.state.financeIncome.ziYingAdd.dialogTitle = '编辑';
      this.$store.state.financeIncome.ziYingAdd.visible = !0;
      this.$store.state.financeIncome.ziYingAdd.isUpdate = !0;
      this.$store.state.financeIncome.ziYingAdd.updateId = item.id;
    },
    toAdd() {
      ziYingAddProps.forEach(({ name, default: defaultValue }) => {
        this.$store.state.financeIncome.ziYingAdd[name] =
          typeof defaultValue === 'function' ? defaultValue() : defaultValue;
      });

      this.$store.state.financeIncome.ziYingAdd.dialogTitle = '添加';
      this.$store.state.financeIncome.ziYingAdd.isUpdate = !1;
      this.$store.state.financeIncome.ziYingAdd.updateId = 0;
      this.$store.state.financeIncome.ziYingAdd.visible = !0;
    },
    toRecords({ row: item }) {
      ziYingRecordsProps.forEach(({ name }) => {
        this.$store.state.financeIncome.ziYingRecords[name] = item[name];
      });

      this.$store.state.financeIncome.ziYingRecords.dialogTitle = '记录';
      this.$store.state.financeIncome.ziYingRecords.visible = !0;
      this.$store.state.financeIncome.ziYingRecords.isUpdate = !0;
      this.$store.state.financeIncome.ziYingRecords.updateId = item.id;
      this.$store.state.financeIncome.shiJingRecords.id = item.id;
      this.$store.state.financeIncome.shiJingRecords.ziYing = item.foShiId;
    },
    toConfirm({ row: item }) {
      this.$confirm(
        `<div class="t-a-center">
          ${item.foShiName}
          <br />
          佛事ID：
          ${item.foShiId}
          <br />
          <br />
          <br />
          确认结算后不可取消
        </div>`,
        '提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }
      ).then(() => {
        seeFetch('finance/income/confirm', {
          id: item.foShiId,
          templeId: item.templeId,
          type: 2,
        }).then(res => {
          if (!res.success) {
            Notification({
              title: '提示',
              message: res.message || '确认出错，请稍后再试',
            });
            return;
          }

          Notification({
            title: '提示',
            message: '操作成功',
          });

          this.fetchList();
        });
      });
    },
    addDialogOk() {
      this.fetchList();
    },
  },
};
</script>

<style lang="less" scoped>
.body {
  margin-top: 20px;
}
</style>
