<template>
  <div>
    <el-table ref="table" v-loading="loading" :data="list" style="width: 100%">
      <el-table-column prop="id" label="订单ID" width="100" />
      <el-table-column prop="title" label="标题">
        <!-- <template slot-scope="scope">
          12312
        </template> -->
      </el-table-column>

      <el-table-column prop="info" label="用户数量">
        <template slot-scope="scope">
          {{ scope.row.info }}
          <br />
          {{ scope.row.tel }}
        </template>
      </el-table-column>
      <el-table-column prop="origin" label="产品编号" />
      <el-table-column prop="addTime" label="生成时间" />
      <el-table-column label="操作">
        <template>
          详情
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
    userId: {
      type: String,
      default: '',
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
      seeFetch('promo/ci/list/getList', { type: 0, page, pageSize }).then(
        res => {
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
        }
      );
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
