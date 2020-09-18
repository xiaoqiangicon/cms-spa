<template>
  <div class="container">
    <el-card>
      <div>
        <el-button size="small" plain @click="toNav(1)">
          善款统计
        </el-button>
        <el-button size="small" plain type="primary">
          善款明细
        </el-button>
        <el-button size="small" plain @click="toNav(3)">
          特殊提现
        </el-button>
      </div>
      <div class="mg-t-20">
        <el-date-picker
          v-model="filterStartDate"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="开始日期"
          size="small"
          style="width: 200px;"
          @change="doSearch"
        />
        <el-date-picker
          v-model="filterEndDate"
          align="right"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="结束日期"
          size="small"
          style="width: 200px;"
          @change="doSearch"
        />
        <el-button class="fl-right" size="small" @click="exportExcel">
          导出Excel
        </el-button>
      </div>
      <div class="mg-t-20">
        <el-select
          v-model="filterTemple"
          filterable
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          @change="changeTemple"
        >
          <el-option label="所有寺院" :value="0" />
          <el-option
            v-for="item in temples"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select
          v-model="filterType"
          filterable
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          @change="changeType"
        >
          <el-option label="所有类别" :value="0" />
          <el-option
            v-for="item in types"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select
          v-if="subIds && subIds.length"
          v-model="filterSubId"
          filterable
          placeholder="请选择"
          size="small"
          style="width: 200px;"
          @change="doSearch"
        >
          <el-option label="所有子类别" :value="0" />
          <el-option
            v-for="item in subIds"
            :key="item.id"
            :label="item.id + ' - ' + item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="time" label="日期" />
          <el-table-column prop="showId" label="商户单号" />
          <el-table-column prop="title" label="项目名称" />
          <el-table-column prop="amount" label="金额" />
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
    </el-card>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch';

// types 缓存
const typesCache = {};

export default {
  name: 'App',
  data() {
    return {
      filterStartDate: '',
      filterEndDate: '',
      filterTemple: 0,
      filterType: 0,
      filterSubId: 0,
      loading: !0,
      currentPage: 1,
      totalCount: 0,
      pageSize: 50,
      list: [],
      temples: [],
      types: [],
      subIds: [],
    };
  },
  created() {
    seeFetch('finance/summary/temples').then(res => {
      if (!res.success || !res.data || !res.data.length) {
        Notification({
          title: '提示',
          message: '获取寺院数据失败',
        });
        return;
      }

      this.temples = res.data;

      if (window.sessionStorage['finance/summary:filterTemple']) {
        this.filterTemple = parseInt(
          window.sessionStorage['finance/summary:filterTemple'],
          10
        );
        window.sessionStorage.removeItem('finance/summary:filterTemple');
      }

      if (window.sessionStorage['finance/summary:filterStart']) {
        this.filterStartDate =
          window.sessionStorage['finance/summary:filterStart'];
        window.sessionStorage.removeItem('finance/summary:filterStart');
      }

      if (window.sessionStorage['finance/summary:filterEnd']) {
        this.filterEndDate = window.sessionStorage['finance/summary:filterEnd'];
        window.sessionStorage.removeItem('finance/summary:filterEnd');
      }

      this.fetchList();
    });

    this.fetchTypes();
  },
  methods: {
    toNav(sequence) {
      if (sequence === 1) this.$router.push('/finance/stat');
      else if (sequence === 2) this.$router.push('/finance/summary');
      else if (sequence === 3) this.$router.push('/finance/special');
    },
    fetchList() {
      this.loading = !0;

      seeFetch('finance/summary/list', {
        startDate: this.filterStartDate,
        endDate: this.filterEndDate,
        templeId: this.filterTemple,
        type: this.filterType,
        subId: this.filterSubId,
        page: this.currentPage,
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.loading = !1;
        if (this.currentPage === 1) this.totalCount = res.totalCount;
        this.list = res.data;

        window.scrollTo(0, 0);
      });
    },
    fetchTypes() {
      if (typesCache[this.filterTemple]) {
        this.types = typesCache[this.filterTemple];
        this.afterFetchTypes();
      } else {
        seeFetch('finance/summary/types', { templeId: this.filterTemple }).then(
          res => {
            if (!res.success || !res.data || !res.data.length) {
              typesCache[this.filterTemple] = [];
              return;
            }

            typesCache[this.filterTemple] = res.data;
            this.types = res.data;
            this.afterFetchTypes();
          }
        );
      }
    },
    pageChange(page) {
      this.currentPage = page;
      this.fetchList();
    },
    doSearch() {
      this.currentPage = 1;
      this.fetchList();
    },
    exportExcel() {
      window.open(
        `/finance/getTransactionRecordExcel?templeId=${this.filterTemple}&type=${this.filterType}&startTime=${this.filterStartDate}&endTime=${this.filterEndDate}&commodityId=${this.filterSubId}`
      );
    },
    changeTemple() {
      this.filterType = 0;
      this.filterSubId = 0;
      this.fetchTypes();
      this.doSearch();
    },
    afterFetchTypes() {
      const typeItem = this.types.find(i => i.id === this.filterType);

      console.log(typeItem);

      if (!typeItem) this.subIds = [];
      else this.subIds = typeItem.children;
    },
    changeType() {
      this.filterSubId = 0;
      this.afterFetchTypes();
      this.doSearch();
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}

.body {
  margin-top: 20px;
}
</style>
