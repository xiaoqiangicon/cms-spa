<template>
  <div class="container">
    <el-card>
      <div class="header">
        fdjsk
      </div>
      <div class="table-box" />
      <el-pagination
        :total="total"
        :current-page="page"
        background
        layout="prev, pager, next"
        style="margin-top: 40px"
        @current-change="pageChange"
      />
    </el-card>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';

export default {
  data() {
    return {
      page: 1,
      total: 0,
      list: [],
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      seeFetch('master/project/list', { pageNum: this.page }).then(() => {
        console.log(res);
      });
    },
    pageChange(page) {
      this.page = page;
      this.fetchList();
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
