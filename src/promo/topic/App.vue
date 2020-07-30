<template>
  <div class="container">
    <el-card>
      <div class="tabs">
        专题列表
      </div>
      <div class="operation">
        <el-button
          class="fr"
          type="primary"
          size="medium"
          @click="handleClickCreate"
        >
          新建页面
        </el-button>
      </div>
      <div class="table">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column prop="title" label="专题名称" />
          <el-table-column
            prop="addTime"
            width="200"
            label="添加时间"
            :align="'center'"
          />
          <el-table-column prop="link" label="专题链接" :align="'center'" />
          <el-table-column label="操作" :align="'center'">
            <template slot-scope="scope">
              <el-button
                type="success"
                size="mini"
                @click="handleClickEdit(scope.row)"
              >
                编辑页面
              </el-button>
              <el-button
                type="success"
                size="mini"
                @click="handleClickEditCom(scope.row)"
              >
                编辑组件
              </el-button>
              <el-button
                type="success"
                size="mini"
                @click="handleClickDelete(scope.row)"
              >
                删除
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
    </el-card>
  </div>
</template>

<script>
import './fetch/index';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

export default {
  name: 'App',
  data() {
    return {
      loading: !0,

      tableData: [],

      pagination: {
        page: 1,
        total: 0,
        pageSize: 20,
      },

      dialogRemindVisible: !1,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    refresh() {
      this.pagination.page = 1;
      this.getList();
    },
    getList() {
      this.loading = !0;

      const { page, pageSize } = this.pagination;
      seeFetch('promo/topic/getList', {
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
        this.tableData = res.data.list;

        this.loading = !1;
      });
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
    handleClickCreate() {
      this.$router.push(`/promo/topicCreate/0`);
    },
    handleClickEdit(rowData) {
      const { id } = rowData;
      // window.sessionStorage['promo/topic/item'] = JSON.stringify(rowData);
      this.$router.push(`/promo/topicEdit/${id}`);
    },
    handleClickEditCom(rowData) {
      const { id, title } = rowData;

      this.$router.push(`/promo/topicEdit/${id}/${id}/${title}`);
    },
    handleClickDelete(rowData) {
      this.$confirm('此操作将删除选中专题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const { id } = rowData;
          seeFetch('promo/topic/delete', { id }).then(res => {
            if (!res.success) {
              Notification({
                type: 'error',
                title: '提示',
                message: res.message,
              });
              return;
            }

            Notification({
              type: 'success',
              title: '提示',
              message: '删除成功',
            });

            this.getList();
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
.tabs {
  font-size: 20px;
  font-weight: bold;
}
.operation {
  overflow: hidden;
}
.table {
  margin-top: 30px;
}
</style>
