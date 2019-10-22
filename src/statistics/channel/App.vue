<template>
  <div class="container">
    <el-card>
      <div class="clearfix">
        <button class="add-channel" @click="add">
          创建渠道
        </button>
      </div>
      <div class="content">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column label="渠道名称">
            <template slot-scope="scope">
              <div>{{ scope.row.name }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="channel" label="渠道参数" />
          <el-table-column prop="url" label="统计链接" />
          <el-table-column prop="endDate" label="过期时间" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div>
                <button class="btn" @click="toLaxin(scope.row)">
                  报表
                </button>
                <button class="btn" @click="edit(scope.row)">
                  编辑
                </button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="total"
          :current-page="page"
          background
          layout="prev, pager, next"
          style="margin-top: 40px"
          :page-size="pageSize"
          @current-change="pageChange"
        />
      </div>
    </el-card>
    <Edit :item="item" :is-new="isNew" />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import Edit from './Edit';
import './fetch';

export default {
  components: {
    Edit,
  },
  data() {
    return {
      loading: !1,
      list: [],
      total: 10,
      page: 0,
      currentPage: 0,
      pageSize: 10,
      isNew: false, //  是否是创建新的渠道
      item: {}, // 当前点击的这一行的数据
    };
  },
  created() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = !0;

      seeFetch('statistics/channel/list', {
        pageNum: this.currentPage,
      }).then(res => {
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.loading = !1;

        this.total = res.data.count;

        this.list = res.data.list;

        window.scrollTo(0, 0);
      });
    },
    add() {
      this.isNew = true;
      this.$store.state.statisticsChannel.editVisible = !0;
    },
    edit(value) {
      this.isNew = false;
      this.item = value;
      this.$store.state.statisticsChannel.editVisible = !0;
    },
    toLaxin(item) {
      this.$router.push(`/stat/detail/${item.name}/${item.id}/${item.addTime}`);
    },
    pageChange(page) {
      this.page = page;
      this.currentPage = this.page - 1;
      this.fetchList();
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
.add-channel {
  float: right;
  width: 100px;
  height: 36px;
  border: none;
  border-radius: 6px;
  background-color: #2db7f5;
  color: white;
  outline: none;
  cursor: pointer;
}
.btn {
  width: 50px;
  margin-right: 8px;
  color: white;
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: #2db7f5;
  cursor: pointer;
}
</style>
