<template>
  <div class="container">
    <el-card>
      <div class="operation-box">
        <span style="margin-right: 10px;">寺院名称：</span>
        <el-select
          v-model="listParams.templeId"
          style="width: 350px;"
          clearable
          size="medium"
          filterable
          placeholder="请选择寺院或填写关键词搜索"
          @change="onChangeTempleId"
        >
          <el-option
            v-for="item in templeList"
            :key="item.id"
            :label="item.id + ' - ' + item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <el-table
        v-loading="integralLoading"
        :data="integralList"
        style="width: 100%"
      >
        <el-table-column prop="templeId" label="寺院ID" />
        <el-table-column prop="templeName" label="寺院名称" />
        <el-table-column prop="level" label="等级" />
        <el-table-column prop="coin" label="积分" />
      </el-table>
      <el-pagination
        v-show="integralTotal > 0"
        :total="integralTotal"
        :current-page="listParams.pageNumber"
        :page-size="listParams.pageSize"
        background
        layout="prev, pager, next"
        style="margin-top: 30px; text-align: center;"
        @current-change="getIntegralList"
      />
    </el-card>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification, Message } from 'element-ui';
import './fetch';

export default {
  name: 'App',
  data() {
    return {
      integralList: [],
      integralLoading: true,
      integralTotal: 0,
      templeList: [],
      listParams: {
        pageNumber: 1,
        pageSize: 20,
        templeId: '',
      },
    };
  },
  created() {
    this.getTempleList();
    this.getIntegralList();
  },
  methods: {
    // 获取寺院积分列表
    getIntegralList(page) {
      const that = this;
      that.integralLoading = true;
      if (page) that.listParams.pageNumber = page;
      seeFetch('temple/integration/getIntegralList', that.listParams).then(
        res => {
          that.integralLoading = false;
          if (res.errorCode === 0 && res.data && res.data.list) {
            that.integralList = res.data.list;
            that.integralTotal = res.data.total;
          } else {
            Notification({
              title: '提示',
              message: res.message,
            });
          }
        }
      );
    },
    getTempleList() {
      seeFetch('temple/integration/getTempleList', {}).then(res => {
        if (!res.success) return;

        this.templeList = res.data;
      });
    },
    onChangeTempleId() {
      this.listParams.pageNumber = 1;
      this.getIntegralList();
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  padding: 30px 20px;
  .operation-box {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
}
</style>
