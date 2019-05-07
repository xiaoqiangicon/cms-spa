<template>
  <el-dialog
    :visible="visible"
    :title="dialogTitle"
    :before-close="clickCancel"
    width="60%"
  >
    <div class="content">
      <el-table v-loading="loading" :data="list" style="width: 100%">
        <el-table-column prop="editTime" label="编辑时间" />
        <el-table-column label="公司比例">
          <template slot-scope="item">
            {{ item.row.corporationProfitRate }}%
          </template>
        </el-table-column>
        <el-table-column prop="editUser" label="编辑用户" />
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
  </el-dialog>
</template>

<script>
import { Notification } from 'element-ui';
import seeFetch from 'see-fetch';
import { ziYingModifyRecordsProps } from './data';

const computedProps = {};

ziYingModifyRecordsProps.forEach(({ name, full }) => {
  if (full) {
    computedProps[name] = {
      get() {
        return this.$store.state.financeIncome.ziYingModifyRecords[name];
      },
      set(value) {
        const key = `financeIncome/ziYingModifyRecords/update${name
          .slice(0, 1)
          .toUpperCase()}${name.slice(1)}`;
        this.$store.commit(key, value);
      },
    };
  } else {
    computedProps[name] = function() {
      return this.$store.state.financeIncome.ziYingModifyRecords[name];
    };
  }
});

export default {
  name: 'ZiYingModifyRecords',
  data() {
    return {
      loading: !0,
      currentPage: 1,
      totalCount: 0,
      list: [],
    };
  },
  computed: {
    ...computedProps,
  },
  watch: {
    visible() {
      this.doSearch();
    },
  },
  methods: {
    clickCancel() {
      this.$store.commit(`financeIncome/ziYingModifyRecords/updateVisible`, !1);
    },
    fetchList() {
      this.loading = !0;
      seeFetch('finance/income/ziYingModifyRecords', {
        foShiId: this.foShiId,
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
    doSearch() {
      this.currentPage = 1;
      this.fetchList();
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 0 20px;
}

.row {
  position: relative;
  margin-top: 20px;
  padding-left: 100px;
  min-height: 32px;

  &:first-child {
    margin-top: 0;
  }
}

.row-name {
  position: absolute;
  top: 0;
  left: 0;
  line-height: 32px;
  font-size: 16px;
}
</style>
