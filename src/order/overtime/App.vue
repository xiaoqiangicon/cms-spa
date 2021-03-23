<template>
  <div class="container">
    <div class="search">
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
        <List :type="type" :list="list" />
      </el-tab-pane>
      <el-tab-pane label="已处理" name="dispose">
        <List :type="type" :list="list" />
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
      type: 0,
      searchCommodityName: '',
      activeName: 'notDispose',
      pageNum: 0,
      pageSize: 100,
    };
  },
  created() {
    this.fetchList();
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
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        type: this.type,
        commodityName: this.searchCommodityName,
      }).then(res => {
        if (res.success) {
          this.list = res.data.list;
        } else {
          Notification({
            title: '提示',
            msg: res.msg,
          });
        }
      });
    },
    search() {
      this.fetchList();
    },
  },
};
</script>

<style>
.el-input-group {
  width: 360px;
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
