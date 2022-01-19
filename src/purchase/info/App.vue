<template>
  <div class="container">
    <el-card>
      <div class="search-header">
        <div class="search-left">
          <el-date-picker
            v-if="!1"
            v-model="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            unlink-panels
            @change="onChangeDatePicker"
          />
          <el-input
            placeholder="请输入内容"
            v-model="searchText"
            class="input-with-select"
            style="width: 408px;"
          >
            <el-select
              slot="prepend"
              v-model="searchType"
              placeholder="请选择"
              style="width: 120px;"
            >
              <el-option label="物流单号" :value="1" />
              <el-option label="采购平台单号" :value="3" />
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-input>
        </div>
        <div class="tips">
          <p>用于采购信息录入：</p>
          <p>1.创建报销分组对应需审批的</p>
          <p>2.录入采购详细资料</p>
          <p>3.快速生成报销单等财务审批的PDF文件</p>
        </div>
        <div class="add-btn btn" @click="add">创建采购清单</div>
      </div>
      <el-table v-loading="loading" :data="list" style="width: 100%">
        <el-table-column prop="id" label="ID" :align="'center'" />
        <el-table-column prop="name" label="清单名称" :align="'center'" />
        <el-table-column prop="totalItem" label="物品数" :align="'center'" />
        <el-table-column
          prop="totalExpressNo"
          label="物流单号数"
          :align="'center'"
        />
        <el-table-column label="创建人/时间" :align="'center'" width="140">
          <template slot-scope="scope">
            <div>{{ scope.row.managerName }}</div>
            <div>{{ scope.row.addTime }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="memo" label="备注" :align="'center'" />
        <el-table-column label="操作" :align="'center'" width="160">
          <template slot-scope="scope">
            <div class="btn-top">
              <span class="detail light-btn" @click="toDetail(scope.row)"
                >详情</span
              >
              <span class="del light-btn" @click="del(scope.row)">删除</span>
            </div>
            <div>
              <span class="light-btn detail" @click="downloadPdf(scope.row)"
                >生成PDF文件</span
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        :current-page="pageNo"
        :page-size="pageSize"
        background
        layout="prev, pager, next"
        style="margin-top: 40px"
        @current-change="pageChange"
      />
    </el-card>
    <el-dialog title="创建采购清单" :visible.sync="dialogVisible" width="40%">
      <div>
        <div class="row">
          <span>名称</span>
          <el-input v-model="name"></el-input>
        </div>
        <div class="row">
          <span>备注</span>
          <el-input v-model="memo" type="textarea" resize="none"></el-input>
        </div>
        <el-button @click="create" type="primary" class="create"
          >确认创建</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

export default {
  name: 'App',
  components: {},
  data() {
    return {
      date: ['', ''],
      formatDate: ['', ''],
      searchText: '',
      searchType: 1,
      expressNo: '',
      platformOrderNo: '',
      loading: !0,
      list: [],
      pageSize: 20,
      pageNo: 1,
      total: 0,
      dialogVisible: !1,
      name: '',
      memo: '',
    };
  },
  created() {
    this.fetchList();
  },
  watch: {
    dialogVisible(newVal) {
      if (!newVal) {
        this.name = '';
        this.memo = '';
      }
    },
  },
  methods: {
    fetchList() {
      const { pageSize, pageNo, date, platformOrderNo, expressNo } = this;

      seeFetch('purchase/info/list', {
        pageSize,
        pageNo,
        startDate: this.formatDate[0],
        endDate: this.formatDate[1],
        expressNo,
        platformOrderNo,
      }).then(res => {
        if (res.errorCode === 0) {
          this.list = res.data.list;
          this.total = res.data.total;
        } else {
          this.showError(res.msg);
        }
        this.loading = !1;
      });
    },
    search() {
      if (this.searchType === 3) {
        this.platformOrderNo = this.searchText;
      } else {
        this.expressNo = this.searchText;
      }
      this.pageNo = 1;
      this.fetchList();
    },
    onChangeDatePicker() {
      const { date } = this;
      this.currentPage = 1;
      this.formatDate = date.map(item => this.formatTime(`${item}`));
      this.fetchList();
    },
    formatTime(timeStr) {
      const date = new Date(timeStr);
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();

      return `${y}-${m >= 10 ? m : `0${m}`}-${d >= 10 ? d : `0${d}`}`;
    },
    add() {
      this.dialogVisible = !0;
    },
    create() {
      seeFetch('purchase/info/add', {
        id: 0,
        name: this.name,
        memo: this.memo,
      }).then(res => {
        if (res.errorCode === 0) {
          this.dialogVisible = !1;
          this.fetchList();
          this.showSuccess('添加成功');
        } else {
          this.showError(res.msg);
        }
      });
    },
    del(row) {
      this.$confirm(`确定删除${row.name}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('purchase/info/del', { id: row.id }).then(res => {
          if (res.errorCode === 0) {
            this.fetchList();
            this.showSuccess('删除成功');
          } else {
            this.showError(res.msg);
          }
        });
      });
    },
    toDetail(row) {
      this.$router.push({ path: `/purchase/info/${row.id}`, query: {} });
    },
    downloadPdf(row) {
      seeFetch('purchase/info/projectPDF', { id: row.id }).then(res => {
        if (res.errorCode === 0) {
          window.open(res.data.url);
        } else {
          this.showError(res.msg);
        }
      });
    },
    pageChange(page) {
      this.pageNo = page;
      this.fetchList();
    },
    showSuccess(msg) {
      Notification({
        title: '提示',
        type: 'success',
        message: msg || '更改成功',
      });
    },
    showError(msg) {
      Notification({
        title: '提示',
        type: 'error',
        message: msg || '接口出错啦~',
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.el-date-editor--daterange {
  margin-bottom: 20px;
}
</style>

<style scoped lang="less">
.container {
  width: 100%;
  padding: 40px 20px;
}
.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.search-left {
  display: flex;
  flex-direction: column;
}
.tips {
  padding: 6px 14px;
  border: 1px solid #71baff;
  border-radius: 8px;
  background-color: #f2f8fe;
  p {
    margin: 0;
    margin-bottom: 4px;
  }
}

.btn-top {
  margin-bottom: 10px;
}
.detail,
.del {
  display: inline-block;
}
.light-btn {
  padding: 0px 6px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
}
.del {
  background-color: #fef7ef;
  border: 1px solid #f9be72;
  color: #f9be72;
}
.detail {
  background-color: #f2f8fe;
  color: #73bbff;
  border: 1px solid #73bbff;
}
.btn {
  padding: 5px 12px;
  background-color: #0099ff;
  color: #fff;
  border-radius: 18px;
}
.row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  span {
    flex-shrink: 0;
    margin-right: 10px;
  }
}
.create {
  display: block;
  margin: 0 auto;
}
</style>
