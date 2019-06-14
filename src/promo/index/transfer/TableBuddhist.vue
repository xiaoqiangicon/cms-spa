<template>
  <div>
    <el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
      <el-table-column
        prop="buddhistId"
        label="ID"
        width="100"
        :align="'left'"
      />
      <el-table-column prop="buddhistName" label="佛事名称" />
      <el-table-column label="关联寺院" :align="'center'">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.templeList.length" placement="right">
            <div slot="content">
              <div v-for="item in scope.row.templeList" :key="item">
                {{ item }}
              </div>
            </div>
            <div style="color: #409EFF;cursor: pointer;">
              {{ scope.row.templeList.length }}
            </div>
          </el-tooltip>
          <div v-else>
            0
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="orderNum" label="待转单数" :align="'center'" />
      <el-table-column
        prop="conversionOrderNum"
        label="已转单数"
        :align="'center'"
      />
      <el-table-column
        prop="conversionOrderPrice"
        label="订单金额（元）"
        :align="'center'"
      />
      <el-table-column
        prop="profitConversionOrderPrice"
        label="盈收金额（元）"
        :align="'center'"
      />
      <el-table-column label="分享福币" :align="'center'">
        <template slot-scope="scope">
          <span v-if="scope.row.isShareFuBi">已设置</span>
          <span v-else style="color: #409EFF;">未设置</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <div>
            <el-button type="text" size="small">
              <a :href="getTransferListUrl(scope.row)" target="_black"
                >转单列表</a
              >
            </el-button>
            <!-- <el-button
              type="text"
              size="small"
              @click="toTransferList(scope.row)"
            >
              转单列表
            </el-button> -->
          </div>
          <div>
            <el-button
              type="text"
              size="small"
              @click="toTransferSet(scope.row)"
            >
              转单设置
            </el-button>
          </div>
          <div>
            <el-button type="text" size="small" @click="toMergeSet(scope.row)">
              组合设置
            </el-button>
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
    /* eslint-disable */
    computedProps[name] = function() {
      return this.$store.state.promoIndex.add[name];
    };
  }
});

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
  computed: {
    ...computedProps,
  },
  created() {
    this.requestList();
  },
  methods: {
    requestList() {
      this.loading = !0;

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
    getTransferListUrl(item) {
      const { buddhistId, buddhistName, subList } = item;
      return `${window.location.origin}${
        window.location.pathname
      }#/promo/index/tableNotTransfer/${buddhistId}/${buddhistName}/${encodeURIComponent(
        JSON.stringify(subList)
      )}`;
    },
    toTransferList(item) {
      const { buddhistId, buddhistName, subList } = item;
      // this.transferBuddhistId = buddhistId;
      // this.transferBuddhistName = buddhistName;
      // this.transferSubList = subList;
      // this.transferActiveName = 'tableNotTransfer';

      // 此处存在特殊逻辑
      let url = `${window.location.origin}${
        window.location.pathname
      }#/promo/index/tableNotTransfer/${buddhistId}/${buddhistName}/${encodeURIComponent(
        JSON.stringify(subList)
      )}`;
      window.open(url);
    },
    toTransferSet(item) {
      window.sessionStorage['promo/index/transfer/item'] = JSON.stringify(item);
      this.$router.push(`/promo/transferSet/${item.buddhistId}`);
    },
    toMergeSet(item) {
      window.sessionStorage['promo/index/transfer/item'] = JSON.stringify(item);
      this.$router.push(`/promo/mergeSet/${item.buddhistId}`);
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
