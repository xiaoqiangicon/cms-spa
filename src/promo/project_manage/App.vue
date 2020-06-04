<template>
  <div class="contain">
    <el-card>
      <el-table v-loading="loading" :data="list" style="width: 100%">
        <el-table-column prop="account" label="账号名" :align="'center'" />
        <el-table-column
          prop="companyName"
          label="合作账号名称"
          :align="'center'"
        />
        <el-table-column label="操作" :align="'center'">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="toDetail(scope.row)">
              绑定项目详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="list.length"
        :total="totalCount"
        :current-page="currentPage"
        background
        layout="prev, pager, next"
        style="margin-top: 40px"
        @current-change="pageChange"
      />
    </el-card>
  </div>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

export default {
  data() {
    return {
      loading: !0,
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

      seeFetch('promo/projectManage/list', {
        pageNum: this.currentPage - 1,
      }).then(res => {
        this.loading = !1;

        // if (res.data) {
        //   Notification({
        //     title: '提示',
        //     message: res.message,
        //   });
        //   return;
        // }

        if (this.currentPage === 1) this.totalCount = res.data.count;
        this.list = res.data.list;

        window.scrollTo(0, 0);
      });
    },
    pageChange(page) {
      this.currentPage = page;
      this.fetchList();
    },
    toDetail(rowData) {
      const { id } = rowData;

      this.$router.push(`/promo/projectManage/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.contain {
  padding: 20px;
}
</style>
