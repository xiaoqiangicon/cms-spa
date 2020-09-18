<template>
  <div class="container">
    <el-card>
      <div class="filter clearfix">
        <span class="l-hg-32 dp-inline-block wd-60"> 状态:</span>
        <span
          :class="filterStatus === 1 ? 'active-btn' : ''"
          @click="filterStatusChange(1)"
        >
          <el-button type="text">待提现</el-button> </span
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          :class="filterStatus === 0 ? 'active-btn' : ''"
          @click="filterStatusChange(0)"
        >
          <el-button type="text">提现完成</el-button> </span
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          :class="filterStatus === 3 ? 'active-btn' : ''"
          @click="filterStatusChange(3)"
        >
          <el-button type="text">打回记录</el-button>
        </span>
        <el-tooltip
          class="item"
          effect="dark"
          content="若用户操作重新提交申请，则提现将会重新生成一条记录，此记录会保留"
          placement="top-start"
        >
          <span style="cursor: pointer;">?</span>
        </el-tooltip>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div class="search-box">
        <span>申请人搜索</span>
        <el-select
          v-model="userId"
          placeholder="请选择"
          size="small"
          style="width: 260px;"
          filterable
          @change="toSearch"
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
      <div class="body">
        <el-table v-loading="loading" :data="list" style="width: 100%">
          <el-table-column prop="name" label="真实姓名" :align="'center'" />
          <el-table-column prop="addTime" label="申请时间" :align="'center'" />
          <el-table-column prop="id" label="申请ID" :align="'center'" />
          <el-table-column prop="userId" label="AppID" :align="'center'" />
          <el-table-column
            prop="price"
            label="提现金额（元）"
            :align="'center'"
          />
          <el-table-column label="税后提现金额（元）" :align="'center'">
            <template slot-scope="scope">
              <div>{{ (scope.row.price * 0.94).toFixed(2) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="状态" :align="'center'">
            <template slot-scope="scope">
              <div
                class="status"
                :class="{
                  pending: scope.row.status === 1,
                  reject: scope.row.status === 3,
                  success: scope.row.status === 0,
                }"
              >
                {{
                  scope.row.status === 1
                    ? '待确认'
                    : scope.row.status === 3
                    ? '打回'
                    : '完成'
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" :align="'center'">
            <template slot-scope="scope">
              <el-button type="text" @click="toDetail(scope.row.id)">
                查看
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
    <Detail
      :pickUpId="pickUpId"
      :showDetail="showDetail"
      :detailData="detailData"
      @closeDialog="closeDialog"
    />
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';
import './fetch';
import Detail from './Detail';
import './index.less';

export default {
  name: 'App',
  data() {
    return {
      userId: '',
      totalCount: 0,
      currentPage: 1,
      filterStatus: 1, // 1申请中，2已确认 3打回 4 完成
      loading: !0,
      personList: [],
      list: [],
      showDetail: !1,
      detailData: {
        list: [
          {
            id: 1,
            price: 1000,
            billId: 1,
            calculationTime: '09-01 00:00:00',
            addTime: '09-07 19:56:54',
            updateTime: '09-08 15:06:44',
            pickUpId: 1,
            status: 0,
          },
        ],
        user: {
          id: 1644,
          name: '测试',
          userId: 1000844050,
          bonzeId: 0,
          status: 0,
          addTime: '09-07 19:42:43',
          idCard: '12345678901',
          bankCard: '12345678901',
          bank: '测试',
          underBank: '测试',
          cardImgFront: 'test.jpg',
          cardImgBack: 'test.jpg',
          allowSuixi: 1,
          allowShopWindow: 1,
        },
        feedbackPic: '',
        content: '拒绝了',
      },
      pickUpId: 0,
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
      seeFetch('fund/pending/list', {
        type: this.filterStatus,
        userId: this.userId,
        pageNum: this.currentPage,
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

        if (this.currentPage === 1) this.totalCount = res.data.total;
        this.list = res.data.list;

        window.scrollTo(0, 0);
      });
    },
    fetchUser() {
      seeFetch('fund/pending/personList', {}).then(res => {
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
    filterStatusChange(value) {
      if (this.filterStatus === value) return;

      this.filterStatus = value;
      this.toSearch();
    },
    toSearch() {
      this.currentPage = 1;
      this.fetchList();
    },
    toDetail(id) {
      seeFetch('fund/pending/getPickUpMessage', { pickUpId: id }).then(res => {
        this.detailData = res.data;
        this.pickUpId = id;
        this.showDetail = !0;
      });
    },
    closeDialog(data) {
      this.showDetail = data;
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
  width: 100%;
  padding: 40px 20px;
}

.body {
  margin-top: 20px;
}

.filter {
  font-size: 16px;
  .el-button {
    color: #333;
    font-size: 16px;
  }

  .active-btn {
    .el-button {
      color: #409eff;
    }
  }
}
.search-box {
  display: flex;
  align-items: center;
  margin: 20px 0 40px;
  font-size: 16px;
  span {
    width: 90px;
    flex-shrink: 0;
  }
  .search {
    margin-left: 10px;
  }
}
.search-input {
  margin: 0 20px;
}
.status {
  width: 60px;
  height: 22px;
  margin: 0 auto;
  line-height: 20px;
  font-size: 14px;
  border-radius: 12px;
}
.pending {
  border: 1px solid #33b0ff;
  color: #33b0ff;
  background-color: #e3eeff;
}
.reject {
  border: 1px solid #ff9933;
  color: #ff9933;
  background-color: #fff4e9;
}
.success {
  border: 1px solid #078404;
  color: #078404;
  background-color: #e6ffe4;
}
</style>
