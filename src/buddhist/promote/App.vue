<template>
  <div class="container">
    <el-card>
      <div class="search-box">
        <div>
          <span style="margin-right: 10px;">佛事名称</span>
          <el-select
            v-model="userId"
            placeholder="请选择"
            size="small"
            style="width: 260px;"
            filterable
            @change="onChangeUser"
          >
            <el-option :value="0" label="全部" />
            <el-option
              v-for="item in personList"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </el-select>
        </div>
        <div class="search-right">
          <div class="addUser" @click="toVerify">设置创作者比例</div>
          <p class="">
            佛事审核列表选择单个佛事项目可设置创作者推广分成比例
          </p>
        </div>
      </div>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column
            prop="name"
            width="300%"
            label="佛事名称(当前列表订单、金额和收入灯数据均是推广状态下所计算的数据)"
            :align="'center'"
          />
          <el-table-column prop="orderNum" label="订单数" :align="'center'" />
          <el-table-column
            prop="sumMoney"
            label="支付金额/元"
            :align="'center'"
          />
          <el-table-column
            prop="promoteMoney"
            label="分成金额/元"
            :align="'center'"
          />
          <el-table-column
            prop="includeMoney"
            label="收入金额/元"
            :align="'center'"
          />
          <el-table-column label="操作" width="60" :align="'center'">
            <template slot-scope="scope">
              <div class="toDetail" @click="toDetail(scope.row)">查看</div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :total="totalCount"
          :current-page="currentPage"
          background
          layout="prev, pager, next"
          style="margin-top: 40px"
          @current-change="pageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch';
import './index.less';

export default {
  name: 'App',
  data() {
    return {
      loading: !0,
      list: [],
      personList: [],
      totalCount: 0,
      currentPage: 1,
      userId: 0,
    };
  },
  created() {
    this.fetchList();
    this.fetchUser();
  },
  methods: {
    fetchList() {
      this.loading = !0;
      seeFetch('buddhist/promote/list', {
        pageNum: this.currentPage - 1,
        pageSize: 20,
        id: this.userId,
      }).then(res => {
        this.loading = !1;

        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        if (this.currentPage === 1) this.totalCount = res.data.count;
        this.list = res.data.list;

        window.scrollTo(0, 0);
      });
    },
    fetchUser() {
      seeFetch('buddhist/promote/personList', {}).then(res => {
        if (res.errorCode === 0) {
          this.personList = res.data;
        } else {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }
      });
    },
    onChangeUser() {
      this.currentPage = 1;
      this.fetchList();
    },
    toVerify() {
      window.location.href = '/buddhist/verify';
    },
    toDetail(row) {
      window.location.href = `/buddhist/verify?commodityId=${row.commodityId}`;
    },
    pageChange(page) {
      this.currentPage = page;
      this.fetchList();
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}
.search-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  margin-bottom: 30px;
}
.search-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: #999;
}
.addUser {
  width: 120px;
  height: 32px;
  margin-bottom: 10px;
  line-height: 32px;
  text-align: center;
  color: #fff;
  border-radius: 16px;
  background-color: #0066ff;
  cursor: pointer;
}
.right-list {
  display: flex;
  flex-wrap: wrap;
}
.right-item {
  width: 240px;
  padding: 10px 20px;
  margin-bottom: 16px;
  margin-left: 20px;
  border: 1px solid #eee;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  span {
    margin-right: 12px;
  }
}
.toDetail {
  color: #0066ff;
  cursor: pointer;
}
</style>
