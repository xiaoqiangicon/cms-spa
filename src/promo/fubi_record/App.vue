<template>
  <div class="container">
    <el-card class="info">123</el-card>
    <el-card>
      <div class="filter"></div>
      <div class="table"></div>
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

      tableData: [],
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
      },
    };
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
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 40px;
}
</style>

