<template>
  <div class="container">
    <div class="search">
      <div class="" style="margin-right: 30px;">
        <span>寺院订单导入</span>
        <el-select
          filterable
          v-model="templeId"
          placeholder="导入寺院超时订单"
          v-loading="loading"
        >
          <el-option
            v-for="item in templeList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
        <el-button type="primary" @click="importOrder" v-loading="importLoading"
          >导入</el-button
        >
      </div>
      <span>佛事搜索</span>
      <el-input v-model="searchCommodityName">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
    </div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="未处理" name="notDispose">
        <List
          :type="type"
          :list="list"
          :total="total"
          :page="page"
          :pageSize="pageSize"
          @changePage="changePage"
        />
      </el-tab-pane>
      <el-tab-pane label="已处理" name="dispose">
        <List
          :type="type"
          :list="list"
          :total="total"
          :page="page"
          :pageSize="pageSize"
          @changePage="changePage"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import List from './List';
import Detail from './Detail';

export default {
  name: 'APP',
  data() {
    return {
      list: [],
      templeList: [],
      templeId: '',
      type: 0,
      searchCommodityName: '',
      activeName: 'notDispose',
      page: 1,
      total: 0,
      pageSize: 25,
      loading: !0,
      importLoading: !1,
    };
  },
  created() {
    this.fetchList();
    this.fetchTempleList();
  },
  watch: {
    activeName(newVal, oldVal) {
      if (newVal !== oldVal && newVal === 'notDispose') {
        this.type = 0;
        this.fetchList();
      } else if (newVal !== oldVal && newVal === 'dispose') {
        this.type = 1;
        this.fetchList();
      }
    },
  },
  components: {
    List,
    Detail,
  },
  methods: {
    fetchList() {
      seeFetch('order/overtime/list', {
        pageNum: this.page,
        pageSize: this.pageSize,
        type: this.type,
        commodityName: this.searchCommodityName,
      }).then(res => {
        if (res.success) {
          this.list = res.data.list;
          this.total = res.data.total;
        } else {
          Notification({
            title: '提示',
            message: res.msg,
          });
        }
      });
    },
    fetchTempleList() {
      seeFetch('order/overtime/templeList', {
        isTest: 0,
        verify: -1,
        all: 1,
      }).then(res => {
        this.templeList = res.data;
        this.loading = !1;
      });
    },
    importOrder() {
      let templeId = this.templeId;
      if (this.importLoading) return;

      this.$alert(
        `确定要导入选中寺院Id为${templeId}的全部未处理的订单（非APP、非大礼包订单）的超时订单吗？`,
        `提示`,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        this.importLoading = !0;
        seeFetch('order/overtime/getMoreList', { templeId }).then(res => {
          if (res.success) {
            Notification({
              title: '提示',
              message: '导入成功',
            });
            this.fetchList();
          } else {
            Notification({
              title: '提示',
              message: res.msg,
            });
          }
          this.importLoading = !1;
        });
      });
    },
    search() {
      this.page = 0;
      this.fetchList();
    },
    changePage(data) {
      this.page = data;
      this.fetchList();
    },
  },
};
</script>

<style>
.el-input-group {
  width: 270px;
}
</style>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}
.search {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  span {
    flex-shrink: 0;
    margin-right: 20px;
  }
}
</style>
