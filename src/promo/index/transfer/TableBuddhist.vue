<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="100" :align="'center'"/>
      <el-table-column prop="name" label="佛事名称"/>
      <el-table-column label="关联寺院" :align="'center'">
        <template slot-scope="scope">
          <el-tooltip placement="right">
            <div slot="content">
              <div v-for="item in scope.row.templeList" :key="item">{{ item }}</div>
            </div>
            <div style="color: #409EFF;cursor: pointer;">{{ scope.row.templeList.length }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="orderNum" label="待转单数" :align="'center'"/>
      <el-table-column prop="conversionOrderNum" label="已转单数" :align="'center'"/>
      <el-table-column prop="conversionOrderPrice" label="订单金额（元）" :align="'center'"/>
      <el-table-column prop="profitConversionOrderPrice" label="盈收金额（元）" :align="'center'"/>
      <el-table-column prop="id" label="分享福币" :align="'center'"/>
      <el-table-column label="操作" width="100" :align="'center'">
        <template slot-scope="scope">
          <div>
            <el-button type="text" size="small" @click="toTransferList(scope.row)">转单列表</el-button>
          </div>
          <div>
            <el-button type="text" size="small" @click="toTransferSet(scope.row)">转单设置</el-button>
          </div>
          <div>
            <el-button type="text" size="small" @click="toMergeSet(scope.row)">组合设置</el-button>
          </div>
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

import { addProps } from '../data';
const computedProps = {};
addProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.promoIndex.add[name];
      },
      set(value) {
        const key = `promoIndex/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.promoIndex.add[name];
    };
  }
});

export default {
  name: 'TableBuddhist',
  data() {
    return {
      tableData: [],

      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  computed: {
    ...computedProps,
  },
  created() {
    this.requestList();
  },
  methods: {
    requestList() {
      const { page, pageSize } = this.pagination;

      seeFetch('promo/index/transfer/getTransferBuddhistList', {
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

        this.tableData = res.data;
        this.pagination.total = res.count;
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
    toTransferList(item) {
      const {id, name, subList} = item;
      this.transferBuddhistId = id;
      this.transferBuddhistName = name;
      this.transferSubList = subList;
      this.transferActiveName = 'tableNotTransfer';
    },
    toTransferSet(item) {
      window.sessionStorage['promo/index/item'] = JSON.stringify(item);

      this.$router.push(`/promo/transferSet/${item.id}`);
    },
    toMergeSet(item) {
      window.sessionStorage['promo/index/item'] = JSON.stringify(item);

      this.$router.push(`/promo/mergeSet/${item.id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
</style>
