<template>
  <div>
    <el-table ref="table" v-loading="loading" :data="list" style="width: 100%">
      <el-table-column prop="id" label="订单ID" width="100" />
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
          <br />
          {{ scope.row.subtitle }}
        </template>
      </el-table-column>
      <el-table-column label="用户数量">
        <template slot-scope="scope">
          {{
            scope.row.userInfo.reduce(
              (prev, cur) => {
                return { num: prev.num + cur.num };
              },
              { num: 0 }
            ).num
          }}
        </template>
      </el-table-column>
      <el-table-column label="产品编号">
        <template slot-scope="scope">
          <el-button type="primary" size="small" plain>
            {{ scope.row.productNum }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="addTime" label="生成时间" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleClickDeteil(scope.row)"
          >
            详情
          </el-button>
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
import './fetch';
import { Notification } from 'element-ui';

export default {
  props: {
    filterParams: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: !1,
      list: [],
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    refresh() {
      this.getList();
    },
    getList() {
      const { page, pageSize } = this.pagination;
      this.loading = !0;
      seeFetch('promo/ci/list/getList', {
        ...this.filterParams,
        isFinish: 0,
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

        this.pagination.total = res.data.total;
        this.list = res.data.list;
        this.loading = !1;
      });
    },
    handleClickDeteil(rowData) {
      this.$emit('showDialogDetail', rowData);
    },
    onSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.pagination.page = 1;
      this.getList();
    },
    onCurrentChange(page) {
      this.pagination.page = page;
      this.getList();
    },
  },
};
</script>
