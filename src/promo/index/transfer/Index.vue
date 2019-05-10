<template>
  <div>
    <div class="container">
      <div class="filter">
        <div class="tip fl-left">
          转单系统：手动调度APP的订单给指定的寺院处理、自动调度为APP超度和祈福的组合单其中转单系统与推广佛事为互斥关系，但两者都可设置分享激励
        </div>
        <div class="fl-right mg-t-40">
          <el-button type="primary">
            添加转单佛事
          </el-button>
        </div>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="佛事管理" name="buddhist">
          <Buddhist />
        </el-tab-pane>
        <el-tab-pane label="未转单项" name="notTransfer">
          <NotTransfer />
        </el-tab-pane>
        <el-tab-pane label="已转单项" name="transfer">
          <YetTransfer />
        </el-tab-pane>
      </el-tabs>
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
  </div>
</template>

<script>
// import seeFetch from 'see-fetch';
// import { Notification } from 'element-ui';

import Buddhist from './Buddhist';
import YetTransfer from './YetTransfer';
import NotTransfer from './NotTransfer';

export default {
  name: 'Transfer',
  components: {
    Buddhist,
    YetTransfer,
    NotTransfer,
  },
  data() {
    return {
      tabIndex: 0,

      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
      },

      list: [],
    };
  },
  created() {},
  methods: {
    handleClick() {},
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
}
.filter {
  height: 100px;
  margin-bottom: 20px;
  .tip {
    width: 400px;
    padding: 20px;
    background: #f6ffed;
    border: 1px solid #b7eb8f;
    border-radius: 4px;
  }
}
</style>
