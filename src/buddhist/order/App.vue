<template>
  <div class="contain">
    <el-card v-loading="OrderGroupLoading">
      <div class="header">
        <div class="filter">
          <span>寺院</span>
          <el-select v-model="templeId" filterable @change="changeTemple">
            <el-option :value="0">全部</el-option>
            <el-option
              v-for="item in templeList"
              :value="item.id"
              :key="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
          <span style="margin-left: 20px;">佛事</span>
          <el-select v-model="commodityId" filterable @change="getList">
            <el-option :value="0">全部</el-option>
            <el-option
              v-for="item in commodityList"
              :value="item.id"
              :key="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </div>
        <div class="header-tips">
          1.APP订单、合作寺院严格把控 <br />2.SaaS订单、合作寺院严格把控
          <br />3.APP订单、非合作放宽 <br />4.SaaS订单、非合作寺院直接通过
        </div>
      </div>
      <el-button type="primary" @click="onClickHandleOrderGroup('pass')"
        >批量通过</el-button
      >
      <el-button type="primary" @click="onClickHandleOrderGroup('fail')"
        >批量打回</el-button
      >
      <el-table
        :data="list"
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          prop="orderNo"
          label="善缘号"
          :align="'center'"
          width="80px"
        />
        <el-table-column prop="name" label="佛事名称" :align="'center'" />
        <el-table-column prop="payWay" label="订单来源" :align="'center'">
          <template slot-scope="scope">
            <span
              :class="{
                green: !scope.row.is_chanzai_pay,
                red: scope.row.is_chanzai_pay,
              }"
              >{{ scope.row.payWay }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="payWay" label="合作寺院" :align="'center'">
          <template slot-scope="scope">
            <span
              :class="{
                green: scope.row.isPromotion,
                red: !scope.row.isPromotion,
              }"
              >{{ scope.row.isPromotion ? '合作寺院' : '非合作寺院' }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="templeName" label="寺院名称" :align="'center'" />
        <el-table-column
          prop="chargeName"
          label="大区负责人"
          :align="'center'"
          width="80px"
        />
        <el-table-column prop="remark" label="反馈内容" :align="'center'" />
        <el-table-column label="反馈图片" :align="'center'" width="300px">
          <template slot-scope="scope">
            <div class="pic-box">
              <el-image
                style="width: 80px"
                v-for="item in scope.row.pics"
                :key="item"
                :src="item"
                :preview-src-list="scope.row.pics"
              >
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="附言" :align="'center'" width="300px">
          <template slot-scope="scope">
            <div class="" v-for="item in scope.row.posiscript" :key="item.id">
              <p v-if="item.type !== 5">
                {{ item.name }}: {{ item.value ? item.value : '未填写' }};
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="finishTime" label="反馈时间" :align="'center'" />
        <el-table-column label="异常原因" :align="'center'" width="300px">
          <template slot-scope="scope">
            <el-input
              type="textarea"
              v-model="scope.row.reason"
              resize="none"
              rows="4"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" :align="'center'">
          <template slot-scope="scope">
            <div class="valid-time">
              <div class="btn green" @click="verify(scope.row, 1)">通过</div>
              <div class="btn red" @click="verify(scope.row, 0)">打回</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import './fetch';
import seeFetch from 'see-fetch';
import { Notification } from 'element-ui';

export default {
  name: 'APP',
  data() {
    return {
      loading: false,
      templeId: '',
      commodityId: '',
      templeList: [],
      commodityList: [],
      list: [],
      OrderGroupLoading: false,
      selected: [],
    };
  },
  created() {
    this.getTempleList();
    this.getCommodityList();
    this.getList();
  },
  methods: {
    getTempleList() {
      seeFetch('buddhist/order/getTempleList', {
        isTest: 0,
        tagId: 0,
        verify: -1,
      }).then(res => {
        if (res.success) {
          this.templeList = res.data;
        }
      });
    },
    getCommodityList() {
      seeFetch('buddhist/order/getCommodityList', {
        templeId: this.templeId,
      }).then(res => {
        if (res.success) {
          this.commodityList = res.data.list;
        }
      });
    },
    getList() {
      this.loading = true;
      seeFetch('buddhist/order/list', {
        templeId: this.templeId,
        commodityId: this.commodityId,
      }).then(res => {
        this.loading = false;
        if (!res.success) {
          Notification({
            title: '提示',
            message: res.message,
          });
          return;
        }

        this.list = res.data.list;
      });
    },
    changeTemple() {
      this.commodityId = '';
      this.getList();
    },
    handleSelectionChange(selectedData) {
      let selected = [];
      selectedData.forEach(item => {
        selected.push(item.id);
      });
      this.selected = selected;
    },
    onClickHandleOrderGroup(type) {
      if (this.OrderGroupLoading) return;
      let { selected } = this;
      if (!selected.length) {
        Notification({
          title: '提示',
          message: '请先选择订单',
        });
        return;
      }
      let tips =
        type === 'pass'
          ? `是否确认批量通过${selected}反馈，并通知寺院管理员？`
          : `是否确认批量打回${selected}，并通知寺院管理员？`;
      this.OrderGroupLoading = true;
      if (type === 'pass') {
        this.$confirm(tips, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          seeFetch('buddhist/order/feedback', {
            commodityOrderIds: selected.join(','),
            verify: 1,
            content: '',
          }).then(res => {
            this.getDataRefreshList(res);
          });
        });
      } else if (type === 'fail') {
        this.$prompt(tips, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: '请输入打回原因',
          type: 'warning',
        }).then(({ value }) => {
          if (!value) return;
          seeFetch('buddhist/order/feedback', {
            commodityOrderIds: selected.join(','),
            verify: 0,
            content: value,
          }).then(res => {
            this.getDataRefreshList(res);
          });
        });
      }
    },
    verify(row, status) {
      let tips =
        status === 0
          ? '是否确认打回此条反馈，并通知寺院管理员？'
          : '是否确认通过';
      let reason = row.reason;
      this.$confirm(tips, reason, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let { id, reason } = row;
        this.loading = true;
        seeFetch('buddhist/order/feedback', {
          commodityOrderId: id,
          verify: status,
          content: status === 0 ? reason : '',
        }).then(res => {
          this.getDataRefreshList(res);
          this.loading = false;
        });
      });
    },
    getDataRefreshList(res) {
      if (res.success) {
        Notification({
          title: '提示',
          message: '操作成功',
        });
        this.OrderGroupLoading = false;
        this.getList();
      } else {
        Notification({
          title: '提示',
          message: res.message,
        });
        this.OrderGroupLoading = false;
        return;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-image {
  margin-right: 10px;
  border-radius: 6px;
}
.contain {
  padding: 20px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.header-tips {
  padding: 6px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #f56c6c;
}

.pic-box {
}
.pic {
  width: 100px;
  height: 100px;
  margin: 0 10px 20px 0;
  border-radius: 6px;
}
.btn {
  cursor: pointer;
  margin-right: 10px;
}
</style>
