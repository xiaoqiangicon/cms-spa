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
import seeFetch from 'see-fetch';
import './fetch';

export default {
  data() {
    return {
      loading: !0,
      list: [],
      currentPage: 1,
      totalCount: 0,
    };
  },
  created() {
    seeFetch('/stat/get2BStatisticsSumList', {}).then(res => {
      if (res.code === 0) {
        this.list = res.data;
      }
    });
  },
  methods: {
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
