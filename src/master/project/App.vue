<template>
  <div class="container">
    <el-card>
      <div class="header">
        <button class="btn" @click="handleEdit">
          创建项目
        </button>
      </div>
      <div class="table-box">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="name" label="项目名称" />
          <el-table-column prop="amount" width="100" label="参与人次" />
          <el-table-column prop="price" width="100" label="金额（元）" />
          <el-table-column prop="addTime" label="创建时间" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="handle-box">
                <div class="handle manage" @click="handleManage(scope.row)">
                  订单管理
                </div>
                <div class="handle url" @click="handleUrl(scope.row.id)">
                  链接
                </div>
                <div class="handle edit" @click="handleEdit(scope.row)">
                  编辑
                </div>
                <div class="handle del" @click="handleDel(scope.row.id)">
                  删除
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        :total="total"
        :current-page="currentPage"
        background
        layout="prev, pager, next"
        style="margin-top: 40px"
        @current-change="pageChange"
      />
    </el-card>
    <Detail :url="url" />
    <Edit v-bind="row" />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import './fetch';
import Detail from './Detail';
import Edit from './Edit';

export default {
  components: {
    Detail,
    Edit,
  },
  data() {
    return {
      page: 0,
      currentPage: 0,
      total: 0,
      loading: true,
      list: [],
      row: {},
      url: '',
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = true;

      seeFetch('master/project/list', {
        getAll: 0,
        pageNum: this.page,
        pageSize: 20,
      }).then(res => {
        if (res.success) {
          this.list = res.data.list;
          this.total = res.data.total;
          this.loading = false;
        }
      });
    },
    handleManage(row) {
      window.location.href = `/wish/plus?project=${row.name}&id=${row.id}`;
    },
    handleUrl(id) {
      this.url = `http://test.zizaihome.com/wishOrder/blessing?id=${id}`;
      this.$store.state.masterProject.urlVisible = !0;
    },
    handleEdit(row) {
      this.$store.state.masterProject.editVisible = !0;
      if (row.name) {
        this.row = row;
      } else {
        this.row = {};
      }
    },
    handleDel(id) {
      this.$confirm('此操作将删除选中的项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          seeFetch('master/project/delete', { id }).then(res => {
            if (res.success) {
              window.location.reload();
            }
          });
        })
        .catch(() => {});
    },
    pageChange(page) {
      this.currentPage = page;
      this.page = this.currentPage - 1;
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
.header {
  display: flex;
  justify-content: flex-end;
  padding-right: 40px;
  margin: 20px 0;
}
.btn {
  width: 120px;
  height: 40px;
  font-size: 18px;
  color: white;
  background-color: #409eff;
  border: none;
  outline: none;
  border-radius: 20px;
  cursor: pointer;
}
.handle-box {
  display: flex;
  flex-wrap: wrap;
}
.handle {
  width: 70px;
  height: 30px;
  margin: 10px 10px 10px 0;
  line-height: 30px;
  background-color: #f0f9ec;
  color: #67c23a;
  border: 1px solid #e1f3d8;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.handle:hover {
  background-color: #e6f5ff;
  color: #1890ff;
  border: 1px solid #e6f5ff;
}
.del {
  background-color: #f5e1c1;
  color: #d98d15;
  border: 1px solid #eecd99;
}
</style>
