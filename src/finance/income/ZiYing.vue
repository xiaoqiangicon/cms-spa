<template>
  <div class="container">
    <div class="tip mg-b-20">
      添加佛事之后会把历史数据统计出来，并且统计进入到营收统计中，已经加入转单的规格不会被统计
    </div>
    <div class="clearfix">
      <el-select
        v-model="filterType"
        filterable
        placeholder="请选择"
        size="small"
        style="width: 200px;"
        @change="doSearch"
      >
        <el-option
          v-for="item in ziYingTypes"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        />
      </el-select>
      <el-select
        v-model="search"
        filterable
        placeholder="请选择佛事ID或佛事名称"
        size="small"
        @change="doSearch"
      >
        <el-option
          v-for="item in buddhistList"
          :key="item.commodityId"
          :value="item.commodityId"
          :label="item.fullName"
        />
      </el-select>
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
            <el-button
              v-else-if="item.row.ended === 1"
              type="danger"
              size="mini"
            >
              已结束
            </el-button>
            <el-button v-else size="mini">
              进行中
            </el-button>
            <span>{{ item.row.foShiName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="自营总额(包含禅在订单)">
          <template slot="header" slot-scope="item">
            {{ item.column.label }}
            <el-tooltip
              content="若有订单或选择项被标记为转单则不计算到自营总额中"
              placement="top"
            >
              <i class="el-icon-question question" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="留存比例">
          <template slot-scope="item">
            {{ item.row.corporationProfitRate }}%
          </template>
          <template slot="header" slot-scope="item">
            {{ item.column.label }}
            <el-tooltip
              content="分成给公司的比例，按当天的计算生效。若修改比例后则当天所有的订单都会在24:00调整变更。"
              placement="top"
            >
              <i class="el-icon-question question" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="profitAmount" label="当前营收(包含禅在订单)">
          <template slot="header" slot-scope="item">
            {{ item.column.label }}
            <el-tooltip
              content="当前已经记录到“营收统计”中的金额，会根据企业分成比例浮动"
              placement="top"
            >
              <i class="el-icon-question question" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="已支出">
          <template slot-scope="item">
            {{ item.row.usedAmount }}
            <!--<br />-->
            <!--<span class="f-s-12">人工记录：{{ item.row.manualAmount }}</span>-->
            <!--<br />-->
            <!--<span class="f-s-12">转单系统：{{ item.row.transformAmount }}</span>-->
          </template>
          <template slot="header" slot-scope="item">
            {{ item.column.label }}
            <el-tooltip
              content="若有订单被标记为转单则不计算到自营佛事的营收统计当中。用“已支出”将其数据剔除。"
              placement="top"
            >
              <i class="el-icon-question question" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="remainAmount" label="可用金额">
          <template slot="header" slot-scope="item">
            {{ item.column.label }}
            <el-tooltip
              content="可参考这个金额设置人工支出：自营总额（a）- 当前营收（c）- 人工记录已支出（d）"
              placement="top"
            >
              <i class="el-icon-question question" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="item">
            <el-button type="text" @click="toEdit(item)">
              编辑
            </el-button>
            <el-button type="text" @click="toModifyRecords(item)">
              修改记录
            </el-button>
            <el-button type="text" @click="toUse(item)">
              支出
            </el-button>
            <el-button type="text" @click="toUseRecords(item)">
              支出记录
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="totalCount"
        :current-page="currentPage"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        style="margin-top: 40px"
        @current-change="pageChange"
      />
    </div>
    <zi-ying-add :ok="fetchList" />
    <zi-ying-modify-records />
    <zi-ying-use :ok="fetchList" />
    <zi-ying-use-records />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import {
  ziYingAddProps,
  ziYingModifyRecordsProps,
  ziYingUseProps,
  ziYingUseRecordsProps,
  ziYingTypes,
} from './data';
import ZiYingAdd from './ZiYingAdd';
import ZiYingModifyRecords from './ZiYingModifyRecords';
import ZiYingUse from './ZiYingUse';
import ZiYingUseRecords from './ZiYingUseRecords';
import './fetch';

export default {
  name: 'ZiYing',
  components: {
    ZiYingAdd,
    ZiYingModifyRecords,
    ZiYingUse,
    ZiYingUseRecords,
  },
  data() {
    return {
      loading: !0,
      search: '',
      filterType: 2,
      currentPage: 1,
      totalCount: 0,
      pageSize: 10,
      list: [],
      buddhistList: [],
      ziYingTypes,
    };
  },
  created() {
    this.fetchList();
    this.fetchBuddhist();
  },
  methods: {
    fetchList() {
      this.loading = !0;
      seeFetch('finance/income/listZiYing', {
        type: this.filterType,
        search: this.search,
        page: this.currentPage,
        pageSize: this.pageSize,
      }).then(res => {
        this.loading = !1;

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
      });
    },
    fetchBuddhist() {
      seeFetch('finance/income/listZiYing', {
        type: this.filterType,
        search: '',
        page: 1,
        pageSize: 5000,
      }).then(res => {
        this.buddhistList = res.data;
      });
    },
    pageChange(page) {
      this.currentPage = page;
      this.fetchList();
    },
    doSearch() {
      this.currentPage = 1;
      this.fetchList();
      this.fetchBuddhist();
    },
    toEdit({ row: item }) {
      ziYingAddProps.forEach(({ name }) => {
        this.$store.state.financeIncome.ziYingAdd[name] = item[name];
      });

      this.$store.state.financeIncome.ziYingAdd.dialogTitle = '编辑';
      this.$store.state.financeIncome.ziYingAdd.visible = !0;
      this.$store.state.financeIncome.ziYingAdd.isUpdate = !0;
      this.$store.state.financeIncome.ziYingAdd.updateId = item.id;
      this.$store.state.financeIncome.ziYingAdd.type = item.type || 1;
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
    toModifyRecords({ row: item }) {
      ziYingModifyRecordsProps.forEach(({ name }) => {
        this.$store.state.financeIncome.ziYingModifyRecords[name] = item[name];
      });

      this.$store.state.financeIncome.ziYingModifyRecords.dialogTitle =
        '修改记录';
      this.$store.state.financeIncome.ziYingModifyRecords.visible = !0;
      this.$store.state.financeIncome.ziYingModifyRecords.isUpdate = !0;
      this.$store.state.financeIncome.ziYingModifyRecords.updateId = item.id;
      this.$store.state.financeIncome.ziYingModifyRecords.id = item.id;
      this.$store.state.financeIncome.ziYingModifyRecords.foShiId =
        item.foShiId;
    },
    toUse({ row: item }) {
      ziYingUseProps.forEach(({ name }) => {
        this.$store.state.financeIncome.ziYingUse[name] = item[name];
      });

      this.$store.state.financeIncome.ziYingUse.dialogTitle = '添加支出项';
      this.$store.state.financeIncome.ziYingUse.visible = !0;
      this.$store.state.financeIncome.ziYingUse.isUpdate = !0;
      this.$store.state.financeIncome.ziYingUse.updateId = item.id;
      this.$store.state.financeIncome.ziYingUse.item = { ...item };
    },
    toUseRecords({ row: item }) {
      ziYingUseRecordsProps.forEach(({ name }) => {
        this.$store.state.financeIncome.ziYingUseRecords[name] = item[name];
      });

      this.$store.state.financeIncome.ziYingUseRecords.dialogTitle = '支出记录';
      this.$store.state.financeIncome.ziYingUseRecords.visible = !0;
      this.$store.state.financeIncome.ziYingUseRecords.isUpdate = !0;
      this.$store.state.financeIncome.ziYingUseRecords.updateId = item.id;
      this.$store.state.financeIncome.ziYingUseRecords.id = item.id;
      this.$store.state.financeIncome.ziYingUseRecords.foShiId = item.foShiId;
    },
  },
};
</script>

<style lang="less" scoped>
.tip {
  width: 600px;
  padding: 20px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 4px;
}
.body {
  margin-top: 20px;
}

.question {
  margin-left: 5px;
  position: relative;
  top: 2px;
  cursor: pointer;
  font-size: 20px;
}
</style>
