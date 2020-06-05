<template>
  <div class="contain">
    <el-card>
      <el-table
        v-loading="loading"
        :data="list"
        style="width: 100%"
        @sort-change="sortChange"
      >
        <el-table-column prop="id" label="项目id" :align="'center'" />
        <el-table-column
          prop="commodityName"
          label="项目名称"
          :align="'center'"
        />
        <el-table-column
          sortable="custom"
          prop="visitNum"
          label="访问人次"
          :align="'center'"
        />
        <el-table-column
          sortable="custom"
          prop="payHumanNum"
          label="付款人数"
          :align="'center'"
        />
        <el-table-column
          sortable="custom"
          prop="payNum"
          label="付款笔数"
          :align="'center'"
        />
        <el-table-column
          sortable="custom"
          prop="payPriceSum"
          label="付款总金额"
          :align="'center'"
        />
        <el-table-column
          prop="ConversionRate"
          label="转化率"
          :align="'center'"
        />
        <el-table-column prop="ARPU" label="ARPU" :align="'center'" />
        <el-table-column label="操作" :align="'center'">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="toDetail(scope.row)">
              详情
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
      orderByType: 0,
      orderBySort: 0, // 1顺序，2倒序
    };
  },
  created() {
    seeFetch('cooperation/projectManage/list', {
      pageNumber: this.currentPage - 1,
    }).then(res => {
      if (res.errorCode === 0) {
        this.list = res.data;
        this.totalCount = this.list.length;
      }
      this.loading = !1;
    });
  },
  methods: {
    sortChange(row) {
      console.log(row);
      if (row.order === 'ascending') {
        this.orderBySort = 1;
      } else {
        this.orderBySort = 2;
      }

      if (row.prop === 'visitNum') {
        this.orderByType = 1;
      } else if (row.prop === 'payHumanNum') {
        this.orderByType = 2;
      } else if (row.prop === 'payNum') {
        this.orderByType = 3;
      } else if (row.prop === 'payPriceSum') {
        this.orderByType = 4;
      }
      this.loading = !0;
      seeFetch('cooperation/projectManage/list', {
        pageNumber: this.currentPage - 1,
        orderByType: this.orderByType,
        orderBySort: this.orderBySort,
      }).then(res => {
        if (res.errorCode === 0) {
          this.list = res.data;
          this.totalCount = this.list.length;
        }
        this.loading = !1;
      });
    },
    pageChange(page) {
      this.currentPage = page;
      this.fetchList();
    },
    toDetail(rowData) {
      const { id } = rowData;

      this.$router.push(`/cooperation/projectManage/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.contain {
  padding: 20px;
}
</style>
