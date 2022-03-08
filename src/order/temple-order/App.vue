<template>
  <div class="contain">
    <el-card>
      <div class="search">
        <div class="">
          <span>活动列表</span>
          <el-select
            v-model="commodityId"
            size="small"
            placeholder="请选择活动"
            filterable
            @change="getList"
            style="margin-right: 20px;"
          >
            <el-option label="全部" :value="0"></el-option>
            <el-option
              v-for="(item, key) in activityList"
              :key="key"
              :label="item.id + ' - ' + item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <el-radio-group
          v-model="isBefor5Day"
          @change="getList"
          style="margin-right: 20px;"
        >
          <el-radio-button :label="0">未处理订单</el-radio-button>
          <el-radio-button :label="1">超时未处理订单</el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="urgeOrder" @change="getList">
          <el-radio-button :label="0">全部</el-radio-button>
          <el-radio-button :label="1">已催单</el-radio-button>
        </el-radio-group>
      </div>
      <div class="search-more">
        <span>手机号：</span>
        <el-input v-model="mobile" style="width: 320px;">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getList"
          ></el-button>
        </el-input>
      </div>
      <el-table v-loading="loading" :data="list" class="table">
        <el-table-column
          prop="name"
          label="佛事名称"
          sortable
          :align="'center'"
        />
        <el-table-column prop="money" label="金额" sortable :align="'center'" />
        <el-table-column
          prop="addTime"
          label="下单时间"
          sortable
          :align="'center'"
        />
        <el-table-column
          prop="urgeText"
          label="催单"
          sortable
          :align="'center'"
        />
        <el-table-column label="订单详情" :align="'center'">
          <template slot-scope="scope">
            <div class="detail-btn" @click="showDetail(scope.row)">查看</div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="详情" :visible.sync="showDialog" width="600px">
      <div class="row">
        <span class="row-left">佛事名称：</span>
        <span class="row-right">{{ detail.name }}</span>
      </div>
      <hr />
      <div class="row">
        <span class="row-left">规格：</span>
        <span class="row-right">{{ detail.subName }}</span>
      </div>
      <div class="row">
        <span class="row-left">数量：</span>
        <span class="row-right">{{ detail.buyNum }}</span>
      </div>
      <div class="row">
        <span class="row-left">支付：</span>
        <span class="row-right">{{ detail.money }}</span>
      </div>
      <div class="row">
        <span class="row-left">下单时间：</span>
        <span class="row-right">{{ detail.addTime }}</span>
      </div>
      <div class="row">
        <span class="row-left">订单号：</span>
        <span class="row-right">{{ detail.order_number }}</span>
      </div>
      <div class="row">
        <span class="row-left">外部订单号：</span>
        <span class="row-right">{{ detail.outer_order_number }}</span>
      </div>
      <div class="row">
        <span class="row-left">支付流水号：</span>
        <span class="row-right">{{ detail.running_number }}</span>
      </div>
      <hr />
      <div class="row">
        <span class="row-left">反馈图：</span>
        <img class="feedback-img" :src="detail.dispose_pic_url" alt="" />
      </div>
      <hr />
      <p class="row-left">附言信息</p>
      <div class="row" v-for="(item, key) in detail.postscript" :key="key">
        <span class="row-left">{{ item.name }}：</span>
        <span class="row-right">{{ item.value }}</span>
      </div>
      <hr />
      <p class="row-left">功德主信息</p>
      <div class="row">
        <span class="row-left">购买人：</span>
        <span class="row-right">{{ detail.user && detail.user.name }}</span>
      </div>
      <div class="row">
        <span class="row-left">联系手机：</span>
        <span class="row-right">{{ detail.user && detail.user.mobile }}</span>
      </div>
      <div class="row">
        <span class="row-left">地址：</span>
        <span class="row-right">{{ detail.user && detail.user.address }}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import seeFetch from 'see-fetch';
import './fetch';

export default {
  name: 'APP',
  data() {
    return {
      loading: !0,
      templeId: '',
      templeName: '',
      commodityId: '',
      pageNo: 1,
      pageSize: 10,
      urgeOrder: 0,
      isBefor5Day: 0,
      mobile: '',
      list: [],
      activityList: [],
      showDialog: !1,
      detail: {},
    };
  },
  created() {
    const { id, name } = this.$route.query;
    this.templeId = id;

    this.getActivityList();
    this.getList();
  },
  methods: {
    getList() {
      this.loading = !0;
      let {
        commodityId,
        isBefor5Day,
        mobile,
        pageNo,
        pageSize,
        templeId,
        urgeOrder,
      } = this;
      seeFetch('order/templeOrder/list', {
        commodityId,
        isBefor5Day,
        mobile,
        pageNo,
        pageSize,
        templeId,
        urgeOrder,
      }).then(res => {
        if (res.success) {
          this.list = res.data.list;
        } else {
        }
        this.loading = !1;
      });
    },
    getActivityList() {
      seeFetch('order/templeOrder/activityList', {
        templeId: this.templeId,
      }).then(res => {
        if (res.success) {
          this.activityList = res.data.list;
        } else {
        }
      });
    },
    showDetail(row) {
      this.showDialog = !0;
      this.detail = row;
    },
  },
};
</script>

<style lang="less" scoped>
p {
  margin: 10px 0;
}
.contain {
  padding: 20px;
}
.search {
  display: flex;
  align-items: center;
}
.search-more {
  margin: 20px 0;
}
hr {
  height: 1px;
  margin: 20px 0;
  background-color: #eee;
  border: none;
}
.row {
  line-height: 24px;
}
.row-left {
  display: inline-block;
  width: 180px;
  font-weight: bold;
}
</style>
