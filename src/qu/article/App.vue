<template>
  <div class="container">
    <el-card>
      <h1>寺院资讯</h1>
      各平台寺院最新资讯信息
      <div class="clearfix">
        <div class="fl-right mg-l-10">
          <el-button class="fl-right" size="small" @click="toAdd">
            添加订阅
          </el-button>
        </div>

        <div class="mg-r-10">
          <el-select
            v-model="status"
            placeholder="请选择"
            size="small"
            style="width: 100px;"
            @change="statusChange"
          >
            <el-option value="-1" label="全部" />
            <el-option value="0" label="未读" />
            <el-option value="1" label="已读" />
            <el-option value="2" label="视频" />
          </el-select>
        </div>

        <div class="fl-right" style="width: 250px;">
          <el-input v-model="search" placeholder="输入关键字搜索" size="small">
            <el-button slot="append" icon="el-icon-search" @click="refresh" />
          </el-input>
        </div>
      </div>
      <div class="body">
        123123
      </div>
    </el-card>
  </div>
</template>

<script>
// import seeFetch from 'see-fetch';
// import { Notification } from 'element-ui';
import './fetch';

export default {
  name: 'App',
  data() {
    return {
      loading: !0,
      search: '',
      status: '',
      currentPage: 1,
      totalCount: 0,
      list: [],
      addDialogVisible: !1,
    };
  },
  created() {
    this.requestList();
  },
  methods: {
    requestList() {},
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 40px 20px;
}

.body {
  margin-top: 20px;
}
</style>
