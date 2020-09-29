<template>
  <div class="container">
    <el-card>
      <div class="search-box">
        <div>
          <span style="margin-right: 10px;">申请人搜索</span>
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
              :label="item.searchName"
            />
          </el-select>
        </div>
        <div class="addUser" @click="addUser">添加创作者</div>
      </div>
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="addTime" label="添加时间" :align="'center'" />
          <el-table-column prop="account" label="AppID" :align="'center'" />
          <el-table-column prop="name" label="真实姓名" :align="'center'" />
          <el-table-column
            prop="videoNum"
            label="审核通过的视频"
            :align="'center'"
          />
          <el-table-column
            prop="likeNum"
            label="视频累计点赞数"
            :align="'center'"
          />
          <el-table-column prop="followNum" label="关注量" :align="'center'" />
          <el-table-column label="银行卡认证" :align="'center'">
            <template slot-scope="scope">
              <div class="verify" v-if="scope.row.bankCardStatus === 1">
                已认证
              </div>
              <div class="notVerify" v-else>未认证</div>
            </template>
          </el-table-column>
          <el-table-column label="权限" :align="'center'" v-if="!1">
            <template slot-scope="scope">
              <div>
                <div
                  class="verify"
                  v-if="
                    scope.row.allowShopWindow !== 1 &&
                      scope.row.allowSuixi !== 1
                  "
                >
                  -
                </div>
                <div class="notVerify" v-else>
                  <span v-if="scope.row.allowShopWindow === 1"
                    >开启橱窗功能<br
                  /></span>
                  <span v-if="scope.row.allowSuixi === 1">开启随喜功能</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" :align="'center'">
            <template slot-scope="scope">
              <el-button type="text" @click="toRight(scope.row)" v-if="!1">
                权限
              </el-button>
              <el-button type="text" @click="toDetail(scope.row)">
                提现资料
              </el-button>
              <el-button type="text" @click="del(scope.row.id)">
                删除
              </el-button>
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
    <el-dialog :visible="showRightBox" title="创作者权限" :before-close="close">
      <div class="right-list">
        <div class="right-item">
          <span>关联橱窗的功能</span>
          <el-switch v-model="isOpenWindow" active-color="#13ce66"> </el-switch>
        </div>
        <div class="right-item" v-if="!1">
          <span>短视频随喜按钮</span>
          <el-switch v-model="isOpenDonate" active-color="#13ce66"> </el-switch>
        </div>
      </div>
      <el-button class="saveRight" @click="saveRight" type="primary"
        >保存</el-button
      >
    </el-dialog>
    <Detail
      :type="type"
      :bankInfo="bankInfo"
      :showDetail="showDetail"
      @closeDialog="closeDialog"
    />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch';
import './index.less';
import Detail from './Detail.vue';

export default {
  name: 'App',
  data() {
    return {
      loading: !0,
      list: [],
      totalCount: 0,
      currentPage: 1,
      userId: 0,
      personList: [],
      showRightBox: !1,
      isOpenWindow: !1,
      isOpenDonate: !1,
      showDetail: !1,
      type: 1,
      rightId: '',
      bankInfo: {},
    };
  },
  components: {
    Detail,
  },
  created() {
    this.fetchList();
    this.fetchUser();
  },
  methods: {
    fetchList() {
      this.loading = !0;
      seeFetch('creator/personnel/list', {
        content: this.userId,
        pageNum: this.currentPage - 1,
        pageSize: 20,
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
      seeFetch('creator/personnel/personList', {}).then(res => {
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
    addUser() {
      this.type = 1;
      this.showDetail = !0;
    },
    toRight(row) {
      console.log(row);
      this.rightId = row.id;
      this.isOpenWindow = !!row.allowShopWindow;
      this.isOpenDonate = !!row.allowSuixi;
      this.showRightBox = !0;
    },
    toDetail(row) {
      this.bankInfo = row;
      this.type = 2;
      this.showDetail = !0;
    },
    del(id) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        seeFetch('creator/personnel/update', {
          id: id,
          status: -1,
        }).then(res => {
          if (res.errorCode === 0) {
            window.location.reload();
          }
        });
      });
    },
    saveRight(id) {
      seeFetch('creator/personnel/update', {
        id: this.rightId,
        allowSuixi: this.isOpenDonate ? 1 : 0,
        allowShopWindow: this.isOpenWindow ? 1 : 0,
      }).then(res => {
        if (res.errorCode === 0) {
          window.location.reload();
        }
      });
    },
    closeDialog() {
      this.showDetail = !1;
    },
    pageChange(page) {
      this.currentPage = page;
      this.fetchList();
    },
    close() {
      this.showRightBox = !1;
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
.addUser {
  width: 120px;
  height: 32px;
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
.saveRight {
  display: block;
  margin: 20px auto 0;
}
</style>
